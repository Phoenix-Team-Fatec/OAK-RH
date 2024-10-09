import { Request, Response} from 'express';
import { loginService as adminLoginService } from '../services/adminServices';
import { loginService as userLoginService } from '../services/userService';

export const loginController = async (req: Request, res: Response) => {
    const {email, senha} = req.body;

    try {
        // Tenta autenticar como administrador
        const adminResponse = await adminLoginService(email, senha);
        return res.status(200).json({ token: adminResponse.token, role : 'admin'});
    }catch (adminError) {
        console.log("Erro in authentication admin", adminError.message)
    }

    try {
        // Se falhar, tentar autenticar como usuário
        const userResponse = await userLoginService(email, senha);
        return res.status(200).json({ token: userResponse.token, role: 'user'});
    }catch (userError) {
        console.log("Error in authentication user", userError.message)
    }

    return res.status(401).json({ message: 'Invalid email or password' });
}