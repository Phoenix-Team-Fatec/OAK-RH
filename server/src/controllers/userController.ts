import { Request, Response } from "express";
import Admin from "../models/admin";

export default class UserController {
  public async cadastrarUsuario(req: Request, res: Response): Promise<void> {
    const { nome, senha, email, is_admin } = req.body;

    try {
      const admin = new Admin(nome, email, senha, is_admin);
      await admin.cadastrarUsuario(nome, senha, email, is_admin);

      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
      res.status(500).json({ error: "Erro ao cadastrar o usuário" });
    }
  }
}
