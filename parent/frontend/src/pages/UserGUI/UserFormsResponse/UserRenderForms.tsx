import { FC, useState } from "react";
import useUserData from "../../../hooks/useUserData";
import axios from "axios";

interface UserRenderFormsProps {
    data: Question[];
    formsId: number;
    equipe_id: number;
    onSubmit: (respostas: Resposta[]) => void;
}

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

const UniqueChoice: FC<{ question: Question; index: number; onAnswer: (id: number, resposta: string) => void }> = ({ question, index, onAnswer }) => (
    <div className="unique-choice-question">
        <label className="unique-choice-question-text">
            {`${index + 1} ) ${question.texto}`}  
        </label>
        {question.descricao.map((answer, index) => (
            <label key={`${question.id}-${index}`} className="unique-choice-answer">
                <input
                    type="radio"
                    name={question.id.toString()}
                    value={answer}
                    onChange={() => onAnswer(question.id, answer)}
                    className="unique-choice-input"
                />
                {answer}
            </label>
        ))}
        <hr className="question-separator" />
    </div>
);

const MultipleChoice: FC<{ question: Question; index: number; onAnswer: (id: number, resposta: string[]) => void }> = ({ question, index, onAnswer }) => {
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

    const handleCheckboxChange = (answer: string): string[] => {
        const updated = selectedAnswers.includes(answer)
            ? selectedAnswers.filter(a => a !== answer)
            : [...selectedAnswers, answer];
        setSelectedAnswers(updated);
        return updated;
    };

    return (
        <div className="multiple-choice-question">
            <label className="multiple-choice-question-text">
                {`${index + 1} ) ${question.texto}`}  
            </label>
            {question.descricao.map((answer, index) => (
                <label key={`${question.id}-${index}`} className="multiple-choice-answer">
                    <input
                        type="checkbox"
                        value={answer}
                        onChange={() => {
                            const updatedAnswers = handleCheckboxChange(answer);
                            onAnswer(question.id, updatedAnswers);
                        }}
                        className="multiple-choice-input"
                    />
                    {answer}
                </label>
            ))}
            <hr className="question-separator" />
        </div>
    );
};

const LongQuestion: FC<{ question: Question; index: number; onAnswer: (id: number, resposta: string) => void }> = ({ question, index, onAnswer }) => {
    return (
        <div className="long-question">
            <label className="long-question-text">
                {`${index + 1} ) ${question.texto}`} 
            </label>
            <input
                type="text"
                onChange={(e) => onAnswer(question.id, e.target.value)}
                className="long-question-input"
            />
            <hr className="question-separator" />
        </div>
    );
};

export default function UserRenderForms({ data, equipe_id, formsId, onSubmit }: UserRenderFormsProps) {
    const [respostas, setRespostas] = useState<{ formulario_id: number, pergunta_id: number; respondido_por: number; equipe_id: number; resposta: string | string[]; tipo_resposta: string; }[]>([]);

    const userData = useUserData();
    const { id } = useUserData();

    const handleChangeFormStatus = async () => {
        try {
            await axios.put(`http://localhost:3000/formulario/atualizar/${id}/${formsId}`);
        } catch (error) {
            alert("Erro ao mudar status do formulário");
            console.log(error);
        }
    };

    const handleAnswer = (id: number, resposta: string | string[]) => {
        setRespostas(prev => {
            const existing = prev.find(r => r.pergunta_id === id);
            if (existing) {
                return prev.map(r => r.pergunta_id === id ? { ...r, resposta } : r);
            }
            return [...prev, { formulario_id: formsId, pergunta_id: id, respondido_por: userData.id, equipe_id: equipe_id, resposta, tipo_resposta: "" }];
        });
    };

    const handleSubmit = () => {
        const allAnswered = data.every(question => respostas.some(r => r.pergunta_id === question.id && r.resposta !== ""));

        if (!allAnswered) {
            alert('Por favor, responda a todas as perguntas antes de enviar.');
            return;
        }

        const novasRespostas: Resposta[] = respostas.map(r => ({
            ...r,
            tipo_resposta: data.find(q => q.id === r.pergunta_id)?.tipo as QuestionType || "unknown"
        }));

        onSubmit(novasRespostas);
        handleChangeFormStatus();
    };

    return (
        <>
            <form className="user-render-forms">
                {data.map((question, index) => {
                    const { tipo } = question;

                    switch (tipo) {
                        case "uniqueChoice":
                            return <UniqueChoice key={question.id} question={question} index={index} onAnswer={handleAnswer} />;
                        case "multipleChoice":
                            return <MultipleChoice key={question.id} question={question} index={index} onAnswer={handleAnswer} />;
                        case "longQuestion":
                            return <LongQuestion key={question.id} question={question} index={index} onAnswer={handleAnswer} />;
                        default:
                            return <div key={question.id}><h3>Type of question undefined</h3></div>;
                    }
                })}
                <button type="button" onClick={handleSubmit} className="submit-button">Enviar Respostas</button>
            </form>
        </>
    );
}
