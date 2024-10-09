import { Request, Response } from "express";
import {  loginService,  createUserService, listUserService, readUserService, updateUserService, deleteUserService, getIdUserService } from "../services/userService";



export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const { token } = await loginService(email, senha);
    return res.status(200).json({ token });
  }catch (error) {
    console.log("Error in login function:", error);
    return res.status(500).json({ messsage: error.message });
  }
};

//criar usuário
export const createUser = async (req: Request, res: Response) => {
  const { nome, email, senha, id_admin } = req.body;

  try {
    const newUser = await createUserService(nome, email, senha, id_admin);
    return res.status(201).json(newUser);
  }catch (error) {
    console.log("Error in createUser function:", error);
    return res.status(500).json({ message: error.message });
  }
};


//listar informações de um usuário
export const readUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
      
      const user = await readUserService(Number(id));
      return res.status(200).json(user);
  }catch (error) {
      console.log("Error in readUser function:", error);
      return res.status(500).json({ message: error.message });
  }
};


//listar todas as informações de todos os usuários
export const readAllUsers = async (req: Request, res: Response) => {
   
    const { id_admin } = req.params;

  try {
    
    const users = await listUserService(Number(id_admin));
    return res.status(200).json(users);
  }catch (error) {
    console.log("Error in readAllUsers function:", error);
    return res.status(500).json({ message: error.message });
  }
};


//atualizar informações de um usuário
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.body;
  const { nome, email, senha } = req.body;

  try {
    const userId = parseInt(id, 10);
    const updatedUser = await updateUserService(userId, nome, email, senha);
    return res.status(200).json(updateUser);
  }catch (error) {
    console.log("Error in updatedUser function:", error);
    return res.status(500).json({ message: error.message });
  }
};


//deletar informações de um usuário
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userId = parseInt(id, 10);
    const result = await deleteUserService(userId);
    return res.status(200).json(result);
  }catch (error) {
    console.error("Error in deleteUser function:", error);
    return res.status(500).json({ message: error.message})
  }
};



//função para pegar o id do usuário pelo email
export const getIdUser = async (req: Request, res: Response) => {

       try {
        const { email } = req.params;
        const user = await getIdUserService(email as string);
        return res.status(200).json(user['id']);
    }catch (error) {
        console.log("Error in getIdUser function:", error);
        return res.status(500).json({ message: error.message });
    }

}