import Equipe from "../models/equipeModels";
import Formulario_equipe from "../models/formulario_equipeModels";
import Formulario from "../models/formularioModels";
import Formulario_user from "../models/formulario_user";
import Pergunta from "../models/perguntasModels";
import Equipe_user from "../models/equipe_userModel";
import User from "../models/userModels";
import { admin } from "../config/firebase.cjs";
import { where } from "sequelize";



// Função para associar formulário a múltiplas equipes
export const associarFormularioParaEquipes = async (
    formulario_id: number,
    equipe_ids: number[], // Um array de IDs de equipes
    nivel: string // 'lideres', 'liderados' ou 'ambos'
) => {
    try {
        // Para cada equipe no array, associar o formulário
        const associacoes = equipe_ids.map(async equipe_id => {
            // Cria a associação do formulário com a equipe
            return await Formulario_equipe.create({
                formulario_id,
                equipe_id,
                nivel, // Associar o nível definido
            });
        });

        // Guardar os usuários de cada equipe e associá-los ao formulário
        equipe_ids.map(async equipe_id => {
            let where_clause;
            let opposite_level_users: any[] = [];

            if (nivel === 'lideres') {
                where_clause = { equipe_id, is_lider: true };  // Filtra os líderes
                // Para 'lideres', encontrar os 'liderados' para associar
                opposite_level_users = await Equipe_user.findAll({
                    where: { equipe_id, is_lider: false },
                    attributes: ['user_id']
                });
            } else if (nivel === 'liderados') {
                where_clause = { equipe_id, is_lider: false };  // Filtra os liderados
                // Para 'liderados', encontrar os 'lideres' para associar
                opposite_level_users = await Equipe_user.findAll({
                    where: { equipe_id, is_lider: true },
                    attributes: ['user_id']
                });
            } else {
                // Para 'ambos', não filtra por liderança
                where_clause = { equipe_id };
            }

            // Obter os usuários com base no nível
            const users = await Equipe_user.findAll({
                where: where_clause
            });

            // Criar uma linha para cada usuário oposto
            for (const user of users) {
                if (opposite_level_users.length > 0) {
                    console.log("Aqui tá indo", opposite_level_users)
                    for (const opposite_user of opposite_level_users) {
                        // Para cada combinação de usuário e oposto, cria uma nova linha na tabela Formulario_user
                        await Formulario_user.create({
                            formulario_id,
                            user_id: user.user_id, // o usuário relacionado ao formulário
                            status: 'pendente',
                            answered_for: opposite_user.user_id, // o ID do usuário oposto
                        });
                    }
                } else {
                    await Formulario_user.create({
                        formulario_id,
                        user_id: user.user_id, // o usuário relacionado ao formulário
                        status: 'pendente',
                        answered_for: user.user_id, // o ID do usuário oposto
                    });
                }
            }
        });

        // Alterar o estado do formulário para "enviado"
        const form = await Formulario.findByPk(formulario_id);
        if (!form) {
            return { message: "Formulário não encontrado" };
        }
        form.enviado = true;
        await form.save();

        // Aguarda todas as associações serem realizadas
        const resultado = await Promise.all(associacoes);

        return resultado;
    } catch (error) {
        console.log("Erro ao associar formulário às equipes:", error);
    }
};


//Função para listar formulários pendentes e respoondidos de uma equipe, incluindo os usuários da equipe
export async function listarUsuariosComFormulariosEquipe(formulario_id: number, equipe_id: number) {
    try {
        const usuarios = await User.findAll({
            attributes: ['id', 'nome'],
            include: [
                {
                    model: Formulario_user,
                    as: 'users', // Alias definido no relacionamento de User com Formulario_user
                    attributes: ['status'],
                    where: {
                        formulario_id
                    },
                    include: [
                        {
                            model: Formulario,
                            as: 'form', // Alias definido no relacionamento de Formulario_user com Formulario
                            attributes: ['nome'],
                        }
                    ]
                },
                {
                    model: Equipe_user,
                    as: 'user',
                    where: {
                        equipe_id
                    },

                }
            ]
        });
        return usuarios;
    } catch (error) {
        console.error("Erro ao listar usuários com formulários da equipe:", error);
        throw error;
    }

}





// Função para associar formulário a todas as equipes
export const associarFormularioParaTodasEquipes = async (

    formulario_id: number,
    nivel: string, // 'lideres', 'liderados' ou 'ambos'
    id_admin: number,
) => {
    try {
        // Busca todos os IDs das equipes no banco de dados
        const equipes = await Equipe.findAll({
            where: { id_admin }
        });
        const equipe_ids = equipes.map(equipe => equipe.id);
        console.log(equipe_ids);

        // Reutiliza a função anterior para associar o formulário a todas as equipes
        return await associarFormularioParaEquipes(formulario_id, equipe_ids, nivel);
    } catch (error) {
        console.log("Erro ao associar formulário a todas as equipes:", error);
    }
};


// Função para listar formulários de uma equipe
export const listarFormulariosEquipe = async (equipe_id: number) => {
    try {
        const formularios = await Formulario_equipe.findAll({
            where: {
                equipe_id,

            },
            include: [
                {
                    model: Equipe,
                    as: 'equipes',
                    attributes: ['nome', 'descricao']
                },
                {
                    model: Formulario,
                    as: 'formularios',
                    attributes: ['nome', 'descricao', 'criado_em']
                }
            ]
        });
        return formularios;
    } catch (error) {
        console.log("Erro ao listar formulários de uma equipe", error);
    }
};

// Função para deletar formulário de uma equipe
export const deletarFormularioEquipe = async (id: number) => {
    try {
        const formulario_equipe = await Formulario_equipe.findByPk(id);

        if (!formulario_equipe) {
            return { message: "Formulário de equipe não encontrado" };
        }

        await formulario_equipe.destroy();

        return { message: "Formulário de equipe deletado com sucesso" };
    } catch (error) {
        console.log("Erro ao deletar formulário de uma equipe", error);
    }
};

export async function getListOfUserToAnswerService(formsId: number, userId: number) {
    try {
        const userIdsToAnswer = await Formulario_user.findAll({
            where: { formulario_id: formsId, user_id: userId, status: "pendente" }
        });

        if (!userIdsToAnswer || userIdsToAnswer.length === 0) {
            return { message: "No users to answer" };
        }

        const answeredForArray = userIdsToAnswer.map((user) => user.dataValues.answered_for);

        return answeredForArray;
    } catch (error) {
        console.error("Error trying to get the user to answer service ", error)
        throw error;
    }
}

export async function updateAnswerStatus(formsId: number, answered_for: number) {
    try {
        const userIdsToAnswer = await Formulario_user.findAll({
            where: { formulario_id: formsId, answered_for: answered_for }
        });

        if (!userIdsToAnswer || userIdsToAnswer.length === 0) {
            return { message: "No row founded" };
        }

        const updatedRows = await Formulario_user.update(
            { status: 'respondido' },
            { where: { formulario_id: formsId, answered_for: answered_for, status: 'pendente' } }
        );
        
        return updatedRows;
    } catch (error) {
        console.error("Error trying to get the user to answer service ", error)
        throw error;
    }
}