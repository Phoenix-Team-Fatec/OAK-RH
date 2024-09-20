import Equipe from "../models/equipeModels";

// Função para criar equipe
export const createEquipeService = async (nome: string) => {
    try {
        const newEquipe = await Equipe.create({ nome });
        return newEquipe;
    } catch (error) {
        throw new Error("Erro ao criar equipe");
    }
};

// Função para obter todas as equipes
export const getAllEquipesService = async () => {
    try {
        const allEquipes = await Equipe.findAll();
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
export const updateEquipeService = async (id: number, nome: string) => {
    try {
        const equipe = await Equipe.findByPk(id);
        if (!equipe) {
            throw new Error("Equipe não encontrada");
        }

        equipe.nome = nome;  // Atualiza o nome
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
