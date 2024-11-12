import { FC } from "react";

interface UserViewFormsProps {
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

const UniqueChoiceView: FC<{ question: Question; answer: string; index: number }> = ({ question, answer, index }) => (
    <div className="unique-choice-question-view">
        <label className="unique-choice-question-text">{`${index + 1}) ${question.texto}`}</label>
        {question.descricao.map((option, i) => (
            <div key={`${question.id}-${i}`} className="unique-choice-answer-view">
                <input
                    type="radio"
                    name={question.id.toString()}
                    value={option}
                    checked={answer === option}
                    readOnly
                    className="unique-choice-input-view"
                />
                <span>{option}</span>
            </div>
        ))}
        <hr className="question-separator" />
    </div>
);

const MultipleChoiceView: FC<{ question: Question; answer: string[]; index: number }> = ({ question, answer, index }) => (
    <div className="multiple-choice-question-view">
        <label className="multiple-choice-question-text">{`${index + 1}) ${question.texto}`}</label>
        {question.descricao.map((option, i) => (
            <div key={`${question.id}-${i}`} className="multiple-choice-answer-view">
                <input
                    type="checkbox"
                    value={option}
                    checked={answer.includes(option)}
                    readOnly
                    className="multiple-choice-input-view"
                />
                <span>{option}</span>
            </div>
        ))}
        <hr className="question-separator" />
    </div>
);

const LongQuestionView: FC<{ question: Question; answer: string; index: number }> = ({ question, answer, index }) => (
    <div className="long-question-view">
        <label className="long-question-text">{`${index + 1}) ${question.texto}`}</label>
        <p className="long-answer-view">{answer}</p>
        <hr className="question-separator" />
    </div>
);

export default function UserViewForms({ formsData, answerData }: UserViewFormsProps) {
    return (
        <div className="container-forms-view-user">
            {formsData.map((question, index) => {
                const answer = answerData.find(a => a.pergunta_id === question.id)?.resposta;

                switch (question.tipo) {
                    case "uniqueChoice":
                        return <UniqueChoiceView key={question.id} question={question} answer={answer as string} index={index} />;
                    case "multipleChoice":
                        return <MultipleChoiceView key={question.id} question={question} answer={answer as string[]} index={index} />;
                    case "longQuestion":
                        return <LongQuestionView key={question.id} question={question} answer={answer as string} index={index} />;
                    default:
                        return <div key={question.id}><h3>Type of question undefined</h3></div>;
                }
            })}
        </div>
    );
}
