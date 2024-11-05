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
            return await Formulario_equipe.create({
                formulario_id,
                equipe_id,
                nivel, // Associar o nível definido
            });
            
        });

        // Guardar os usuários de cada equipe
        equipe_ids.map(async equipe_id => {
            let where_clause;
            if (nivel === 'lideres') {
             where_clause = { equipe_id, is_lider: true };
            } else if (nivel === 'liderados') {
             where_clause = { equipe_id, is_lider: false };
            } else {
             where_clause = { equipe_id };
            }
            const users = await Equipe_user.findAll({
            
             where: where_clause
            
        });
        users.map(async user => {
            return await Formulario_user.create({
                formulario_id,
                user_id: user.user_id,
                status: 'pendente'
        })})
    });




       // Aguarda todas as associações serem realizadas
        const resultado = await Promise.all(associacoes);
        
        return resultado;
    } catch (error) {
        console.log("Erro ao associar formulário às equipes:", error);
    }
};




// Função para associar formulário a todas as equipes
export const associarFormularioParaTodasEquipes = async (
  
    formulario_id: number,
    nivel: string, // 'lideres', 'liderados' ou 'ambos'
    id_admin: number,
) => {
    try {
        // Busca todos os IDs das equipes no banco de dados
        const equipes = await Equipe.findAll({
            where: { id_admin }});
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
                    attributes: ['nome', 'descricao']
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
