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
    categoria?: {
        id: number;
        id_admin: number;
        nome: string;
    };
}

interface Resposta {
    formulario_id: number;
    pergunta_id: number;
    respondido_por: number;
    equipe_id: number;
    resposta: string | string[];
    tipo_resposta: QuestionType;
    answered_for: number;
}

enum QuestionType {
    UniqueChoice = "uniqueChoice",
    MultipleChoice = "multipleChoice",
    LongQuestion = "longQuestion",
    Grade = "grade"
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

const UserViewForms: FC<UserViewFormsProps> = ({ formsData, answerData }) => {
    // Agrupa as respostas por "answered_for"
    const groupedAnswers = answerData.reduce((acc, answer) => {
        const answeredForId = answer.answered_for;

        if (!acc[answeredForId]) {
            acc[answeredForId] = {
                answered_for: answeredForId,
                respostas: []
            };
        }
        acc[answeredForId].respostas.push(answer);

        return acc;
    }, {} as Record<number, { answered_for: number; respostas: Resposta[] }>);

    const GradeQuestionView: FC<{ question: Question; answer: string; index: number }> = ({ question, answer, index }) => {
        return (
            <div className="grade-question-view">
                <label className="grade-question-text">
                    {`${index + 1}) ${question.texto}`}
                </label>
                <input
                    type="number"
                    min="0"
                    max="10"
                    value={answer}
                    readOnly
                    className="grade-question-input-view"
                />
                <hr className="question-separator" />
            </div>
        );
    };


    return (
        <div className="container-forms-view-user">
            {Object.entries(groupedAnswers).map(([answeredForId, group]) => (
                <div key={answeredForId} className="answered-group">
                    <h3>Respostas para o usuário ID: {group.answered_for}</h3>
                    {formsData.map((question, index) => {
                        const answer = group.respostas.find(a => a.pergunta_id === question.id)?.resposta;

                        switch (question.tipo) {
                            case "uniqueChoice":
                                return (
                                    <UniqueChoiceView
                                        key={question.id}
                                        question={question}
                                        answer={answer as string}
                                        index={index}
                                    />
                                );
                            case "multipleChoice":
                                return (
                                    <MultipleChoiceView
                                        key={question.id}
                                        question={question}
                                        answer={answer as string[]}
                                        index={index}
                                    />
                                );
                            case "longQuestion":
                                return (
                                    <LongQuestionView
                                        key={question.id}
                                        question={question}
                                        answer={answer as string}
                                        index={index}
                                    />
                                );
                            case "grade":
                                return (
                                    <GradeQuestionView
                                        key={question.id}
                                        question={question}
                                        index={index}
                                        answer={answer as string}
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
                </div>
            ))}
        </div>
    );
};

export default UserViewForms;
