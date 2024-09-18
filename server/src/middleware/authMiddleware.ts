import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


interface JwtPayload{
    id: number;
    is_admin: boolean;
    
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'].split(' ')[1]; // Get the token from the header
  console.log('Token:', token); // Log the token

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as JwtPayload;
    console.log(req.user)
    next();
  } catch (err) {
    console.error('JWT Error:', err); // Log the error
    return res.status(401).send('Invalid Token');
  }
};



export const verifyAdmin = (req: Request, res: Response, next: NextFunction) =>{

        if(!req.user?.is_admin ){
            return res.status(401).json({message:"Acesso restrito a administradores"});
        }

        next();

}




/*export const verifyLider = (req: Request, res: Response, next: NextFunction) =>{
    if(!req.user?.is_lider && !req.user?.is_admin){
        return res.status(401).json({message:"Acesso restrito a líderes e administradores"});
    }
    next();
}*/





