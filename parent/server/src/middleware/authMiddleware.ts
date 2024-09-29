import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  id: number;
  is_admin: boolean;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  
  // Verifique se o cabeçalho existe e está no formato esperado
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).send('A token is required for authentication');
  }

  const token = authHeader.split(' ')[1]; // Extrai o token da string 'Bearer <token>'
  console.log('Token:', token); // Log do token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as JwtPayload;
    console.log(req.user); // Log do payload decodificado
    next();
  } catch (err) {
    console.error('JWT Error:', err); // Log do erro
    return res.status(401).send('Invalid Token');
  }
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.is_admin) {
    return res.status(401).json({ message: "Acesso restrito a administradores" });
  }
  next();
};
