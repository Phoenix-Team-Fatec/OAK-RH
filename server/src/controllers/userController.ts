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

  // Método assíncrono para deletar algum usuário
  public async deletarUsuario(req: Request, res: Response): Promise<void> {
    const { id } = req.params; // Obtendo o ID dos parâmetros da URL

    try {
      const admin = new Admin("Admin", "admin@example", "password", true);
      await admin.deletarUsuario(parseInt(id));

      res.status(200).json({ message: `Usuário com ID  ${id} deleta com sucesso!`});
    }catch (err) {
      console.log("Erro ao deletar usuário:", err);
      res.status(500).json({ error: "Erro ao deletar usuário "})
    }
  }
}

