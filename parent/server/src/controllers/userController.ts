import { Request, Response } from "express";
import {  loginService } from "../services/userService";



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
