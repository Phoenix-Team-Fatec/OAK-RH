import Admin from "../models/adminModels";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';






// Função de criar admin
export const createAdminService = async (nome: string, email: string, senha: string, empresa: string, cnpj: string ) => {
    try {
        const hashedPassword = await bcrypt.hash(senha, 10);
        console.log(nome, email, hashedPassword, empresa, cnpj)
        const newAdmin = await Admin.create({
            nome,
            senha: hashedPassword,
            email,
            empresa,
            cnpj
            
        });
        return newAdmin;
    }catch(error) {
        throw new Error("Error creating user");
    }
};



// Função de login
export const loginService = async (email: string, senha: string) => {
    try {
        const user = await Admin.findOne({ where: { email } });
        if(!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await user.validatePassword(senha);
        console.log("Validação da senha", isPasswordValid);
        
        const token = jwt.sign(
            { id: user.id, email: user.email},
            process.env.JWT_SECRET as string,
            { expiresIn: '1d'}
        );

        return { token };
    }catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};
