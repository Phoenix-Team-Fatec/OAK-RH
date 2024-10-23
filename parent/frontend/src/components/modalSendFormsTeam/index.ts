import axios from "axios";



//Função para enviar formulários para uma equipe
export const sendFormsTeam = async (teamIds: number, formId: number, nivel:string) => {
    try {
        const response = await axios.post(`http://localhost:3000/formulario_equipe/associar`, {
            equipe_id: teamIds,
            formulario_id: formId,
            nivel: nivel
        });
        console.log(teamIds)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


//Função para enviar formulários para todas as equipes
export const sendFormsAllTeams = async (formId: number, nivel:string, id_admin: number) => {
    try {
        const response = await axios.post(`http://localhost:3000/formulario_equipe/associar_todas/${id_admin}`, {
            formulario_id: formId,
            nivel: nivel
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}




//Função para listar todas as equipes 
export const listAllTeams = async (id_admin: number) => {
    try {
        const response = await axios.get(`http://localhost:3000/equipe/listar/${id_admin}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}