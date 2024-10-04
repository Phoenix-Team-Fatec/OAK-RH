import Admin from "../models/adminModels";
import User from "../models/userModels";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';






// Função de criar admin
export const createAdminService = async (nome: string, email: string, senha: string, empresa: string, cnpj ) => {
    try {
        const hashedPassword = await bcrypt.hash(senha, 10);
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




//função de criar, listar, atualizar e deletar usuário


// Função de criar usuário
export const createUserService = async (nome: string, email: string, senha: string, id_admin: number) => {
    try {
        const hashedPassword = await bcrypt.hash(senha, 10);
        const newUser = await User.create({
            nome,
            email,
            senha: hashedPassword,
            id_admin,
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

// Função de listar todos os usuários de um admin
export const listUserService = async (id_admin: number) => {
    try {
        const users = await User.findAll({ where: { id_admin } });
        return users;
    }catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};


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
