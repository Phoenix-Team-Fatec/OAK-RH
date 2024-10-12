import { Request, Response } from "express";
import { createAdminService, loginService } from "../services/adminServices";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "../config/firebase.cjs";
import { generateRandomPassword } from "../config/generateRandomPassword";



//Função para fazer login
export const loginAdm = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const userFind = await loginService(email);
      const userVerify = await signInWithEmailAndPassword(getAuth(), email, password);
      return res.status(200).json(userFind);
    }catch (error) {
      console.log("Error in login function:", error);
      return res.status(500).json({ messsage: error.message });
    }
  };

//Função para criar admin
export const createAdmin = async (req: Request, res: Response) => {
  const { nome, password, email, empresa, cnpj} = req.body;

  try {
    const randomPassword = generateRandomPassword();
    const newAdmFirebase = await createUserWithEmailAndPassword(getAuth(), email, randomPassword);

    const newAdmin = await createAdminService(nome, email, empresa, cnpj);

    const resetPassword = await sendPasswordResetEmail(getAuth(), email);
    res.status(201).json(newAdmin);
  }catch (error) {
    console.log("Error in createUser function:", error);
    res.status(500).json({ message: error.message });
  }
};