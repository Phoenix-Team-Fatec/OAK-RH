import axios from "axios";



//Função para criar um formulário
export async function createForm(nome:string, descricao:string, admin_id:number){
    try{
   
        const response = await axios.post('http://localhost:3000/formulario/criar', {
            nome: nome,
            descricao: descricao,
            admin_id: admin_id
        });
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log("Error in createForm function:", error);
        return error;
    }
}



//Função para criar pergunta
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

//Função para listar equipes do admin
export async function listTeams(admin_id:number){
    try{
        const response = await axios.get(`http://localhost:3000/equipes/${admin_id}`);
        return response;
    }catch(error){
        console.log("Error in listTeams function:", error);
        return error;
    }
}



//Função para listar categorias
export async function listCategories(admin_id:number){
    try{
        const response = await axios.get(`http://localhost:3000/categorias/${admin_id}`);
        return response.data;
    }catch(error){
        console.log("Error in listCategories function:", error);
        return error;
    }
}