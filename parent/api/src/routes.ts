import { Router } from "express";
import { setUsuarioEquipe, listEquipeUser, mudarEstadoLider, getEquipeUser, removerUsuario, listarUserEquipe } from "./controllers/equipe_userController";
import { createUser, deleteUser, getIdUser, loginUser, readAllUsers, updateUser, readUser } from "./controllers/userController";
import { createEquipe, deleteEquipe, getAllEquipes, getEquipeById, updateEquipe } from "./controllers/equipeController";
import { createAdmin, loginAdm } from "./controllers/adminController";
import { criarFormularioControl, atuaizarFormularioControl, listarFormulariosPorMesControl, deletarFormularioControl, listarFormularioControl, listarUmFormularioControl, listarPendentesControl, listarRespondidosControl, mudarStatusControl, listarUsuariosComFormulariosControl } from "./controllers/formularioController";
import { associarFormularioEquipeController, associarFormularioTodasEquipesController, deletarFormularioEquipeController, listarFormulariosEquipeController } from "./controllers/equipe_formularioControllers";
import { criarCategoriaControl, listarCategoriasControl, listarUmaCategoriaControl, atualizarCategoriaControl, deletarCategoriaControl } from "./controllers/categoriasController"
import { criarPergunta, deletarPergunta, listarPerguntas, listarUmaPergunta, atualizarPergunta } from "./controllers/perguntasControllers";
import { createAnswer, findAnswerById, findAnswerByQuestionsAndUserId, findAnswerByQuestionsId, findAnswerByUser } from "./controllers/respostaControllers";



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
router.get('/users/listar_um/:id', readUser);
router.put('/users/:id', updateUser);


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
router.get('/equipe_user/listar/:id', listarUserEquipe);

// ROTAS FORMULÁRIO
router.post('/formulario/criar', criarFormularioControl);
router.get('/formulario/listar/:admin_id', listarFormularioControl);
router.get('/formulariosPendentes/:id/:equipe_id', listarPendentesControl);
router.get('/formulariosRespondidos/:id/:equipe_id', listarRespondidosControl);
router.get('/formulario/:id', listarUmFormularioControl);
router.put('/formulario/:id', atuaizarFormularioControl);
router.put('/formulario/atualizar/:user_id/:formulario_id',mudarStatusControl)
router.delete('/formulario/:id', deletarFormularioControl);
router.get('/formulario/usuarios/:id_admin', listarUsuariosComFormulariosControl);
router.get('/formularios/porMes/:admin_id', listarFormulariosPorMesControl);


// ROTAS DE FORMULÁRIO_EQUIPE
router.post('/formulario_equipe/associar', associarFormularioEquipeController);
router.post('/formulario_equipe/associar_todas/:id_admin', associarFormularioTodasEquipesController);
router.get('/formulario_equipe/listar/:equipe_id', listarFormulariosEquipeController);
router.delete('/formulario_equipe/:id', deletarFormularioEquipeController);

// Rotas de Categoria
router.post('/categorias', criarCategoriaControl);
router.get('/categorias/:id_admin', listarCategoriasControl);
router.get('/categorias/:id', listarUmaCategoriaControl);
router.put('/categorias/:id', atualizarCategoriaControl);
router.delete('/categorias/:id', deletarCategoriaControl);


// Rotas de Perguntas
router.post('/perguntas', criarPergunta);
router.get('/perguntas/listar/:formulario_id', listarPerguntas);
router.get('/perguntas/:id', listarUmaPergunta);
router.put('/perguntas/:id', atualizarPergunta);
router.delete('/perguntas/:id', deletarPergunta);

//Rotas de Respostas
router.post('/respostas', createAnswer);
router.get('/respostas/:answerId', findAnswerById);
router.get('/respostas/listar/:answerId', findAnswerByQuestionsId);
router.get('/resposta/usuario/:questionId/:userId', findAnswerByQuestionsAndUserId)
router.get('/respostas/user/:userId', findAnswerByUser)


export default router;
