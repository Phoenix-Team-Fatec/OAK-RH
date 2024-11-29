import Resposta from "../models/respostasModels"

type RespostaAgrupada = {
  pergunta_id: number;
  respostas: {
    respondido_por: number;
    resposta: string | string[];
  }[];
  contagem_respostas: Record<string, number>;
}




export const createAnswerService = async (
    formulario_id: number,
    pergunta_id: number,
    respondido_por: number,
    equipe_id: number,
    resposta: string | string[],
    tipo_resposta: string,
    answered_for: number,
) => {
    try {
        const answer = await Resposta.create({
            formulario_id,
            pergunta_id,
            respondido_por,
            equipe_id,
            resposta,
            tipo_resposta,
            answered_for
        })

        return answer
    } catch (error) {
        console.log("Error when creating answer", error)
        throw new Error("Error when creating answer")
    }
}


export const findAnswerByIdService = async (answerId: number) => {
    try {
        const answer = await Resposta.findOne({ where: { id: answerId } })

        return answer
    } catch (error) {
        console.log("Error finding one answer by id", error)
    }
}

export const findAnswerByQuestionsIdService = async (questionId: number) => {
    try {
        const answer = await Resposta.findAll({ where: { formulario_id: questionId } })

        return answer
    } catch (error) {
        console.log("Error finding answers by question id", error)
    }
}

export const findAnswerByQuestionsAndUserIdService = async (questionId: number, userId: number) => {
    try {
        const answer = await Resposta.findAll({ where: { formulario_id: questionId, respondido_por: userId } })

        return answer
    } catch (error) {
        console.log("Error finding answers by question id", error)
    }
}

export const findAnswerByUserService = async (userId: number) => {
    try {
        const answer = await Resposta.findAll({ where: { respondido_por: userId } })

        return answer
    } catch (error) {
        console.log("Error finding anser by user id", error)
    }
}

export async function getListOfUserAlredyAnsweredService(formsId: number, userId: number) {
    try {
        const userIdsToAnswer = await Resposta.findAll({
            where: { formulario_id: formsId, respondido_por: userId }
        });

        if (!userIdsToAnswer || userIdsToAnswer.length === 0) {
            return { message: "No users to answer" };
        }

        const answeredForArray = userIdsToAnswer.map((user) => user.dataValues.answered_for);

        return answeredForArray;
    } catch (error) {
        console.error("Error trying to get the user to answer service ", error)
        throw error;
    }
}



//função para pegar todas as respostas de um formulário, com base na equipe
export async function getAnswersByFormIdAndEquipeIdService(formId: number, equipeId: number) {
    try {
        const answers = await Resposta.findAll({
            where: { formulario_id: formId, equipe_id: equipeId }
        });

        if (!answers || answers.length === 0) {
            return { message: "No answers" };
        }


       
        const respostasAgrupadas: RespostaAgrupada[] = Object.values(
            answers.reduce((acc, curr) => {

                if(!acc[curr.pergunta_id]){
                    acc[curr.pergunta_id] = {
                        pergunta_id: curr.pergunta_id,
                        respostas: [],
                        contagem_respostas: {}

                    }
                }
                acc[curr.pergunta_id].respostas.push({
                    respondido_por: curr.respondido_por,
                    resposta: curr.resposta
                });

                //Atualiza a contagem de respostas
                const respostaAtual = curr.resposta;
                if (Array.isArray(respostaAtual)){
                    //Caso a resposta seja múltipla, conta cada uma separadamente
                    respostaAtual.forEach((res) => {
                        acc[curr.pergunta_id].contagem_respostas[res] =
                        (acc[curr.pergunta_id].contagem_respostas[res] || 0) + 1;
                    })
                }else{
                    //Caso seja única, incremente a contagem diretamente
                    acc[curr.pergunta_id].contagem_respostas[respostaAtual] =
                    (acc[curr.pergunta_id].contagem_respostas[respostaAtual] || 0) + 1;
                }

                return acc

            }, {} as Record<number, RespostaAgrupada>) 
        )

        return respostasAgrupadas;
    } catch (error) {
        console.error("Error trying to get the answers by form id and equipe id service ", error)
        throw error;
    }
}




