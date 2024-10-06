import { Request, Response } from "express";
import { createAdminService, loginService } from "../services/adminServices";



//Função para fazer login
export const login = async (req: Request, res: Response) => {
    try {
      const { email, senha } = req.body;
      const { token} = await loginService(email, senha);
      return res.status(200).json({ token});
    }catch (error) {
      console.log("Error in login function:", error);
      return res.status(500).json({ messsage: error.message });
    }
  };

//Função para criar admin
export const createAdmin = async (req: Request, res: Response) => {
  const { nome, senha, email, empresa, cnpj} = req.body;

  try {
    const newAdmin = await createAdminService(nome, senha, email, empresa, cnpj);
    res.status(201).json(newAdmin);
  }catch (error) {
    console.log("Error in createUser function:", error);
    res.status(500).json({ message: error.message });
  }
};