import { Router } from "express";
import { createUser, readUser, updateUser, deleteUser, login, readAllUsers } from '../controllers/userController';
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware";

const router = Router();

// Apenas administradores podem acessar essas rotas
router.post('/users', verifyToken,verifyAdmin, createUser);
router.post('/users/login', login);
router.delete('/users/:id', verifyToken, verifyAdmin, deleteUser);
router.put('/users/:id', verifyToken, verifyAdmin, updateUser);
router.get('/users/:id', verifyToken, verifyAdmin, readUser);
router.get('/users', verifyToken, verifyAdmin, readAllUsers);

export default router;

 