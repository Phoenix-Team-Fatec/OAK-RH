import { Router } from "express";
import { createUser, login } from '../controllers/userController';
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware";

const router = Router();

// Apenas administradores podem acessar essas rotas
router.post('/users', verifyToken, verifyAdmin, createUser);
router.get('/users', verifyToken, verifyAdmin);
router.post('/users/login', login);
//router.get('/users/:id', verifyToken, verifyAdmin, getUserById);
//router.put('users/:id', verifyToken, verifyAdmin, updateUser);
//router.delete('/users/:id,', verifyToken, verifyAdmin, deleteuser);

export default router;
 