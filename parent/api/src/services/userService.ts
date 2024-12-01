import User from "../models/userModels"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Sequelize } from "sequelize";



// Função de login
export const loginService = async (email: string) => {
    try {
        const user = await User.findOne({ where: { email } });
        if(!user) {
            throw new Error("User not found");
        }

        return user;
    }catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};

// Função de criar usuário
export const createUserService = async (nome: string, email: string, id_admin: number) => {
    try {
        console.log(nome, email, id_admin);
        const newUser = await User.create({
            nome,
            email,
            id_admin,
        });
        return newUser;
    }catch(error) {
        console.log("Error creating user",error);
    }
};

// Função de listar usuário
export const readUserService = async (id: number) => {
    try {
        const user = await User.findByPk(id, {
            attributes: ['nome', 'email','id_admin', ]
        });

        if(!user) {
            throw new Error("User not found");
        }
        return user
    }catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};

export const getUserDataService = async (id: number) => {
    try {
        const user = await User.findOne({ where: {id}});

        if(!user) {
            throw new Error("User not found");
        }
        return user
    }catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};

// Função de listar todos os usuários de um admin
export const listUserService = async (id_admin: number) => {
    try {
        const users = await User.findAll({ where: { id_admin } });
        return users;
    }catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};

export const listarUserPorMes = async (id_admin: number) => {
    try {
        const usuariosPorMes = await User.findAll({
            where: { id_admin },
            attributes: [
                [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('criado_em')), 'mes'],
                [Sequelize.fn('COUNT', '*'), 'quantidade']
            ],
            group: ['mes'],
            order: [['mes', 'ASC']]
        });

        return usuariosPorMes.map((e: any) => {
            const mes = e.get('mes');
            const quantidade = e.get('quantidade');
            // Verifica se 'mes' não é null antes de converter para o nome do mês
            if (mes) {
                const nomeMes = new Date(mes).toLocaleString('pt-BR', { month: 'long' });
                return {
                    name: nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1), // Capitaliza a primeira letra
                    value: quantidade
                };
            }
            return null;
        }).filter((item: any) => item !== null); // Filtra itens nulos

    } catch (error) {
        console.log("Erro ao listar usuarios por mês", error);
        throw error;
    }
}

//Pegar o id do usuário pelo email
export const getIdUserService = async (email: string) => {
    try{
        const users = await User.findOne({where: {email}});  
        if(!users){
            throw new Error("User not found");
        }
        return users;  

    }catch(error){
        throw new Error("Error  user");
    }
}
       
// Funão de atualizar
export const updateUserService = async (id: number, nome?: string, email?: string) => {
    try {
        const user = await User.findByPk(id);
        if(!user) {
            throw new Error("User not found");
        }

        // Atualiza somente os campos fornecidos
        if (nome) {user.nome = nome;}
        if (email) {user.email = email;}

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
