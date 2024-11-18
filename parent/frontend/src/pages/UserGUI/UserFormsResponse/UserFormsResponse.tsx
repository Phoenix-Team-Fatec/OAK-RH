import { useEffect, useState } from "react";
import axios from "axios";
import UserRenderForms from "./UserRenderForms";
import './UserFormResponse.css';
import useUserData from "../../../hooks/useUserData";

interface Question {
    categoria_id: number;
    descricao: string[];
    formulario_id: number;
    id: number;
    texto: string;
    tipo: string;
}

interface Resposta {
    pergunta_id: number;
    formulario_id: number;
    respondido_por: number;
    equipe_id: number;
    resposta: string | string[];
    tipo_resposta: QuestionType;
}

enum QuestionType {
    UniqueChoice = "uniqueChoice",
    MultipleChoice = "multipleChoice",
    LongQuestion = "longQuestion",
}

export default function UserFormsResponse() {
    const [formulario_id] = useState(() => {
        const params = new URLSearchParams(document.location.search);
        const id = params.get("id");
        
        return id !== null ? id : 0;
    });

    const [equipe_id] = useState(() => {
        const params = new URLSearchParams(document.location.search);
        const id = params.get("equipe_id");
        
        return id !== null ? id : 0;
    });
    
    const { id } = useUserData()

    const [data, setData] = useState<Question[]>([])
    const [formsName, setFormsName] = useState("")
    const [formsDescription, setFormsDescription] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState("")
    const [userArray, setUserArray] = useState<number[]>([])
    const [userArrayIndex, setUserArrayIndex] = useState(0)
    const [userId, setUserId] = useState(0)
    

    useEffect(() => {
        async function fetchData() {
            const questions = await axios.get(`http://localhost:3000/perguntas/listar/${formulario_id}`)
            setData(questions.data)
            const formsId = questions.data[0].formulario_id


            const forms = await axios.get(`http://localhost:3000/formulario/${formsId}`)
            setFormsName(forms.data.nome)
            setFormsDescription(forms.data.descricao)

            
            const usersArray = await axios.get(`http://localhost:3000/formulario_equipe/get/arrayUserToAnswer/${formsId}/${id}`)
            setUserArray(usersArray.data)

            const userData = await axios.get(`http://localhost:3000/user/getData/${usersArray.data[0]}`)
            setUser(userData.data.nome)
            setUserId(userData.data.id)

            setIsLoading(false)
        }

        if (isLoading) fetchData()
    }, [isLoading]);

    async function nextUser() {
        if(userArrayIndex+1 >= userArray.length && userArrayIndex != 0){
            alert("Fim");
            return
        }
        setUserArrayIndex(userArrayIndex+1)
        setUserId(userArray[userArrayIndex])

        const userData = await axios.get(`http://localhost:3000/user/getData/${userArray[userArrayIndex+1]}`)
        setUser(userData.data.nome)
    }

    async function handleSubmit(answers: Resposta[]) {
        try {
            await axios.post(`http://localhost:3000/respostas/${userId}`, answers)
            alert("Resposta enviada com sucesso");
        } catch (error) {
            alert("Erro ao enviar resposta")
            return
        }
    }


  

    return (
        <div>
            {isLoading ? (
                <div>Carregando...</div>
            ) : (
                <>
                <div className="container-forms-responder-user">
                    <h2>Título do Formulário - {formsName}</h2>
                    <span className="description-forms-user">Descrição do Formulário: {formsDescription}</span>
                    <span className="description-forms-user">Usuário: {user}</span>
                    <UserRenderForms data={data} equipe_id={Number(equipe_id)} onSubmit={handleSubmit} formsId={Number(formulario_id)}/>
                    <button onClick={nextUser}>A</button>
                </div>
                </>
            )}
        </div>
    );
}