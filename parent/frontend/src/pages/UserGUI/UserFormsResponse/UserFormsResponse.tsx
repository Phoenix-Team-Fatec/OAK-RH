import { useEffect, useState } from "react";
import axios from "axios";
import UserRenderForms from "./UserRenderForms";
import './UserFormResponse.css';

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
    

    const [data, setData] = useState<Question[]>([])
    const [formsName, setFormsName] = useState("")
    const [formsDescription, setFormsDescription] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    

    useEffect(() => {
        async function fetchData() {
            const questions = await axios.get(`http://localhost:3000/perguntas/listar/${formulario_id}`)
            setData(questions.data)
            const formsId = questions.data[0].formulario_id


            const forms = await axios.get(`http://localhost:3000/formulario/${formsId}`)
            setFormsName(forms.data.nome)
            setFormsDescription(forms.data.descricao)

            setIsLoading(false)
        }

        if (isLoading) fetchData()
    }, [isLoading]);

    async function handleSubmit(answers: Resposta[]) {
        try {
            await axios.post("http://localhost:3000/respostas", answers)
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
                    <UserRenderForms data={data} equipe_id={Number(equipe_id)} onSubmit={handleSubmit} formsId={Number(formulario_id)}/>
                </div>
                </>
            )}
        </div>
    );
}