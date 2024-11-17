import axios from "axios";

//Função para editar formulário
export async function editForm(formulario_id:number, formulario:any){
    try{
        const response = await axios.put(`http://localhost:3000/formulario/${formulario_id}`, formulario);
        return response.data
    }catch(error){
        console.log(error)
    }
}

    //Função para listar titulo e descrição do formulário
    export async function getForm(formulario_id:number){
        try{
            const response = await axios.get(`http://localhost:3000/formulario/${formulario_id}`);
            const form = response.data
            const data = {
                
                    id: form.id,
                    titulo: form.nome,
                    descricao: form.descricao
                }
            
            return data
        }catch(error){
            console.log(error)
        }
    }

//Função para listar as perguntas de um formulário
export async function getQuestions(formulario_id:number){
    try{
        const response = await axios.get(`http://localhost:3000/perguntas/listar/${formulario_id}`);
        const data = response.data.map((question:any) => {
            return {
                id: question.id,
                type: question.tipo,
                value: question.texto,
                options: question.descricao,
                category: question.categoria.nome
            }
        })
        return data
    }catch(error){
        console.log(error)
    }
}

//Função para criar uma pergunta
export async function createQuestion(formulario_id:number, texto:string, tipo:string, descricao:string[], categoria_id:number){
    try{
        const response = await axios.post('http://localhost:3000/perguntas', {
            formulario_id: formulario_id,
            texto: texto,
            tipo: tipo,
            descricao: descricao,
            categoria_id: categoria_id
        });
        return response.data;
    }catch(error){
        console.log("Error in createQuestion function:", error);
        return error;
    }
}


//Função para listar as categorias
export async function getCategories(id_admin:number){
    try{
        const response = await axios.get(`http://localhost:3000/categorias/${id_admin}`);
        const data = response.data.map((category:any) => {
            return {
                
                nome: category.nome
            }
        })

        return data
    }catch(error){
        console.log(error)
    }
}

//Função para listar uma categoria
export async function getCategory(categoria_id:number){
    try{
        const response = await axios.get(`http://localhost:3000/categorias/${categoria_id}`);
        return response.data
    }catch(error){
        console.log(error)
    }
}


//Função para editar as perguntas
export async function editQuestion(pergunta_id:number, pergunta:any){
    try{
        const response = await axios.put(`http://localhost:3000/perguntas/${pergunta_id}`, pergunta);
        return response.data
    }catch(error){
        console.log(error)
    }
}


//Função para deletar uma pergunta
export async function deleteQuestion(pergunta_id:number){
    try{
        const response = await axios.delete(`http://localhost:3000/perguntas/${pergunta_id}`);
        return response.data
    }catch(error){
        console.log(error)
    }
}