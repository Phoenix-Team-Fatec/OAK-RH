// UserRenderForms.tsx

import { FC } from "react";
import useUserData from "../../../hooks/useUserData";
import axios from "axios";

interface UserRenderFormsProps {
    data: Question[];
    formsId: number;
    equipe_id: number;
    onSubmit: (respostas: Resposta[]) => void;
    respostas: Resposta[]; // Respostas atuais do usuário
    setRespostas: (respostas: Resposta[]) => void; // Função para atualizar as respostas no pai
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

const UniqueChoice: FC<{
    question: Question;
    index: number;
    onAnswer: (id: number, resposta: string) => void;
    respostas: Resposta[];
}> = ({ question, index, onAnswer, respostas }) => {
    // Encontrar a resposta existente, se houver
    const selected = respostas.find(r => r.pergunta_id === question.id)?.resposta as string || "";

    return (
        <div className="unique-choice-question">
            <label className="unique-choice-question-text">
                {`${index + 1} ) ${question.texto}`}
            </label>
            {question.descricao.map((answer, idx) => (
                <label key={`${question.id}-${idx}`} className="unique-choice-answer">
                    <input
                        type="radio"
                        name={question.id.toString()}
                        value={answer}
                        checked={selected === answer}
                        onChange={() => onAnswer(question.id, answer)}
                        className="unique-choice-input"
                    />
                    {answer}
                </label>
            ))}
            <hr className="question-separator" />
        </div>
    );
};

const MultipleChoice: FC<{
    question: Question;
    index: number;
    onAnswer: (id: number, resposta: string[]) => void;
    respostas: Resposta[];
}> = ({ question, index, onAnswer, respostas }) => {
    // Encontrar a resposta existente, se houver
    const existingResposta = respostas.find(r => r.pergunta_id === question.id)?.resposta as string[] || [];

    const handleCheckboxChange = (answer: string): void => {
        let updated: string[];
        if (existingResposta.includes(answer)) {
            updated = existingResposta.filter(a => a !== answer);
        } else {
            updated = [...existingResposta, answer];
        }
        onAnswer(question.id, updated);
    };

    return (
        <div className="multiple-choice-question">
            <label className="multiple-choice-question-text">
                {`${index + 1} ) ${question.texto}`}
            </label>
            {question.descricao.map((answer, idx) => (
                <label key={`${question.id}-${idx}`} className="multiple-choice-answer">
                    <input
                        type="checkbox"
                        value={answer}
                        checked={existingResposta.includes(answer)}
                        onChange={() => handleCheckboxChange(answer)}
                        className="multiple-choice-input"
                    />
                    {answer}
                </label>
            ))}
            <hr className="question-separator" />
        </div>
    );
};

const LongQuestion: FC<{
    question: Question;
    index: number;
    onAnswer: (id: number, resposta: string) => void;
    respostas: Resposta[];
}> = ({ question, index, onAnswer, respostas }) => {
    // Encontrar a resposta existente, se houver
    const existingResposta = respostas.find(r => r.pergunta_id === question.id)?.resposta as string || "";

    return (
        <div className="long-question">
            <label className="long-question-text">
                {`${index + 1} ) ${question.texto}`}
            </label>
            <input
                type="text"
                value={existingResposta}
                onChange={(e) => onAnswer(question.id, e.target.value)}
                className="long-question-input"
            />
            <hr className="question-separator" />
        </div>
    );
};

export default function UserRenderForms({ data, equipe_id, formsId, onSubmit, respostas, setRespostas }: UserRenderFormsProps) {

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
        if (typeof resposta === 'string') {
            // Resposta de escolha única ou pergunta longa
            const updatedRespostas = respostas.some(r => r.pergunta_id === id)
                ? respostas.map(r => r.pergunta_id === id ? { ...r, resposta } : r)
                : [...respostas, { formulario_id: formsId, pergunta_id: id, respondido_por: userData.id, equipe_id: equipe_id, resposta, tipo_resposta: "" }];
            setRespostas(updatedRespostas);
        } else if (Array.isArray(resposta)) {
            // Resposta de múltipla escolha
            const updatedRespostas = respostas.some(r => r.pergunta_id === id)
                ? respostas.map(r => r.pergunta_id === id ? { ...r, resposta } : r)
                : [...respostas, { formulario_id: formsId, pergunta_id: id, respondido_por: userData.id, equipe_id: equipe_id, resposta, tipo_resposta: "" }];
            setRespostas(updatedRespostas);
        }
    };

    const handleSubmitLocal = () => {
        const allAnswered = data.every(question => {
            const resposta = respostas.find(r => r.pergunta_id === question.id)?.resposta
            if (question.tipo === QuestionType.MultipleChoice) {
                return Array.isArray(resposta) && resposta.length > 0
            }
            return resposta && resposta !== ""
        });

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
                        case QuestionType.UniqueChoice:
                            return (
                                <UniqueChoice
                                    key={question.id}
                                    question={question}
                                    index={index}
                                    onAnswer={handleAnswer}
                                    respostas={respostas}
                                />
                            );
                        case QuestionType.MultipleChoice:
                            return (
                                <MultipleChoice
                                    key={question.id}
                                    question={question}
                                    index={index}
                                    onAnswer={handleAnswer}
                                    respostas={respostas}
                                />
                            );
                        case QuestionType.LongQuestion:
                            return (
                                <LongQuestion
                                    key={question.id}
                                    question={question}
                                    index={index}
                                    onAnswer={handleAnswer}
                                    respostas={respostas}
                                />
                            );
                        default:
                            return <div key={question.id}><h3>Tipo de pergunta indefinido</h3></div>;
                    }
                })}
                <button type="button" onClick={handleSubmitLocal} className="submit-button">Enviar Respostas</button>
            </form>
        </>
    );
}
