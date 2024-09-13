import { Router } from "express";
import UserController from "../controllers/userController";

const router = Router();
const userController = new UserController();

router.get("/", (req, res) => {
  res.send("Servidores rodando");
});

router.post("/users", (req, res) => {
  userController.cadastrarUsuario(req, res);
});

router.get("/users", (req, res) => {
    userController.listarUsuarios(req, res);
});

router.delete("/users/:id", (req, res) => {
  userController.deletarUsuario(req, res);
})
  
export default router;
