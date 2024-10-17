import Resposta from "../models/respostasModels"

export const createAnswerService = async (pergunta_id: number, respondido_por: number, equipe_id: number, resposta: string, tipo_resposta: string) => {
    try {
        const answer = await Resposta.create({
            pergunta_id,
            respondido_por,
            equipe_id,
            resposta,
            tipo_resposta
        })

        return answer
    } catch (error) {
        console.log("Error when creating answer", error)
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
        const answer = await Resposta.findAll({ where: { pergunta_id: questionId } })

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