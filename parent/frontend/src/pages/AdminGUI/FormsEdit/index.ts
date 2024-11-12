import axios from "axios";


export async function editForm(formulario_id:number){
    try{
        const response = await axios.put(`http://localhost:3000/formulario/atualizar/${formulario_id}`);
        return response.data
    }catch(error){
        console.log(error)
    }
}