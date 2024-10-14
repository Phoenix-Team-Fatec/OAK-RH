import { createFormularioService, listarFormularios, listarUmFormulario, deletarFormulario, atualizarFormulario } from "../services/formularioServices";
import { Request, Response } from "express";

//criar formulário
export const criarFormularioControl = async (req: Request, res: Response ) => {
    try{
        const {nome, descricao, admin_id} = req.body;
        const novoFormulario = await createFormularioService(nome, descricao,admin_id)

        return res.status(201).json(novoFormulario);

     
    }catch(error){
        return res.status(500).json({ messsage: error.message });
    }

}


//listar formulários
export const listarFormularioControl = async (req: Request, res: Response) =>{
    try{
        const {admin_id} = req.params;
        const listar = await listarFormularios(Number(admin_id))

        return res.status(201).json(listar);


    }catch(error){
        return res.status(500).json({ messsage: error.message });
    }
} 


//listar um formulário
export const listarUmFormularioControl = async (req: Request, res: Response) =>{
    try{
        const {id} = req.params;
        const listar = await listarUmFormulario(Number(id));

        return res.status(201).json(listar);


    }catch(error){
        return res.status(500).json({ messsage: error.message });
    }
} 

//deletar formulário
export const deletarFormularioControl = async (req: Request, res: Response) =>{
    try{
        const {id} = req.params;
        const deletar = await deletarFormulario(Number(id))

        return res.status(201).json(deletar);


    }catch(error){
        return res.status(500).json({ messsage: error.message });
    }
} 


//atualizar formulário
export const atuaizarFormularioControl = async (req: Request, res: Response ) => {
    try{
        const {id} = req.params
        const {nome, descricao} = req.body;
        const atualizar = await atualizarFormulario(Number(id), nome, descricao)

        return res.status(201).json(atualizar);

     
    }catch(error){
        return res.status(500).json({ messsage: error.message });
    }

}
