import Formulario_user from "../models/formulario_user";
import Formulario from "../models/formularioModels";
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

export const listarFormulariosRespondidos = async(user_id: number) => {
    try {
        const formulariosDesejados: Formulario[] = []
        const formularios = await Formulario.findAll({
            include: {
                model: Formulario_user,
                as: 'form',
                where: { user_id: user_id }, // Filtrando pela tabela de ligação
            },
        });

        for (const formulario of formularios) {
            let form_id = formulario.id;
            let semResposta = false
            const perguntas = await Pergunta.findAll({where:{formulario_id: form_id}})

            for (const pergunta of perguntas) {
                let per_id = pergunta.id
                const resposta = await Resposta.findOne({ where: { pergunta_id: per_id, respondido_por: user_id} });

                if (!resposta) {
                    console.log('porra ',form_id)
                    semResposta = true
                }
            }

            if (!semResposta){
                formulariosDesejados.push(formulario)
            }
        }
        return formulariosDesejados

    } catch (error) {
        console.log('Erro ao listar formulários pendentes', error)
    }
}

export const listarFormulariosPendentes = async(user_id: number) => {
    try {
        const formulariosDesejados: Formulario[] = []
        const formularios = await Formulario.findAll({
            include: {
                model: Formulario_user,
                as: 'form',
                where: { user_id: user_id }, // Filtrando pela tabela de ligação
            },
        });

        for (const formulario of formularios) {
            let form_id = formulario.id;
            let semResposta = false
            const perguntas = await Pergunta.findAll({where:{formulario_id: form_id}})

            for (const pergunta of perguntas) {
                let per_id = pergunta.id
                const resposta = await Resposta.findOne({ where: { pergunta_id: per_id, respondido_por: user_id} });

                if (!resposta) {
                    semResposta = true
                }
            }

            if (semResposta){
                formulariosDesejados.push(formulario)
            }
        }
        return formulariosDesejados

    } catch (error) {
        console.log('Erro ao listar formulários pendentes', error)
    }
}

//Função de listar apenas um formulário
export const listarUmFormulario = async ( id:number) => {

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