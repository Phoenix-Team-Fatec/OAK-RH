import Equipe from "../models/equipeModels";

// Função para criar equipe
export const createEquipeService = async (nome: string, id_admin: number, descricao: string) => {
    try {
        const equipeExistente = await Equipe.findOne({ where: {nome}});
        if(equipeExistente) {
            throw new Error("Equipe já cadastrada");
        }
        const newEquipe = await Equipe.create({ nome, id_admin, descricao });
        return newEquipe;
    }catch(error: any) {
        if(error.message === "Equipe já cadastrada") {
            throw new Error("Equipe já cadastrada");
        }
        throw new Error("Erro ao criar equipe")
    }
};

// Função para obter todas as equipes
export const getAllEquipesService = async (id_admin: number) => {
    try {
        const allEquipes = await Equipe.findAll({where: {id_admin}});
        return allEquipes;
    } catch (error) {
        throw new Error("Erro ao buscar equipes");
    }
};

// Função para obter equipe por ID
export const getEquipeByIdService = async (id: number) => {
    try {
        const equipe = await Equipe.findByPk(id);
        if (!equipe) {
            throw new Error("Equipe não encontrada");
        }
        return equipe;
    } catch (error) {
        throw new Error("Erro ao buscar equipe");
    }
};

// Função para atualizar equipe por ID
export const updateEquipeService = async (id: number, nome: string, descricao:string) => {
    try {
        const equipe = await Equipe.findByPk(id);
        if (!equipe) {
            throw new Error("Equipe não encontrada");
        }

        equipe.nome = nome;  // Atualiza o nome
        equipe.descricao = descricao;
        await equipe.save(); // Salva as mudanças no banco de dados

        return equipe;
    } catch (error) {
        throw new Error("Erro ao atualizar equipe");
    }
};

// Função para excluir equipe por ID
export const deleteEquipeService = async (id: number) => {
    try {
        const equipe = await Equipe.findByPk(id);
        if (!equipe) {
            throw new Error("Equipe não encontrada");
        }

        await equipe.destroy(); // Exclui a equipe
        return { message: "Equipe excluída com sucesso" };
    } catch (error) {
        throw new Error("Erro ao excluir equipe");
    }
};
