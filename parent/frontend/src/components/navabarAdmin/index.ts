import axios from "axios";



export async function getEquipes(id_admin: number){
    try{
        const response = await axios.get(`http://localhost:3000/equipe/listar/${id_admin}`)
        return response.data

    }catch(error){
        console.log(error)
    }
}