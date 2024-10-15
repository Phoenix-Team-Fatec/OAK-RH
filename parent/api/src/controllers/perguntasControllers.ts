import { criarPerguntaService, deletarPerguntaService, listarPerguntasService, listarUmaPerguntaService, atualizarPerguntaService } from "../services/perguntasServices";
import { Request, Response } from "express";


//Função criar pergunta
export const criarPergunta = async (req: Request, res: Response) => {
    try {
        const { formulario_id, texto, tipo, descricao, categoria_id } = req.body;
        const pergunta = await criarPerguntaService(formulario_id, texto, tipo, descricao, categoria_id);
        return res.status(200).json(pergunta);
    } catch (error) {
        console.log("Erro ao criar pergunta", error);
        return res.status(400).json({ message: "Erro ao criar pergunta" });
    }
}

//Função listar perguntas
export const listarPerguntas = async (req: Request, res: Response) => {

    try{
        const {formulario_id} = req.params;
        const perguntas = await listarPerguntasService(Number(formulario_id));
        return res.status(200).json(perguntas);

    }catch(error){
        console.log("Erro ao listar perguntas", error);
        return res.status(400).json({message:"Erro ao listar perguntas"});
    }
}


//Função listar apenas uma pergunta
export const listarUmaPergunta = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const pergunta = await listarUmaPerguntaService(Number(id));
        return res.status(200).json(pergunta);

    } catch (error) {
        console.log("Erro ao listar apenas uma pergunta", error);
        return res.status(400).json({ message: "Erro ao listar apenas uma pergunta" });
    }
}


//Função deletar pergunta
export const deletarPergunta = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mensagem = await deletarPerguntaService(Number(id));
        return res.status(200).json(mensagem);

    } catch (error) {
        console.log("Erro ao deletar pergunta", error);
        return res.status(400).json({ message: "Erro ao deletar pergunta" });
    }
}


//Função atualizar pergunta
export const atualizarPergunta = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { formulario_id,texto, tipo, descricao, categoria_id } = req.body;
        const mensagem = await atualizarPerguntaService( Number(id),formulario_id ,texto, tipo, descricao, categoria_id);
        return res.status(200).json(mensagem);

    } catch (error) {
        console.log("Erro ao atualizar pergunta", error);
        return res.status(400).json({ message: "Erro ao atualizar pergunta" });
    }
}