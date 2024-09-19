import { Router } from "express";
import { 
    createUser, 
    deleteUser, 
    login 
} from '../controllers/userController';
import { 
    createEquipe, 
    getAllEquipes, 
    getEquipeById, 
    updateEquipe, 
    deleteEquipe 
} from '../controllers/equipeController';
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware";

const router = Router();

// ROTAS DE USUÁRIOS
router.post('/users', verifyToken, verifyAdmin, createUser);
router.get('/users', verifyToken, verifyAdmin);
router.post('/users/login', login);
router.delete('/users/:id', verifyToken, verifyAdmin, deleteUser);
//router.get('/users/:id', verifyToken, verifyAdmin, getUserById);
//router.put('/users/:id', verifyToken, verifyAdmin, updateUser);

// ROTAS DE EQUIPE
router.post('/equipe/criar', verifyToken, verifyAdmin, createEquipe);
router.get('/equipe/listar', verifyToken, verifyAdmin, getAllEquipes);
router.get('/equipe/:id', verifyToken, verifyAdmin, getEquipeById);       
router.put('/equipe/:id', verifyToken, verifyAdmin, updateEquipe);         
router.delete('/equipe/:id', verifyToken, verifyAdmin, deleteEquipe);      

export default router;
