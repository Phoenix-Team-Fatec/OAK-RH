import axios from "axios";


//Função para listar formulários por equipe
export const listFormularios = async (id: number, equipe_id: number, status:string) => {
    try{
        let url;
        if (status === 'Pendentes'){
            url = `http://localhost:3000/formulariosPendentes/${id}/${equipe_id}`
        }else if(status === 'Respondidos'){
            url = `http://localhost:3000/formulariosRespondidos/${id}/${equipe_id}`
        }
        const response = await axios.get(url);
        return response.data;
  
    }catch(error){
        console.log(error)
        return {message:error}
        
    }
}

export const listarPendentes = async (id: number, equipe_id: number) => {
    try{
    const response = await axios.get(`http://localhost:3000/formulario/listar_pendentes/${id}/${equipe_id}`);
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

// Função para listar formulários com base no status e calcular porcentagem
export const getAnsweredFormsPercentage = async (id: number, equipe_id: number) => {
    try {

        // Obter formulários respondidos
        const respondedForms = await listFormularios(id, equipe_id, 'Respondidos');

        // Obter formulários pendentes
        const pendingForms = await listFormularios(id, equipe_id, 'Pendentes');

        // Calcular o total
        const totalForms = respondedForms.length + pendingForms.length;

        const percentage = totalForms > 0 ? (respondedForms.length / totalForms) * 100 : 0;

        return { percentage, total: totalForms, aswered: respondedForms.length };
    }catch (error) {
        console.error("Erro ao calcular a porcentagem de formulários respondidos:", error);
        return { percentage: 0, total: 0, aswered: 0}
    }
}