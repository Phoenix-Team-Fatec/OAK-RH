import { Router } from "express";
import { setUsuarioEquipe, listEquipeUser, mudarEstadoLider,getEquipeUser, removerUsuario } from "./controllers/equipe_userController";
import { createUser, deleteUser, getIdUser, loginUser, readAllUsers } from "./controllers/userController";
import { createEquipe, deleteEquipe, getAllEquipes, getEquipeById, updateEquipe } from "./controllers/equipeController";
import { createAdmin, loginAdm } from "./controllers/adminController";
import { criarFormularioControl, atuaizarFormularioControl, deletarFormularioControl, listarFormularioControl, listarUmFormularioControl } from "./controllers/formularioController";
import { associarFormularioEquipeController, deletarFormularioEquipeController, listarFormulariosEquipeController } from "./controllers/equipe_formularioControllers";
import { criarCategoriaControl, listarCategoriasControl, listarUmaCategoriaControl, atualizarCategoriaControl, deletarCategoriaControl } from "./controllers/categoriasController"

const router = Router();

//Rotas de cadastro de administrador
router.post('/adm', createAdmin)
router.post('/adm/login', loginAdm)

// Apenas administradores podem acessar essas rotas
router.post('/users/create', createUser);
router.get('/users/:id_admin', readAllUsers);
router.post('/users/login', loginUser);
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



// ROTAS FORMULÁRIO
router.post('/formulario/criar', criarFormularioControl);
router.get('/formulario/listar/:admin_id', listarFormularioControl);
router.get('/formulario/:id', listarUmFormularioControl);       
router.put('/formulario/:id', atuaizarFormularioControl);         
router.delete('/formulario/:id', deletarFormularioControl);  


// ROTAS DE FORMULÁRIO_EQUIPE
router.post('/formulario_equipe/associar', associarFormularioEquipeController);
router.get('/formulario_equipe/listar/:equipe_id', listarFormulariosEquipeController);
router.delete('/formulario_equipe/:id', deletarFormularioEquipeController);

// Rotas de Categoria
router.post('/categorias', criarCategoriaControl);                 
router.get('/categorias', listarCategoriasControl);                
router.get('/categorias/:id', listarUmaCategoriaControl);            
router.put('/categorias/:id', atualizarCategoriaControl);            
router.delete('/categorias/:id', deletarCategoriaControl);          

export default router;
 