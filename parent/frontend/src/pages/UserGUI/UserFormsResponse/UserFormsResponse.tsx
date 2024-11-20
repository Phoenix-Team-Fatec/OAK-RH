import { useEffect, useState } from "react";
import axios from "axios";
import UserRenderForms from "./UserRenderForms";
import './UserFormResponse.css';
import useUserData from "../../../hooks/useUserData";
import { useNavigate } from "react-router-dom";
import { ViewArray } from "@mui/icons-material";

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

    const navigate = useNavigate()
    
    const { id } = useUserData()

    const [data, setData] = useState<Question[]>([])
    const [formsName, setFormsName] = useState("")
    const [formsDescription, setFormsDescription] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState("")
    const [userArray, setUserArray] = useState<number[]>([])
    const [userArrayIndex, setUserArrayIndex] = useState(0)
    const [userId, setUserId] = useState(0)
    const [disablePrev, setDisablePrev] = useState(false)
    const [disableNext, setDisableNext] = useState(false)

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

        changeUser(0)
    }, [isLoading]);

    useEffect(() => {
        if (userArray.length === 0 && userId != 0) {
            navigate('/forms-user')
            return
        }
        setUserArrayIndex(0)
        changeUser(0)
    }, [userArray])

    async function changeUser(number: number) {
        const newIndex = userArrayIndex + number;
    
        setDisableNext(newIndex + 1 >= userArray.length);
        setDisablePrev(newIndex <= 0);
    
        setUserArrayIndex(newIndex);
    
        const newUserId = userArray[newIndex];
        setUserId(newUserId);
    
        try {
            const userData = await axios.get(`http://localhost:3000/user/getData/${newUserId}`);
            setUser(userData.data.nome);
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        }
    }

    async function handleSubmit(answers: Resposta[]) {
        try {
            await axios.post(`http://localhost:3000/respostas/${userId}`, answers)
            alert("Resposta enviada com sucesso");
        } catch (error) {
            alert("Erro ao enviar resposta")
            return
        }
        setUserArray(prevArr => prevArr.filter(id => id !== userId))
    }

    function handleBackButton() {
        navigate('/forms-user')
    }




    return (
        <div>
            {isLoading ? (
                <div>Carregando...</div>
            ) : (
                <>
                <div className="container-forms-responder-user">
                    <button className="userResponseBackButton view-forms-hover" onClick={handleBackButton}>Voltar</button>
                    <h2>Título do Formulário - {formsName}</h2>
                    <span className="description-forms-user">Descrição do Formulário: {formsDescription}</span>
                    <div className="response-user-name-container">
                        <span className="">Usuário: </span> 
                        <span className="description-forms-user-name"> {user} </span> 
                    </div>

                    <UserRenderForms data={data}
                        equipe_id={Number(equipe_id)} 
                        onSubmit={handleSubmit} 
                        formsId={Number(formulario_id)} 
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