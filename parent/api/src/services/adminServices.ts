import Admin from "../models/adminModels";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Função de criar admin
export const createAdminService = async (nome: string, email: string, empresa: string, cnpj: string ) => {
    try {
       
       
        const newAdmin = await Admin.create({
            nome,
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
export const loginService = async (email: string) => {
    try {
        const user = await Admin.findOne({ where: { email } });
        if(!user) {
            throw new Error("User not found");
        }

        return { user };
    }catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};
