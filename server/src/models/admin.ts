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
    public async cadastrarUsuario(nome: string, email: string, senha: string, is_admin: boolean): Promise<void>{
        const db = new ConnectionDB();

        try{
            // Inserindo usuário no banco de dados
            await db.query(
                "INSERT INTO users (nome, email, senha, is_admin) VALUES ($1, $2, $3, $4)",
                [nome, email, senha, is_admin]
            );
            console.log("Uusuário cadastrado com sucesso!");
        }catch(err){
            console.error("Erro ao cadastrar usuário:", err);
        }
    }

    // Método para deletar usuário
    public async deletarUsuario(id: number): Promise<void>{
        const db = new ConnectionDB();
        
        try {
            await db.query("DELETE FROM users WHERE id = $1", [id]);
            console.log(`Usuário com ID ${id} deletado com sucesso!`);
        }catch (err) {
            console.error("Erro ao deletar usuário: ", err)
        }
    }

    // Método para listar usuários
    public async listarUsuario(): Promise<void> {
        const db = new ConnectionDB();
    
        try {
            // Consultando todos os usuários no banco de dados
            const result = await db.query("SELECT * FROM users", []);
    
            if (result.rows.length > 0) {
                console.log("Lista de usuários:");
                result.rows.forEach((row: any) => {
                    console.log(`ID: ${row.id}, Nome: ${row.nome}, Email: ${row.email}, Senha: ${row.senha} Admin: ${row.is_admin}`);
                });
            } else {
                console.log("Nenhum usuário encontrado.");
            }
        } catch (err) {
            console.error("Erro ao listar usuários:", err);
        }
    }
    
}