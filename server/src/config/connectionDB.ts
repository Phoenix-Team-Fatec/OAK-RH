import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: "server/src/config/.env" });

export default class ConnectionDB {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: String(process.env.DB_PASSWORD),
            port: Number(process.env.DB_PORT),
        });

        // Opcional, Pool já gerencia automaticamente
        this.connect();
    }

    // Método que realiza a conexão ao banco, opcional se estiver usando apenas o pool
    private async connect(): Promise<void> {
        try {
            const client = await this.pool.connect();
            console.log("Conectado com sucesso");
            client.release(); // Libera o cliente de volta para o pool
        } catch (err) {
            console.error("Erro ao conectar ao banco de dados:", err);
        }
    }

    // Método para executar consultas ao banco de dados
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
