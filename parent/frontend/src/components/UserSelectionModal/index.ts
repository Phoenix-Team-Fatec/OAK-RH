import axios from "axios";


//função para listar todos os usuários
export async function listUsers() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error in listUsers function:", error);
        return error;
    }
}



//função para pegar o id do usuário
export async function getIdUser(email: string) {

    try{
    const response = axios.get(`http://localhost:3000/users/getId/${email}`);
    return response; //retorna o id do usuário
    }catch (error) {
        console.log("Error in getIdUser function:", error);
        return error;
    }
}



// Função para registrar usuário em equipe
export async function registerEquipe_user(userId: number, equipeId: number, isLider: boolean) {
    try{
        const token = localStorage.getItem('token');
        const response = axios.post('http://localhost:3000/equipe_user/associar', 
            {
            userId: userId,
            equipeId: equipeId,
            isLider: isLider
           },
              {
                headers: {
                 Authorization: `Bearer ${token}`}
                
                }
        );
        return response;

    }catch (error) {

        console.log("Error in registerEquipe_user function:", error);
        return error;
    }
}

//função para listar apenas uma equipe com seus usuários
export async function getEquipe_user(equipeId: number) {
    try{
        const token = localStorage.getItem('token');
        const response = axios.get(`http://localhost:3000/equipe_user/${equipeId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    }catch (error) {
        console.log("Error in getEquipe_user function:", error);
        return error;
    }
}
