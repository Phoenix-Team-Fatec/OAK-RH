import axios from 'axios';


export const getResumes = async (formId:number, equipeId:number) => {
    try{
        const response = await axios.get(`http://localhost:3000/respostas/${formId}/${equipeId}`);
        return response.data;
    }catch(error){
        console.log("Error getting resumes", error)
    }
}


export const getNameQuestion = async (questionId:number) => {
    try{
        const response = await axios.get(`http://localhost:3000/perguntas/${questionId}`);
        return response.data;
    }catch(error){
        console.log("Error getting question name", error)
    }
}