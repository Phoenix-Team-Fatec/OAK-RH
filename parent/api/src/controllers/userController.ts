import { Request, Response } from "express";
import { loginService, createUserService, listUserService, readUserService, updateUserService, deleteUserService, getIdUserService } from "../services/userService";
import { generateRandomPassword } from "../config/generateRandomPassword";
import { admin, createUserWithEmailAndPassword, deleteUserByEmail, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "../config/firebase.cjs";
import { get } from "http";


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userFind = await loginService(email);
    const userVerify = await signInWithEmailAndPassword(getAuth(), email, password);
    return res.status(200).json(userFind);
  } catch (error) {
    console.log("Error in login function:", error);
    return res.status(500).json({ messsage: error.message });
  }
};

//criar usuário
export const createUser = async (req: Request, res: Response) => {
  const { nome, email, id_admin } = req.body;

  try {
    const randomPassword = generateRandomPassword();
    const newAdmFirebase = await createUserWithEmailAndPassword(getAuth(), email, randomPassword);

    const newUser = await createUserService(nome, email, id_admin);

    const resetPassword = await sendPasswordResetEmail(getAuth(), email);
    return res.status(201).json(newUser);
  } catch (error) {
    console.log("Error in createUser function:", error);
    return res.status(500).json({ message: error.message });
  }
};


//listar informações de um usuário
export const readUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {

    const user = await readUserService(Number(id));
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in readUser function:", error);
    return res.status(500).json({ message: error.message });
  }
};


//listar todas as informações de todos os usuários
export const readAllUsers = async (req: Request, res: Response) => {

  const { id_admin } = req.params;

  try {

    const users = await listUserService(Number(id_admin));
    return res.status(200).json(users);
  } catch (error) {
    console.log("Error in readAllUsers function:", error);
    return res.status(500).json({ message: error.message });
  }
};


//atualizar informações de um usuário
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  try {
    const userId = parseInt(id, 10);
    if(isNaN(userId)) {
      return res.status(400).json({ message: "ID must be a number" })
    }
    const updatedUser = await updateUserService(userId, nome, email);
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updatedUser function:", error);
    return res.status(500).json({ message: error.message });
  }
};


//deletar informações de um usuário
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user_info = await readUserService(Number(id));
    const email = user_info['email'];

    const userRecord = await admin.auth().getUserByEmail(email);
    const user_id = userRecord.uid;
    await admin.auth().deleteUser(user_id);





    const userId = parseInt(id);
    const result = await deleteUserService(userId);
    
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in deleteUser function:", error);
    return res.status(500).json({ message: error.message })
  }
};



//função para pegar o id do usuário pelo email
export const getIdUser = async (req: Request, res: Response) => {

  try {
    const { email } = req.params;
    const user = await getIdUserService(email as string);
    return res.status(200).json(user['id']);
  } catch (error) {
    console.log("Error in getIdUser function:", error);
    return res.status(500).json({ message: error.message });
  }
}
