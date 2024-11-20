import axios from "axios";
import { useEffect, useState } from "react";
import UserRenderForms from "./UserRenderForms";
import useUserData from "../../../hooks/useUserData";
import './UserViewResponse.css';
import { Navigate, useNavigate } from "react-router-dom";

interface Question {
    categoria_id: number;
    descricao: string[];
    formulario_id: number;
    id: number;
    texto: string;
    tipo: QuestionType;
}

interface Resposta {
    formulario_id: number;
    pergunta_id: number;
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

export default function UserFormsResponseView() {
    const [formulario_id] = useState(() => {
        const params = new URLSearchParams(document.location.search);
        const id = params.get("id");
        return id !== null ? id : 0;
    });
    const [formsData, setFormsData] = useState<Question[]>([])
    const [formsName, setFormsName] = useState("")
    const [formsDescription, setFormsDescription] = useState("")
    const [answerData, setAnswerData] = useState<Resposta[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState("")
    const [userArray, setUserArray] = useState<number[]>([])
    const [userArrayIndex, setUserArrayIndex] = useState(0)
    const [disablePrev, setDisablePrev] = useState(false)
    const [disableNext, setDisableNext] = useState(false)

    const navigate = useNavigate()

    const userData = useUserData()

    useEffect(() => {
        async function fetchData() {
            const questions = await axios.get(`http://localhost:3000/perguntas/listar/${formulario_id}`)
            setFormsData(questions.data)
            const formsId = questions.data[0].formulario_id

            const forms = await axios.get(`http://localhost:3000/formulario/${formsId}`)
            console.log(forms.data)
            setFormsName(forms.data.nome)

            const answer = await axios.get(`http://localhost:3000/resposta/usuario/${formulario_id}/${userData.id}`)
            setAnswerData(answer.data)
            setFormsDescription(forms.data.descricao)

            const usersArray = await axios.get(`http://localhost:3000/formulario_equipe/get/arrayUserToAnswer/${formsId}/${userData.id}`)
            setUserArray(usersArray.data)

            const answeredUserData = await axios.get(`http://localhost:3000/user/getData/${usersArray.data[0]}`)
            setUser(answeredUserData.data.nome)

            setIsLoading(false)
        }

        changeUser(0)
        if (isLoading) fetchData()
    }, [isLoading]);

    async function changeUser(number: number) {
        const newIndex = userArrayIndex + number

        setDisableNext(newIndex + 1 >= userArray.length)
        setDisablePrev(newIndex <= 0)
        
        setUserArrayIndex(newIndex)

        const answeredUserData = await axios.get(`http://localhost:3000/user/getData/${userArray[newIndex]}`)
        setUser(answeredUserData.data.nome)
    }

    function handleBackButton(){
        navigate('/forms-user')
    }

    return (
        <div>
            {isLoading ? (
                <div>Carregando...</div>
            ) : (
                <>
                    <div className="container-forms-ver-respostas-user">
                        <button className="userResponseBackButton view-forms-hover" onClick={handleBackButton}>Voltar</button>
                        <h2>{formsName}</h2>
                        <span>{formsDescription}</span>
                        <span className="view-response-forms-username">{user}</span>
                        <UserRenderForms formsData={formsData} 
                        answerData={answerData} 
                        />
                        
                        <div className="responseNavigationButtonContainer">
                            <button onClick={() => changeUser(-1)} disabled={disablePrev} className="view-forms-hover">Anterior</button>
                            <button onClick={() => changeUser(1)} disabled={disableNext} className="view-forms-hover">Próximo</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}