import { Request, Response } from "express";
import Admin from "../models/admin";

export default class UserController {
  // Método assíncrono para cadastrar novos usuários
  public async cadastrarUsuario(req: Request, res: Response): Promise<void> {
    const { nome, email, senha, is_admin } = req.body;

    try {
      const admin = new Admin(nome, email, senha, is_admin);
      await admin.cadastrarUsuario(nome, email, senha, is_admin);

      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
      res.status(500).json({ error: "Erro ao cadastrar o usuário" });
    }
  }

  // Método assíncrono para listar todos os usuários
  public async listarUsuarios(req: Request, res: Response): Promise<void> {
    try {
      // Instancia o objeto Admin para usar o método listarUsuario
      const admin = new Admin("", "", "", false);
      const usuarios = await admin.listarUsuario();

      if (true) {
        res.status(200).json(usuarios);
      } else {
        res.status(404).json({ message: "Nenhum usuário encontrado" });
      }
    } catch (err) {
      console.error("Erro ao listar usuários:", err);
      res.status(500).json({ error: "Erro ao listar os usuários" });
    }
  }
}

