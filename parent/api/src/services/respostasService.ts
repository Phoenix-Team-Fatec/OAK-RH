import Resposta from "../models/respostasModels"

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