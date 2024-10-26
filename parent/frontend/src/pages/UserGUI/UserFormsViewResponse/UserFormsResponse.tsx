import axios from "axios";
import { useEffect, useState } from "react";
import UserRenderForms from "./UserRenderForms";
import useUserData from "../../../hooks/useUserData";

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

            setIsLoading(false)
        }

        if (isLoading) fetchData()
    }, [isLoading]);

    return (
        <div>
            {isLoading ? (
                <div>Carregando...</div>
            ) : (
                <>
                    <h2>{formsName}</h2>
                    <span>{formsDescription}</span>
                    <UserRenderForms formsData={formsData} answerData={answerData} />
                </>
            )}
        </div>
    );
}