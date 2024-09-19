import { Request, Response } from "express";
import { createUserService, deleteUserService, loginService } from "../services/userService";
import { NUMBER } from "sequelize";

export const createUser = async (req: Request, res: Response) => {
  const { nome, email, senha, is_admin} = req.body;

  try {
    const newUser = await createUserService(nome, email, senha, is_admin);
    res.status(201).json(newUser);
  }catch (error) {
    console.log("Error in createUser function:", error);
    res.status(500).json({ message: error.message });
  }
};

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
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const token = await loginService(email, senha);
    return res.status(200).json({ token });
  }catch (error) {
    console.log("Error in login function:", error);
    return res.status(500).json({ messsage: error.message });
  }
};