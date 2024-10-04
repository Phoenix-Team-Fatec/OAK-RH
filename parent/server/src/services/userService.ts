import User from "../models/userModels"


import jwt from 'jsonwebtoken';



// Função de login
export const loginService = async (email: string, senha: string) => {
    try {
        const user = await User.findOne({ where: { email } });
        if(!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await user.validatePassword(senha);
        console.log("Validação da senha", isPasswordValid);
        
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d'}
        );

        return { token };
    }catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};
