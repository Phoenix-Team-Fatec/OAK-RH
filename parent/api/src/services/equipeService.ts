import Equipe from "../models/equipeModels";
import { Sequelize } from 'sequelize';

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

// Função para listar a contagem de equipes por mês
export const listarEquipesPorMes = async (id_admin: number) => {
    try {
        const equipesPorMes = await Equipe.findAll({
            where: { id_admin },
            attributes: [
                [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('criado_em')), 'mes'],
                [Sequelize.fn('COUNT', '*'), 'quantidade']
            ],
            group: ['mes'],
            order: [['mes', 'ASC']]
        });

        return equipesPorMes.map((e: any) => {
            const mes = e.get('mes');
            const quantidade = e.get('quantidade');
            // Verifica se 'mes' não é null antes de converter para o nome do mês
            if (mes) {
                const nomeMes = new Date(mes).toLocaleString('pt-BR', { month: 'long' });
                return {
                    name: nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1), // Capitaliza a primeira letra
                    value: quantidade
                };
            }
            return null;
        }).filter((item: any) => item !== null); // Filtra itens nulos

    } catch (error) {
        console.log("Erro ao listar equipes por mês", error);
        throw error;
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
