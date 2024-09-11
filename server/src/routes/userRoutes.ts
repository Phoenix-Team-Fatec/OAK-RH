import { Router } from "express";
import UserController from "../controllers/userController";

const router = Router();
const userController = new UserController();

router.post("/users", (req, res) => userController.cadastrarUsuario(req, res));

export default router