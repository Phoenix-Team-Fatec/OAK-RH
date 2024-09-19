import User from "../models/userModels"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Função de criar usuário
export const createUserService = async (nome: string, email: string, senha: string, is_admin: boolean) => {
    try {
        const hashedPassword = await bcrypt.hash(senha, 10);
        console.log(hashedPassword)
        const newUser = await User.create({
            nome,
            email,
            senha: hashedPassword,
            is_admin,
        });
        return newUser;
    }catch(error) {
        throw new Error("Erro ao criar usuário");
    }
};

// Função deletar usuário
export const deleteUserService = async (id: number) => {
    try {
        const user = await User.findByPk(id);
        if(!user) {
            throw new Error("User not found");
        }

        await user.destroy();
        return { message: "User deleted successfully"};
    }catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
;}


// Função de login
export const loginService = async (email: string, senha: string) => {
    try {
        const user = await User.findOne({ where: { email } });
        if(!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await user.validatePassword(senha);
        
        const token = jwt.sign(
            { id: user.id, email: user.email, is_admin: user.is_admin },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h'}
        );

        return token;
    }catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};