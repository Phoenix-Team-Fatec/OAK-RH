import Equipe from "../models/equipeModels";
import Formulario_equipe from "../models/formulario_equipeModels";
import Formulario from "../models/formularioModels";


//Função Associar formulário a equipe
export const associarFormularioEquipe = async (formulario_id:number, equipe_id:number) => {
    try{
        const formulario_equipe = await Formulario_equipe.create({
            formulario_id,
            equipe_id
        });
        return formulario_equipe

    }catch(error){
        console.log("Erro ao associar formulário a equipe", error)

    }

}


//Função para listar formulários de uma equipe
export const listarFormulariosEquipe = async (equipe_id:number) => {
    try{
        const formularios = await Formulario_equipe.findAll({
            where:{
                equipe_id
            },
            
            
            include:[
                {
                    model: Equipe,
                    as: 'equipes',
                    attributes:['nome','descricao']
                },
                {
                    model: Formulario,
                    as: 'formularios',
                    attributes:['nome','descricao']
                }
            ]
        });
        return formularios

    }catch(error){
        console.log("Erro ao listar formulários de uma equipe", error)

    }
}


//Função para deletar formulário de uma equipe
export const deletarFormularioEquipe = async (id: number) =>{
    try{
        const formulario_equipe = await Formulario_equipe.findByPk(id)
        
        if(!formulario_equipe){
            return {message:"Formulário de equipe não encontrado"}
        }

        await formulario_equipe.destroy();

         return {message:"Formulário de equipe deletado com sucesso"}

    }catch(error){
        console.log("Erro ao deletar formulário de uma equipe", error)
    }
}
