import Pergunta from "../models/perguntasModels";
import Categoria from "../models/categoriasModels";


//Função criar pergunta
export const criarPerguntaService = async(formulario_id:number, texto:string, tipo:string, descricao: string[], categoria_id:number) =>{
    try{
        const pergunta = await Pergunta.create({
            formulario_id,
            texto,
            tipo,
            descricao,
            categoria_id
        })

        return pergunta

    }catch(error){
        console.log("Erro ao criar pergunta", error)
    }
}



//Função listar perguntas
export const listarPerguntasService = async (formulario_id: number) =>{
    try{
        const perguntas = await Pergunta.findAll({
            where:{formulario_id},
            include: {model: Categoria, as: 'categoria'}
            

            
        
        });
        return perguntas

    }catch(error){
        console.log("Erro ao listar perguntas", error)
    }
}


//Função listar apenas uma pergunta
export const listarUmaPerguntaService = async (id:number) =>{
    try{
        const pergunta = await Pergunta.findByPk(id);
        return pergunta

    }catch(error){
        console.log("Erro ao listar apenas uma pergunta", error)
    }
}


//Função deletar pergunta
export const deletarPerguntaService = async (id:number) =>{
    try{
        const pergunta = await Pergunta.findByPk(id);

        if(!pergunta){
            return {message:"Pergunta não encontrada"}
        }

        await pergunta.destroy();

        return {message:"Pergunta deletada com sucesso"}

    }catch(error){
        console.log("Erro ao deletar pergunta", error)
    }
}


export const atualizarPerguntaService = async (id: number, formulario_id?: number, texto?: string, tipo?: string, descricao?: string[], categoria_id?: number) => {
    try {
        const pergunta = await Pergunta.findByPk(id);

        if (!pergunta) {
            return { message: "Pergunta não encontrada" };
        }

        // Atualize cada campo individualmente
        if (formulario_id !== undefined) {
            pergunta.formulario_id = formulario_id;
        }
        if (texto !== undefined) {
            pergunta.texto = texto;
        }
        if (tipo !== undefined) {
            pergunta.tipo = tipo;
        }
        if (descricao !== undefined) {
            // Não é necessário converter o array para string, pois o campo já é um array
            pergunta.descricao = descricao;
        }
        if (categoria_id !== undefined) {
            pergunta.categoria_id = categoria_id;
        }

        await pergunta.save();

        return { message: "Pergunta atualizada com sucesso" };

    } catch (error) {
        console.log("Erro ao atualizar pergunta", error);
        return { message: "Erro ao atualizar pergunta" };
    }
};




