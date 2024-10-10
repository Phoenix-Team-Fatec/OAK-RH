import { Router } from "express";
import { setUsuarioEquipe, listEquipeUser, mudarEstadoLider,getEquipeUser, removerUsuario } from "./controllers/equipe_userController";
import { createUser, deleteUser, getIdUser, login, readAllUsers } from "./controllers/userController";
import { createEquipe, deleteEquipe, getAllEquipes, getEquipeById, updateEquipe } from "./controllers/equipeController";
import { createAdmin } from "./controllers/adminController";

const router = Router();

//Rotas de cadastro de administrador
router.post('/adm', createAdmin)

// Apenas administradores podem acessar essas rotas
router.post('/users/create', createUser);
router.get('/users/:id_admin', readAllUsers);
router.post('/', login);
router.delete('/users/:id', deleteUser);
router.get('/users/getId/:email', getIdUser);
//router.get('/users/:id', getUserById);
//router.put('users/:id', updateUser);


// ROTAS DE EQUIPE
router.post('/equipe/criar', createEquipe);
router.get('/equipe/listar/:id_admin', getAllEquipes);
router.get('/equipe/:id', getEquipeById);       
router.put('/equipe/:id', updateEquipe);         
router.delete('/equipe/:id', deleteEquipe);   

// ROTAS EQUIPE_USER

router.post('/equipe_user/associar', setUsuarioEquipe);
router.get('/equipe_user/listar', listEquipeUser);
router.post('/equipe_user/mudarLider', mudarEstadoLider);
router.get('/equipe_user/:id', getEquipeUser);
router.delete('/equipe_user/remover', removerUsuario);



export default router;
 