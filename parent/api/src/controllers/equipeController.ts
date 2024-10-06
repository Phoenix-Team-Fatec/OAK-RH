import { Request, Response } from "express";
import { createEquipeService, getAllEquipesService, getEquipeByIdService, updateEquipeService, deleteEquipeService } from "../services/equipeService";
import Equipe from "../models/equipeModels";

// Função para criar equipe
export const createEquipe = async (req: Request, res: Response) => {
    const { nome } = req.body;  
    try {
        const equipeExistente = await Equipe.findOne({ where: {nome} });
        if(equipeExistente) {
            return res.status(409).json({ message: "Equipe já cadastrada" })
        }
        const newEquipe = await createEquipeService(nome);
        res.status(201).json(newEquipe);
    }catch(error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao criar equipe" })
    }
}

// Função para listar todas as equipes
export const getAllEquipes = async (req: Request, res: Response) => {
    try {
        const allEquipes = await getAllEquipesService();
        res.status(200).json(allEquipes);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar equipes" });
    }
}

// Função para listar equipe por ID
export const getEquipeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const equipe = await getEquipeByIdService(parseInt(id));
        res.status(200).json(equipe);
    } catch (error) {
        res.status(404).json({ message: "Equipe não encontrada" });
    }
}

// Função para atualizar equipe por ID
export const updateEquipe = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome } = req.body;
    try {
        const updatedEquipe = await updateEquipeService(parseInt(id), nome);
        res.status(200).json(updatedEquipe);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar equipe" });
    }
}

// Função para excluir equipe por ID
export const deleteEquipe = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteEquipeService(parseInt(id));
        res.status(200).json({ message: "Equipe excluída com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir equipe" });
    }
}
