import Equipe from "../models/equipeModels";
import Formulario_equipe from "../models/formulario_equipeModels";
import Formulario from "../models/formularioModels";
import Pergunta from "../models/perguntasModels";
import Equipe_user from "../models/equipe_userModel";
import User from "../models/userModels";



// Função para associar formulário a equipe
export const associarFormularioEquipe = async (
    formulario_id: number, 
    equipe_id: number, 
    nivel: string // 'lideres', 'liderados' ou 'ambos'
  ) => {
    try {
      const formulario_equipe = await Formulario_equipe.create({
        formulario_id,
        equipe_id,
        nivel, // Associar o nível definido
      });
      return formulario_equipe;
    } catch (error) {
      console.log("Erro ao associar formulário à equipe:", error);
    }
  };
  

// Função para listar formulários de uma equipe
export const listarFormulariosEquipe = async (equipe_id: number) => {
    try {
        const formularios = await Formulario_equipe.findAll({
            where: {
                equipe_id
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

// Função para distribuir formulários para uma equipe com base em liderança
export const distribuirFormulariosParaEquipe = async (
    formularioId: number,
    equipeId: number,
    distribuirPara: 'lideres' | 'liderados' | 'ambos'
) => {
    try {
        // Verifica se o formulário existe
        const formulario = await Formulario.findByPk(formularioId);
        if (!formulario) {
            return { message: "Formulário não encontrado" };
        }

        // Busca as perguntas associadas ao formulário
        const perguntas = await Pergunta.findAll({
            where: { formulario_id: formularioId }
        });

        if (perguntas.length === 0) {
            return { message: "Nenhuma pergunta encontrada para este formulário" };
        }

        // Define a condição de filtro para os usuários com base no parâmetro distribuirPara
        let filtroLideranca: any = {};
        if (distribuirPara === 'lideres') {
            filtroLideranca = { is_lider: true };
        } else if (distribuirPara === 'liderados') {
            filtroLideranca = { is_lider: false };
        } // Se for 'ambos', não precisa de filtro específico

        // Busca os usuários associados à equipe, filtrando por líderes ou liderados se necessário
        const usuariosEquipe = await Equipe_user.findAll({
            where: {
                equipe_id: equipeId,
                ...filtroLideranca, // Aplica o filtro de liderança se necessário
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'nome', 'email'] // Inclua apenas os dados necessários dos usuários
                }
            ]
        });

        if (usuariosEquipe.length === 0) {
            return { message: "Nenhum usuário encontrado nesta equipe com os critérios selecionados" };
        }

        // Distribui as perguntas para cada usuário da equipe
        const distribuicao = usuariosEquipe.map(usuarioEquipe => ({  
            usuario: usuarioEquipe.user_id, // Acessando o objeto associado `user`
            perguntas
        }));

        return distribuicao;

    } catch (error) {
        console.log("Erro ao distribuir formulário para equipe:", error);
        throw new Error("Erro ao distribuir formulário para equipe");
    }
};
