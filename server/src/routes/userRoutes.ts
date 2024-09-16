import { Router } from "express";
import { createUser, getAllUser, getUserById, updateUser, deleteuser } from '../controllers/userController';
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware";

const router = Router();

// Apenas administradores podem acessar essas rotas
router.post('/users', verifyToken, verifyAdmin, createUser);
router.get('/users', verifyToken, verifyAdmin getAllUser);
router.get('/users/:id', verifyToken, verifyAdmin, getUserById);
router.put('users/:id', verifyToken, verifyAdmin, updateUser);
router.delete('/users/:id,', verifyToken, verifyAdmin, deleteuser);

export default router;
