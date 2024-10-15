import { Request, Response } from "express";
import { 
    createCategoriaService, 
    listarCategorias, 
    listarUmaCategoria, 
    deletarCategoria, 
    atualizarCategoria 
} from "../services/categoriasServices";

// Cria nova categoria
export const criarCategoriaControl = async (req: Request, res: Response) => {
    try {
        const { nome } = req.body;
        const novaCategoria = await createCategoriaService(nome);
        return res.status(201).json(novaCategoria);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lista todas as categorias
export const listarCategoriasControl = async (req: Request, res: Response) => {
    try {
        const categorias = await listarCategorias();
        return res.status(200).json(categorias);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lista categoria por ID
export const listarUmaCategoriaControl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const categoria = await listarUmaCategoria(Number(id));
        return res.status(200).json(categoria);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Deleta a categoria
export const deletarCategoriaControl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resultado = await deletarCategoria(Number(id));
        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Atualizar uma categoria
export const atualizarCategoriaControl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nome } = req.body;
        const resultado = await atualizarCategoria(Number(id), nome);
        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
