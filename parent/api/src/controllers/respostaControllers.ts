import { updateAnswerStatus } from "../services/formulario_equipeServices";
import { createAnswerService, findAnswerByIdService, findAnswerByQuestionsAndUserIdService, findAnswerByQuestionsIdService, findAnswerByUserService, getAnswersByFormIdAndEquipeIdService } from "../services/respostasService";
import { Request, Response } from "express";

interface Resposta {
    formulario_id: number;
    pergunta_id: number;
    respondido_por: number;
    equipe_id: number;
    resposta: string | string[];
    tipo_resposta: string;
}

export const createAnswer = async (req: Request, res: Response) => {
    try {
        const answers = req.body;

        const { userId } = req.params

        const createdAnswers: Resposta[] = [];

        await Promise.all(answers.map(async (answer) => {

            const { formulario_id, pergunta_id, respondido_por, equipe_id, resposta, tipo_resposta } = answer;

            const createdAnswer = await createAnswerService(formulario_id, pergunta_id, respondido_por, equipe_id, resposta, tipo_resposta, Number(userId));
            
            updateAnswerStatus(formulario_id, Number(userId))

            const updateUserForms = await 
            createdAnswers.push(createdAnswer);
        }));

        return res.status(201).json(createdAnswers);
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

export const findAnswerByQuestionsAndUserId = async (req: Request, res: Response) => {
    try {
        const { questionId, userId } = req.params;

        const answer = await findAnswerByQuestionsAndUserIdService(Number(questionId), Number(userId));
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

export const getAnswersByFormIdAndEquipeIdController = async (req: Request, res: Response) => {
    try {
        const { formId, equipeId } = req.params;

        const answer = await getAnswersByFormIdAndEquipeIdService(Number(formId), Number(equipeId));
        return res.status(200).json(answer)
    } catch (error) {
        console.log("Error finding anser by user id", error)
        return res.status(400).json({ message: "Error finding anser by user id" })
    }
}