import axios from "axios";

    export async function registerUser(nome: string, email: string, senha:string) {
        try{
        const response = axios.post('http://localhost:3001/users/create', {
            nome: nome,
            email: email,
            senha: senha,
            is_admin: false
        });

        return response;
    }catch (error) {
        console.log("Error in registerUser function:", error);
        return error;
    }
        
    }

// Função para registrar equipe 
export async function registerTeam(nome: string) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
            'http://localhost:3000/equipe/criar',
            { nome: nome },
            { 
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    }catch (error) {
        console.log("Error in registerTeam funcion", error);
    }
}

export async function getIdUser(email: string) {

    try{
    const response = axios.get(`http://localhost:3001/users/getId/${email}`);
    return response; //retorna o id do usuário
    }catch (error) {
        console.log("Error in getIdUser function:", error);
        return error;
    }
}


export async function registerEquipe_user(userId: number, equipeId: number) {
    try{
        const response = axios.post('http://localhost:3001/equipe_user/associar', {
            userId: userId,
            equipeId: equipeId,
            isLider: false
        });
        return response;

    }catch (error) {
        console.log("Error in registerEquipe_user function:", error);
        return error;
    }
}






