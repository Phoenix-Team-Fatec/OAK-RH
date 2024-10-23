import { associarFormularioParaEquipes, deletarFormularioEquipe, listarFormulariosEquipe, associarFormularioParaTodasEquipes } from "../services/formulario_equipeServices";
import { Request, Response } from 'express';

//Função para associar formulário a equipes
export const associarFormularioEquipeController = async (req: Request, res: Response) => {
    try{
        const {formulario_id, equipe_id, nivel} = req.body;
        const formulario_equipe = await associarFormularioParaEquipes(formulario_id, equipe_id, nivel);
        return res.status(200).json(formulario_equipe)

    }catch(error){
        console.log("Erro ao associar formulário a equipe", error)
        return res.status(400).json({message:"Erro ao associar formulário a equipe"})

    }

}

//Função para associar formulário a todas as equipes
export const associarFormularioTodasEquipesController = async (req: Request, res: Response) => {
    try{
        const {formulario_id, nivel} = req.body;
        const {id_admin} = req.params;

        const formulario_equipe = await associarFormularioParaTodasEquipes(formulario_id, nivel,Number(id_admin));
        return res.status(200).json(formulario_equipe)

    }catch(error){
        console.log("Erro ao associar formulário a todas as equipes", error)
        return res.status(400).json({message:"Erro ao associar formulário a todas as equipes"})

    }

}

//Função para listar formulários de uma equipe
export const listarFormulariosEquipeController = async (req: Request, res: Response) => {
    try{
        const {equipe_id} = req.params;
        const formularios = await listarFormulariosEquipe(Number(equipe_id));
        return res.status(200).json(formularios)

    }catch(error){
        console.log("Erro ao listar formulários de uma equipe", error)
        return res.status(400).json({message:"Erro ao listar formulários de uma equipe"})

    }

}


//Função para deletar formulário de uma equipe
export const deletarFormularioEquipeController = async (req: Request, res: Response) =>{
    try{
        const {id} = req.params;
        const formulario_equipe = await deletarFormularioEquipe(Number(id));
        return res.status(200).json(formulario_equipe)

    }catch(error){
        console.log("Erro ao deletar formulário de uma equipe", error)
        return res.status(400).json({message:"Erro ao deletar formulário de uma equipe"})

    }
}