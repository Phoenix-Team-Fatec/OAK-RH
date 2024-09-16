import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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



export const login = async(req: Request, res: Response) => {
  const {email,senha} = req.body;

  try{
    const user = await User.findOne({where:{email}})

    if(!user || !(await bcrypt.compare(senha, user.senha))){
      return res.status(401).json({message:"Email ou senha inválidos"})
    }


    const token = jwt.sign(
      {
        id: user.id, is_admin: user.is_admin
      },
      process.env.JWT_SECRET ,
      {
        expiresIn: "1d"
      }
    )

    res.json({ token })

  }catch(error){
    res.status(500).json({message:"Erro ao fazer o login"})
  }
}


//outros métodos CRUD(listar, deletar, atualizar) 

