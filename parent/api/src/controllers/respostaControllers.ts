import { createAnswerService, findAnswerByIdService, findAnswerByQuestionsIdService, findAnswerByUserService } from "../services/respostasService";
import { Request, Response } from "express";

export const createAnswer = async (req: Request, res: Response) => {
    try {
        const { pergunta_id, respondido_por, equipe_id, resposta, tipo_resposta } = req.body;

        const answer = await createAnswerService(pergunta_id, respondido_por, equipe_id, resposta, tipo_resposta);
        return res.status(201).json(answer);
    } catch (error) {
        console.log("Error when creating answer", error)
        return res.status(400).json({ message: "Error when creating answer" })
    }
}

export const findAnswerById = async (req: Request, res: Response) => {
    try {
        const { answerId } = req.params;

        const answer = await findAnswerByIdService(Number(answerId));
        return res.status(200).json(answer)
    } catch (error) {
        console.log("Error finding one answer by id", error)
        return res.status(400).json({ message: "Error finding one answer by id" })
    }
}

export const findAnswerByQuestionsId = async (req: Request, res: Response) => {
    try {
        const { questionId } = req.params;

        const answer = await findAnswerByQuestionsIdService(Number(questionId));
        return res.status(200).json(answer)
    } catch (error) {
        console.log("Error finding answers by question id", error)
        return res.status(400).json({ message: "Error finding answers by question id" })
    }
}

export const findAnswerByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const answer = await findAnswerByUserService(Number(userId));
        return res.status(200).json(answer)
    } catch (error) {
        console.log("Error finding anser by user id", error)
        return res.status(400).json({ message: "Error finding anser by user id" })
    }
}