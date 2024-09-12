import { Request, Response } from "express";
import Admin from "../models/admin";

export default class UserController {
  // Método assíncrono para cadastrar novos usuários
  public async cadastrarUsuario(req: Request, res: Response): Promise<void> {
    // Extrai os dados do corpo da requisição (frontend)
    const { nome, senha, email, is_admin } = req.body;

    try {
      // Cria uma nova instância da classe Admin com os dados fornecidos
      const admin = new Admin(nome, email, senha, is_admin);
      // Chama o método cadastrarUsuario da classe admin para realizar o cadastro
      await admin.cadastrarUsuario(nome, senha, email, is_admin);

      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
      res.status(500).json({ error: "Erro ao cadastrar o usuário" });
    }
  }
}
