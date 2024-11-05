import Formulario_user from "../models/formulario_user";
import Formulario from "../models/formularioModels";
import Formulario_equipe from "../models/formulario_equipeModels";
import Pergunta from "../models/perguntasModels";
import Resposta from "../models/respostasModels";

//Função de criar formulário
export const createFormularioService = async (nome: string, descricao: string, admin_id: number) => {
    try {
        const newFormulario = await Formulario.create({
            nome,
            descricao,
            admin_id
        });
        return newFormulario;
    }catch(error) {
        console.log("Error creating form", error);
    }
};


//Função de listar formulários
export const listarFormularios =  async (admin_id:number) =>{
    try{
        const formularios = await Formulario.findAll({where:{admin_id}});
        return formularios

    }catch(error){
        console.log("Erro ao listar todos os formulário", error)
    }
}

export const listarFormulariosRespondidos = async(user_id: number, equipe_id: number) => {
    try {
    
        const formularios = await Formulario.findAll({
            include: [{
                model: Formulario_user,
                as: 'form',
                where: { user_id: user_id, status:'respondido'}, // Filtrando pela tabela de ligação
            },
            {
                model: Formulario_equipe,
                as: 'formularios',
                where: { equipe_id: equipe_id }
            }
        ]
        });

        
        return formularios

    } catch (error) {
        console.log('Erro ao listar formulários pendentes', error)
    }
}



export const listarFormulariosPendentes = async(user_id: number, equipe_id: number) => {
    try {
    
        const formularios = await Formulario.findAll({
           
            include: [ {
                model: Formulario_user,
                as: 'form',
                where: { user_id: user_id, status:'pendente' }, // Filtrando pela tabela de ligação
            },
            {
                model: Formulario_equipe,
                as: 'formularios',
                where: { equipe_id: equipe_id }
            }

        ]
        });

         
        return formularios

    } catch (error) {
        console.log('Erro ao listar formulários pendentes', error)
    }
}


//Função para mudar status de pendente para respondido
export const mudarStatus = async (user_id: number, formulario_id: number) => {
    try{
        const form = await Formulario_user.findOne({where:{user_id, formulario_id}})
        if(!form){
            return {message:"Formulário não encontrado"}
        }
        form.status = "respondido"
        form.save()
        return {message:"Status alterado com sucesso"}

    }catch(error){
        console.log("Erro ao mudar status", error)
    }
}



//Função de listar apenas um formulário
export const listarUmFormulario = async ( id: number) => {

    try{
        const formulario = await Formulario.findByPk(id);
        return formulario

    }catch(error){
        console.log("Erro ao listar apenas um formulário", error)

    }

} 

//Função para deletar formulário
export const deletarFormulario = async (id:number) =>{
    try{
        const formulario = await Formulario.findByPk(id)
        
        if(!formulario){
            return {message:"Formulario não encontrado"}
        }

        await formulario.destroy();

         return {message:"Formulario deletado com sucesso"}

    }catch(error){
        console.log("Erro ao deletar Formulário", error)

    }

}


//Função para atualizar formulário
export const atualizarFormulario = async (id:number, nome?: string, descricao?: string) => {
    try{
        const formulario = await Formulario.findByPk(id);

        if(!formulario){
            return {message:"Formulario não encontrado"}
        }

        if(nome){
            formulario.nome = nome;
        }else if(descricao){
            formulario.descricao = descricao;
        }


        formulario.save()

        return {message:"Formulario atualizado com sucesso "}

        


    }catch(error){
        console.log("Erro ao atualizar formulário", error)
    }

}