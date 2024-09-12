import ConnectionDB from "../config/connectionDB";
import User from "./user";

export default class Admin extends User {
    
    public is_admin: boolean;
    
    constructor(name: string, email: string, password: string, is_admin: boolean){
        super(name, email, password);
        this.is_admin = is_admin;
    }

    login(): void {
        throw new Error("Method not implemented.");
    }
    logout(): void {
        throw new Error("Method not implemented.");
    }

    // Método para cadastrar novo usuário
    public async cadastrarUsuario(nome: string, senha: string, email: string, is_admin: boolean): Promise<void>{
        const db = new ConnectionDB();

        try{
            // Inserindo usuário no banco de dados
            await db.query(
                "INSERT INTO users (nome, senha, email, is_admin) VALUES ($1, $2, $3, $4)",
                [nome, senha, email, is_admin]
            );
            console.log("Uusuário cadastrado com sucesso!");
        }catch(err){
            console.error("Erro ao cadastrar usuário:", err);
        }
    }
}