import { Request, Response } from "express";
import { setUsarioEquipe, listarEquipe_User, getEquipe_user, mudarEstatosLider, deletarUsuarioEquipe, listarUser_Equipe } from "../services/equipe_userService";

export const setUsuarioEquipe = async (req: Request, res: Response) => {
  const { user_id, equipe_id, is_lider } = req.body;

  try {
    const association = await setUsarioEquipe(user_id, equipe_id, is_lider);
    return res.status(201).json(association);
  } catch (error) {
    console.error("Error in setUsuarioEquipe function:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const listarUserEquipe = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const usersWithTeams = await listarUser_Equipe(id);
    return res.status(200).json(usersWithTeams);
  } catch (error) {
    console.log("Error in listarUserEquipe function:", error);
    return res.status(500).json({ message: error.message });
  }
}

export const listEquipeUser = async (req: Request, res: Response) => {
    try {
        const teamsWithUsers = await listarEquipe_User();
        return res.status(200).json(teamsWithUsers);
    } catch (error) {
        console.log("Error in listEquipeUser function:", error);
        return res.status(500).json({ message: error.message });
    }
}

export const mudarEstadoLider = async(req: Request, res: Response) => {
  const { userId, equipeId, isLider } = req.body;

  // Validação de entrada
  if (userId === undefined || equipeId === undefined || isLider === undefined) {
      return res.status(400).json({ message: "userId, equipeId e isLider são obrigatórios." });
  }

  try {
      const changeLider = await mudarEstatosLider(userId, equipeId, isLider);
      return res.status(200).json(changeLider);
  } catch (error) {
      console.log("Error in mudarEstadoLider function:", error);
      return res.status(500).json({ message: error.message });
  }
}

export const getEquipeUser = async(req: Request, res: Response) =>{ 
    
        const equipeId = parseInt(req.params.id);
        try{
          const equipeUser = await getEquipe_user(equipeId);
          return res.status(200).json(equipeUser);
        }catch(error){
          console.log("Error in getEquipeUser function:", error);
          return res.status(500).json({message: error.message});
        }
}

export const removerUsuario = async(req: Request, res: Response) =>{
    const {userId, equipeId} = req.body;

    try{
      const removerUsuario = await deletarUsuarioEquipe(userId, equipeId);
      return res.status(200).json(removerUsuario);
    }catch(error){
      console.log("Error in removerUsuario function:", error);
      return res.status(500).json({message: error.message});
    }
}