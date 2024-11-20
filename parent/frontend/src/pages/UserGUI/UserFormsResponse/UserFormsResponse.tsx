import { useEffect, useState } from "react";
import axios from "axios";
import UserRenderForms from "./UserRenderForms";
import './UserFormResponse.css';
import useUserData from "../../../hooks/useUserData";
import { useNavigate } from "react-router-dom";

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
    const [respostasByUser, setRespostasByUser] = useState<{ [key: number]: Resposta[] }>({});

    useEffect(() => {
        async function fetchData() {
            try {
                // Buscar perguntas
                const questionsResponse = await axios.get(`http://localhost:3000/perguntas/listar/${formulario_id}`)
                const questions = questionsResponse.data
                setData(questions)
                const formsId = questions[0].formulario_id

                // Buscar formulário
                const formsResponse = await axios.get(`http://localhost:3000/formulario/${formsId}`)
                setFormsName(formsResponse.data.nome)
                setFormsDescription(formsResponse.data.descricao)

                // Buscar usuários
                const usersArrayResponse = await axios.get(`http://localhost:3000/formulario_equipe/get/arrayUserToAnswer/${formsId}/${id}`)
                const users = usersArrayResponse.data
                console.log(users)
                setUserArray(users)

                if (users.length > 0) {
                    const firstUserId = users[0]
                    setUserId(firstUserId)
                    const userDataResponse = await axios.get(`http://localhost:3000/user/getData/${firstUserId}`)
                    setUser(userDataResponse.data.nome)

                }

                setIsLoading(false)
            } catch (error) {
                console.error("Erro ao buscar dados:", error)
                setIsLoading(false)
            }
        }

        if (isLoading) fetchData()
    }, [isLoading, formulario_id, id]);

    useEffect(() => {
        if (userArray.length === 0 && userId != 0) {
            navigate('/forms-user')
            return
        }
        setUserArrayIndex(0)
        changeUser(0)
    }, [userArray])

    async function changeUser(number: number) {
        // Antes de mudar, salvar as respostas atuais (opcional, se necessário)

        const newIndex = userArrayIndex + number;

        setDisableNext(newIndex + 1 >= userArray.length);
        setDisablePrev(newIndex <= 0);

        setUserArrayIndex(newIndex);

        const newUserId = userArray[newIndex];
        setUserId(newUserId);

        try {
            const userDataResponse = await axios.get(`http://localhost:3000/user/getData/${newUserId}`);
            setUser(userDataResponse.data.nome);

        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
            setRespostasByUser(prev => ({ ...prev, [newUserId]: [] }));
        }
    }


    async function handleSubmit(answers: Resposta[]) {
        try {
            await axios.post(`http://localhost:3000/respostas/${userId}`, answers)
            alert("Resposta enviada com sucesso");
            setRespostasByUser(prev => ({ ...prev, [userId]: answers }))
        } catch (error) {
            alert("Erro ao enviar resposta")
            console.error(error)
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
                            respostas={respostasByUser[userId] || []}
                            setRespostas={(respostas: Resposta[]) => setRespostasByUser(prev => ({ ...prev, [userId]: respostas }))}
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