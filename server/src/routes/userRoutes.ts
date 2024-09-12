import { Router } from "express";
import UserController from "../controllers/userController";

const router = Router();
const userController = new UserController();

router.get("/", (req, res) => {
    res.send("Servidor rodando")
});

router.post("/users", (req, res) => {
    userController.cadastrarUsuario(req, res)
});

export default router