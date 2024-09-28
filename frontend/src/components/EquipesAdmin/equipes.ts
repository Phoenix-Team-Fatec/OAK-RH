import axios from 'axios';


//função para listar as equipes com seus respectivos membros
export async function listEquipeUser() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/equipe_user/listar', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error in listEquipeUser function:", error);
        return error;
    }
}












