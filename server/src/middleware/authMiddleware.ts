import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


interface JwtPayload{
    id: number;
    is_admin: boolean;
    is_lider: boolean;
}

export const verifyToken = (req:Request, res:Response, next:NextFunction) => {

      const token = req.headers.authorization?.split(" ")[1];

      if (!token){
        return res.status(401).json({message:"Acesso negado"});
      }


      try{
        const decoded = jwt.verify(token, process.env.JW_SECRET) as JwtPayload;
        req.user = decoded;
        next();

      }catch(error){
            res.status(401).json({message:"Token Inválido"});

      }

}


export const verifyAdmin = (req: Request, res: Response, next: NextFunction) =>{

        if(!req.user?is_admin){
            return res.status(401).json({message:"Acesso restrito a administradores"});
        }

        next();

}




export const verifyLider = (req: Request, res: Response, next: NextFunction) =>{
    if(!req.user?is_lider && !req.user?is_admin){
        return res.status(401).json({message:"Acesso restrito a líderes e administradores"});
    }
    next();
}



