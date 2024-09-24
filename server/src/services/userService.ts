import User from "../models/userModels"
import bcrypt from 'bcrypt';
import e from "express";
import jwt from 'jsonwebtoken';

// Função de criar usuário
export const createUserService = async (nome: string, email: string, senha: string, is_admin: boolean) => {
    try {
        const hashedPassword = await bcrypt.hash(senha, 10);
        const newUser = await User.create({
            nome,
            email,
            senha: hashedPassword,
            is_admin,
        });
        return newUser;
    }catch(error) {
        throw new Error("Error creating user");
    }
};

// Função de listar usuário
export const readUserService = async (id: number) => {
    try {
        const user = await User.findByPk(id, {
            attributes: ['nome', 'email']
        });

        if(!user) {
            throw new Error("User not found");
        }
        return user
    }catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};

// Função de listar todos os usuários
export const readAllUsersService = async () => {
    try {
        const users = await User.findAll(); // Função ORM para buscar todos os usuários
        return users;
    }catch (error) {
        throw new Error("Error fetching users");
    }
};


// Funão de atualizar
export const updateUserService = async (id: number, nome?: string, email?: string, senha?: string) => {
    try {
        const user = await User.findByPk(id);
        if(!user) {
            throw new Error("User not found");
        }

        // Atualiza somente os campos fornecidos
        if (nome) user.nome = nome;
        if (email) user.email = email;
        if (senha) user.senha = await bcrypt.hash(senha, 10);

        await user.save();

        return { message: "User updated successfully", user} ;   
    }catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
}

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
};

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
            { id: user.id, email: user.email, is_admin: user.is_admin },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h'}
        );

        return { token, is_admin: user.is_admin };
    }catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};