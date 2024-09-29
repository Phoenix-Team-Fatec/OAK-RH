import axios from "axios";

    export async function registerUser(nome: string, email: string, senha:string) {
        try{
        const token = localStorage.getItem('token');
        const response = axios.post('http://localhost:3000/users/create', 
            {
                nome: nome,
                email: email,
                senha: senha,
                is_admin: false,
            },
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            }
    );

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
        if (response.status === 201) {
            return response.data // Retorna os dados da equipe criada
        }else {
            throw new Error("Falha no cadastro de equipes");
        }
      }catch (error) {
        console.log("Error in registerTeam", error);
        throw error;
      }  
}

export async function getIdUser(email: string) {

    try{
    const response = axios.get(`http://localhost:3000/users/getId/${email}`);
    return response; //retorna o id do usuário
    }catch (error) {
        console.log("Error in getIdUser function:", error);
        return error;
    }
}

export async function registerEquipe_user(userId: number, equipeId: number) {
    try{
        const token = localStorage.getItem('token');
        const response = axios.post('http://localhost:3000/equipe_user/associar', 
            {
            userId: userId,
            equipeId: equipeId,
            isLider: false
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






