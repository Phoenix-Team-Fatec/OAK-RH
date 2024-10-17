import { Request, Response } from "express";
import { setUsarioEquipe, listarEquipe_User, getEquipe_user, mudarEstatosLider, deletarUsuarioEquipe } from "../services/equipe_userService";



export const setUsuarioEquipe = async (req: Request, res: Response) => {
  const { userId, equipeId, isLider } = req.body;

  try {
    const newAssociation = await setUsarioEquipe(userId, equipeId, isLider);
    res.status(201).json(newAssociation);
  } catch (error) {
    console.log("Error in setUsuarioEquipe function:", error);
    res.status(500).json({ message: error.message });
  }
};


export const listEquipeUser = async (req: Request, res: Response) => {
    try {
        const teamsWithUsers = await listarEquipe_User();
        return res.status(200).json(teamsWithUsers);
    } catch (error) {
        console.log("Error in listEquipeUser function:", error);
        return res.status(500).json({ message: error.message });
    }
}



export const mudarEstadoLider = async(req: Request, res: Response) =>{

    const {userId, equipeId, isLider} = req.body;

    try{
      const changeLider = await mudarEstatosLider(userId, equipeId, isLider);
      return res.status(200).json(changeLider);

    }catch(error){
        console.log("Error in mudarEstadoLider function:", error);
        return res.status(500).json({message: error.message});
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