
import axios from "axios";

//função para excluir membro da equipe
export async function removeUserFromEquipe(userId: number, equipeId: number){
    try{
        const token = localStorage.getItem('token');
        const response = axios.delete('http://localhost:3000/equipe_user/remover', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                userId: userId,
                equipeId: equipeId
            }
        });
        return response;
    }catch(error){
        console.log("Error in removeUserFromEquipe function:", error);
        return error;
    }

}




//função para mudar estado de lider 
export async function changeLeader(userId: number, equipeId: number, isLider: boolean){
    try{
        const token = localStorage.getItem('token');
        const response = axios.post('http://localhost:3000/equipe_user/mudarLider', {
            userId: userId,
            equipeId: equipeId,
            isLider: isLider
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    }catch(error){
        console.log("Error in changeLeader function:", error);
        return error;
    }
}


//função para listar apenas uma equipe com seus usuários
export async function getEquipe_user(equipeId: number) {
    try{
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/equipe_user/${equipeId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }catch (error) {
        console.log("Error in getEquipe_user function:", error);
        return error;
    }
}
