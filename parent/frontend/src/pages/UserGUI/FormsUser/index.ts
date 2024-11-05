import axios from "axios";


//Função para listar formulários por equipe
export const listFormularios = async (id: number) => {
    try{
    const response = await axios.get(`http://localhost:3000/formulario_equipe/listar/${id}`);
    return response.data;
    }catch(error){
        console.log(error)
        return {message:error}
    }
}

//função para ler os dados de um usuário
export const listUser_Teams = async (id: number) => {
    try{
    const response = await axios.get(`http://localhost:3000/equipe_user/listar/${id}`);
    return response.data;
    }catch(error){
        console.log(error)
        return {message:error}
        
    }
}