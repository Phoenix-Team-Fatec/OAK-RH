import axios from 'axios';


//função para listar as equipes com seus respectivos membros
export async function listEquipe() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/equipe/listar', {
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

// Função para excluir uma equipe pelo ID
export async function deleteEquipeById(equipeId: string) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:3000/equipe/${equipeId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error in deleteEquipeById function:", error);
        return error;
    }
}












