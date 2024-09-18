import { Request, Response } from 'express';
import User from '../models/userModels';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export const createUser = async(req: Request, res: Response) =>{
  
  const {nome,email,senha,is_admin} = req.body;

  try{
    const hashedPassword = await bcrypt.hash(senha,10);
    const newUser = await User.create({

        nome,
        email,
        senha: hashedPassword,
        is_admin


    })

    res.status(201).json(newUser);

  }catch(error){
    res.status(500).json({message:"Erro ao criar usuário"})
  }




}



export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assuming you have a method to validate the password
    const isPasswordValid = await user.validatePassword(senha);
 

    const token = jwt.sign({ id: user.id, email: user.email, is_admin:user.is_admin }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    return res.status(200).json({ token });
  } catch (err) {
    console.error('Error in login function:', err); // Log the error
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

//outros métodos CRUD(listar, deletar, atualizar) 

