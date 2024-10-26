import { FC } from "react";

interface UserRenderFormsProps {
    formsData: Question[];
    answerData: Resposta[];
}

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

const UniqueChoice: FC<{ question: Question; answer: string }> = ({ question, answer }) => (
    <div>
        <label>{question.texto}</label>
        {question.descricao.map((option, index) => (
            <div key={`${question.id}-${index}`}>
                <input
                    type="radio"
                    name={question.id.toString()}
                    value={option}
                    checked={answer === option}
                    readOnly
                />
                <span>{option}</span>
            </div>
        ))}
    </div>
);

const MultipleChoice: FC<{ question: Question; answer: string[] }> = ({ question, answer }) => (
    <div>
        <label>{question.texto}</label>
        {question.descricao.map((option, index) => (
            <div key={`${question.id}-${index}`}>
                <input
                    type="checkbox"
                    value={option}
                    checked={answer.includes(option)}
                    readOnly
                />
                <span>{option}</span>
            </div>
        ))}
    </div>
)

const LongQuestion: FC<{ question: Question; answer: string }> = ({ question, answer }) => (
    <div>
        <label>{question.texto}</label>
        <p id={`long-${question.id}`}>{answer}</p>
    </div>
);

export default function UserRenderForms({ formsData, answerData }: UserRenderFormsProps) {
    return (
        <form>
            {formsData.map((question) => {
                const answer = answerData.find(a => a.pergunta_id === question.id)?.resposta;

                switch (question.tipo) {
                    case "uniqueChoice":
                        return <UniqueChoice key={question.id} question={question} answer={answer as string} />;
                    case "multipleChoice":
                        return <MultipleChoice key={question.id} question={question} answer={answer as string[]} />;
                    case "longQuestion":
                        return <LongQuestion key={question.id} question={question} answer={answer as string} />;
                    default:
                        return <div key={question.id}><h3>Type of question undefined</h3></div>;
                }
            })}
        </form>
    );
}