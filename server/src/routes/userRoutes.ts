import { Router } from "express";
import { createUser, deleteUser, login, getIdUser } from '../controllers/userController';
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware";
import { createEquipe, getAllEquipes, getEquipeById, updateEquipe, deleteEquipe } from "../controllers/equipeController";
import { setUsuarioEquipe, listEquipeUser, mudarEstadoLider,getEquipeUser, removerUsuario } from "../controllers/equipe_userController";
import router from "./defaultRoutes";

// Apenas administradores podem acessar essas rotas
router.post('/users/create', verifyToken,verifyAdmin, createUser);
router.get('/users', verifyToken, verifyAdmin);
router.post('/', login);
router.delete('/users/:id', verifyToken, verifyAdmin, deleteUser);
router.get('/users/getId/:email', verifyToken, verifyAdmin, getIdUser);
//router.get('/users/:id', verifyToken, verifyAdmin, getUserById);
//router.put('users/:id', verifyToken, verifyAdmin, updateUser);


// ROTAS DE EQUIPE
router.post('/equipe/criar', verifyToken, verifyAdmin, createEquipe);
router.get('/equipe/listar', verifyToken, verifyAdmin, getAllEquipes);
router.get('/equipe/:id', verifyToken, verifyAdmin, getEquipeById);       
router.put('/equipe/:id', verifyToken, verifyAdmin, updateEquipe);         
router.delete('/equipe/:id', verifyToken, verifyAdmin, deleteEquipe);   






// ROTAS EQUIPE_USER

router.post('/equipe_user/associar', verifyToken, verifyAdmin, setUsuarioEquipe);
router.get('/equipe_user/listar', verifyToken, listEquipeUser);
router.post('/equipe_user/mudarLider', verifyToken, verifyAdmin, mudarEstadoLider);
router.get('/equipe_user/:id', verifyToken, verifyAdmin, getEquipeUser);
router.delete('/equipe_user/:id', verifyToken, verifyAdmin, removerUsuario);



export default router;
 