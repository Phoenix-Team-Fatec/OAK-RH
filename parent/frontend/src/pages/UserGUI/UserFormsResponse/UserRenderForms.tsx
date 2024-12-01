import { FC, useEffect } from "react";
import useUserData from "../../../hooks/useUserData";

interface UserRenderFormsProps {
    data: Question[];
    formsId: number;
    equipe_id: number;
    onSubmit: (respostas: Resposta[]) => void;
    userId: number;
    existingResponses: Resposta[];
    setRespostasAtuais: React.Dispatch<React.SetStateAction<Resposta[]>>;
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

const UniqueChoice: FC<{ question: Question; index: number; onAnswer: (id: number, resposta: string) => void; value?: string }> = ({ question, index, onAnswer, value }) => (
    <div className="unique-choice-question">
        <label className="unique-choice-question-text">
            {`${index + 1}) ${question.texto}`}
        </label>
        {question.descricao.map((answer, idx) => (
            <label key={`${question.id}-${idx}`} className="unique-choice-answer">
                <input
                    type="radio"
                    name={question.id.toString()}
                    value={answer}
                    checked={value === answer}
                    onChange={() => onAnswer(question.id, answer)}
                    className="unique-choice-input"
                />
                {answer}
            </label>
        ))}
        <hr className="question-separator" />
    </div>
);

const MultipleChoice: FC<{ question: Question; index: number; onAnswer: (id: number, resposta: string[]) => void; value?: string[] }> = ({ question, index, onAnswer, value = [] }) => {
    const handleCheckboxChange = (answer: string): string[] => {
        if (value.includes(answer)) {
            return value.filter(a => a !== answer)
        } else {
            return [...value, answer]
        }
    };

    const handleChange = (answer: string) => {
        const updated = handleCheckboxChange(answer)
        onAnswer(question.id, updated)
    }

    return (
        <div className="multiple-choice-question">
            <label className="multiple-choice-question-text">
                {`${index + 1}) ${question.texto}`}
            </label>
            {question.descricao.map((answer, idx) => (
                <label key={`${question.id}-${idx}`} className="multiple-choice-answer">
                    <input
                        type="checkbox"
                        value={answer}
                        checked={value.includes(answer)}
                        onChange={() => handleChange(answer)}
                        className="multiple-choice-input"
                    />
                    {answer}
                </label>
            ))}
            <hr className="question-separator" />
        </div>
    );
};

const LongQuestion: FC<{ question: Question; index: number; onAnswer: (id: number, resposta: string) => void; value?: string }> = ({ question, index, onAnswer, value = "" }) => {
    return (
        <div className="long-question">
            <label className="long-question-text">
                {`${index + 1}) ${question.texto}`}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onAnswer(question.id, e.target.value)}
                className="long-question-input"
            />
            <hr className="question-separator" />
        </div>
    );
};

const GradeQuestion: FC<{ question: Question; index: number; onAnswer: (id: number, resposta: string) => void; value?: string }> = ({ question, index, onAnswer, value = "" }) => {
    const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = parseInt(e.target.value, 10);
        if (isNaN(inputValue)) {
            inputValue = 0;
        }
        if (inputValue < 0) {
            inputValue = 0;
        } else if (inputValue > 10) {
            inputValue = 10;
        }
        onAnswer(question.id, inputValue.toString());
    };

    return (
        <div className="grade-question">
            <label className="grade-question-text">
                {`${index + 1}) ${question.texto}`}
            </label>
            <input
                type="number"
                min="0"
                max="10"
                value={value}
                onChange={handleGradeChange}
                className="grade-question-input"
            />
            <hr className="question-separator" />
        </div>
    );
};


export default function UserRenderForms({ data, equipe_id, formsId, onSubmit, existingResponses, setRespostasAtuais }: UserRenderFormsProps) {

    const userData = useUserData();

    useEffect(() => {
        // Atualiza as respostasAtuais no pai sempre que existingResponses muda
        setRespostasAtuais(existingResponses);
    }, [existingResponses, setRespostasAtuais]);

    const handleAnswer = (id: number, resposta: string | string[]) => {
        setRespostasAtuais(prev => {
            const existing = prev.find(r => r.pergunta_id === id);
            if (existing) {
                return prev.map(r => r.pergunta_id === id ? { ...r, resposta } : r);
            }
            return [...prev, {
                formulario_id: formsId,
                pergunta_id: id,
                respondido_por: userData.id,
                equipe_id: equipe_id,
                resposta,
                tipo_resposta: ""
            }];
        });
    };

    const handleSubmit = () => {
        const allAnswered = data.every(question => {
            const resposta = existingResponses.find(r => r.pergunta_id === question.id);
            if (!resposta) return false;
            if (typeof resposta.resposta === 'string') {
                return resposta.resposta.trim() !== "";
            }
            return resposta.resposta.length > 0;
        });

        if (!allAnswered) {
            alert('Por favor, responda a todas as perguntas antes de enviar.');
            return;
        }

        const novasRespostas: Resposta[] = existingResponses.map(r => ({
            ...r,
            tipo_resposta: data.find(q => q.id === r.pergunta_id)?.tipo as QuestionType || "unknown"
        }));

        onSubmit(novasRespostas);
    };

    return (
        <>
            <form className="user-render-forms" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                {data.map((question, index) => {
                    const respostaExistente = existingResponses.find(r => r.pergunta_id === question.id)?.resposta;

                    switch (question.tipo) {
                        case "uniqueChoice":
                            return (
                                <UniqueChoice
                                    key={question.id}
                                    question={question}
                                    index={index}
                                    onAnswer={handleAnswer}
                                    value={typeof respostaExistente === 'string' ? respostaExistente : undefined}
                                />
                            );
                        case "multipleChoice":
                            return (
                                <MultipleChoice
                                    key={question.id}
                                    question={question}
                                    index={index}
                                    onAnswer={handleAnswer}
                                    value={Array.isArray(respostaExistente) ? respostaExistente : []}
                                />
                            );
                        case "longQuestion":
                            return (
                                <LongQuestion
                                    key={question.id}
                                    question={question}
                                    index={index}
                                    onAnswer={handleAnswer}
                                    value={typeof respostaExistente === 'string' ? respostaExistente : ""}
                                />
                            );
                        case "grade":
                            return (
                                <GradeQuestion
                                    key={question.id}
                                    question={question}
                                    index={index}
                                    onAnswer={handleAnswer}
                                    value={typeof respostaExistente === 'string' ? respostaExistente : ""}
                                />
                            );
                        default:
                            return (
                                <div key={question.id}>
                                    <h3>Tipo de pergunta indefinido</h3>
                                </div>
                            );
                    }
                })}
                <button type="submit" className="submit-button">Enviar Respostas</button>
            </form>
        </>
    );
}
