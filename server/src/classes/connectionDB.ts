import { Pool } from "pg";
import dotenv from "dotenv"


dotenv.config({path:"server/src/config/.env"});


export default class ConnectionDB {
    query(arg0: string, arg1: (string | boolean)[]) {
        throw new Error("Method not implemented.");
    }

    private pool: Pool

    constructor() {
        this.pool = new Pool({

            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: String(process.env.DB_PASSWORD),
            port: Number(process.env.DB_PORT),


        })

        this.connect()
 }



    private async connect(){
        try{
            const client = await this.pool.connect()
            console.log("Conectado com sucesso")


        }catch(err){
            console.error(err)
        }
    }






}