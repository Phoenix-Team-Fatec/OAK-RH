import { Pool } from "pg";  // Pool é usada para gerenciar um pool de conexões com banco de dados
import dotenv from "dotenv";

// Carrega as variáveis de ambiente
dotenv.config({ path: "server/src/config/.env" });

export default class ConnectionDB {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'oak',
            password: '1234',
            port: 5432,
        });
        
        this.connect();
    }

    // Método privado para conectar com o banco de dados
    private async connect(): Promise<void> {
        try {
            const client = await this.pool.connect();
            console.log("Conectado com sucesso");
            client.release(); // Libera o cliente de volta para o pool
        } catch (err) {
            console.error("Erro ao conectar ao banco de dados:", err);
        }
    }

    // Método público para executar consultas ao banco de dados
    public async query(queryText: string, params: (string | boolean)[]): Promise<any> {
        try {
            const result = await this.pool.query(queryText, params);
            return result;
        } catch (err) {
            console.error("Erro ao executar a query:", err);
            throw err;
        }
    }
}
