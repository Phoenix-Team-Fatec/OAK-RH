import { FC, useState } from "react";
import useUserData from "../../../hooks/useUserData";

interface UserRenderFormsProps {
    data: Question[];
    formsId: number,
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

const UniqueChoice: FC<{ question: Question; onAnswer: (id: number, resposta: string) => void }> = ({ question, onAnswer }) => (
    <div>
        <label>{question.texto}</label>
        {question.descricao.map((answer, index) => (
            <label key={`${question.id}-${index}`}>
                <input type="radio"
                    name={question.id.toString()}
                    value={answer}
                    onChange={() => onAnswer(question.id, answer)} />
                {answer}
            </label>
        ))}
    </div>
);

const MultipleChoice: FC<{ question: Question; onAnswer: (id: number, resposta: string[]) => void }> = ({ question, onAnswer }) => {
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

    const handleCheckboxChange = (answer: string): string[] => {
        const updated = selectedAnswers.includes(answer)
            ? selectedAnswers.filter(a => a !== answer)
            : [...selectedAnswers, answer];
        setSelectedAnswers(updated);
        return updated;
    };

    return (
        <div>
            <label>{question.texto}</label>
            {question.descricao.map((answer, index) => (
                <label key={`${question.id}-${index}`}>
                    <input
                        type="checkbox"
                        value={answer}
                        onChange={() => {
                            const updatedAnswers = handleCheckboxChange(answer);
                            onAnswer(question.id, updatedAnswers);
                        }}
                    />
                    {answer}
                </label>
            ))}
        </div>
    );
};

const LongQuestion: FC<{ question: Question; onAnswer: (id: number, resposta: string) => void }> = ({ question, onAnswer }) => {
    return (
        <div>
            <label>{question.texto}</label>
            <input
                type="text"
                onChange={(e) => onAnswer(question.id, e.target.value)}
            />
        </div>
    );
};

export default function UserRenderForms({ data, formsId, onSubmit }: UserRenderFormsProps) {
    const [respostas, setRespostas] = useState<{ formulario_id: number, pergunta_id: number; respondido_por: number; equipe_id: number; resposta: string | string[]; tipo_resposta: string; }[]>([]);

    const userData = useUserData()

    const handleAnswer = (id: number, resposta: string | string[]) => {
        setRespostas(prev => {
            const existing = prev.find(r => r.pergunta_id === id);
            if (existing) {
                return prev.map(r => r.pergunta_id === id ? { ...r, resposta } : r);
            }
            return [...prev, { formulario_id: formsId, pergunta_id: id, respondido_por: userData.id, equipe_id: userData.equipe_id, resposta, tipo_resposta: "" }];
        });
    };

    const handleSubmit = () => {
        const novasRespostas: Resposta[] = respostas.map(r => ({
            ...r,
            tipo_resposta: data.find(q => q.id === r.pergunta_id)?.tipo as QuestionType || "unknown"
        }));

        onSubmit(novasRespostas);
    };

    return (
        <>
            <form>
                {data.map((question) => {
                    const { tipo } = question;

                    switch (tipo) {
                        case "uniqueChoice":
                            return <UniqueChoice key={question.id} question={question} onAnswer={handleAnswer} />;
                        case "multipleChoice":
                            return <MultipleChoice key={question.id} question={question} onAnswer={handleAnswer} />;
                        case "longQuestion":
                            return <LongQuestion key={question.id} question={question} onAnswer={handleAnswer} />;
                        default:
                            return <div key={question.id}><h3>Type of question undefined</h3></div>;
                    }
                })}
                <button type="button" onClick={handleSubmit}>Enviar Respostas</button>
            </form>
        </>
    );
}