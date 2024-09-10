import ConnectionDB from "./connectionDB";
import User from "./user";

export default class Admin extends User{
    public is_admin: boolean;
    constructor(name: string, email: string, password: string, is_admin: boolean){
        super(name, email, password)
        this.is_admin = is_admin
    }

    login(): void{

    }

    logout(): void{

    }

    cadastrarUsuario():void{

        const pool = new ConnectionDB();

        async (nome:string, senha:string, email:string, is_admin:boolean) =>{
         try{
            const result = await pool.query("INSERT INTO users (nome, senha, email, is_admin) VALUES ($1, $2, $3, $4)", [nome, senha, email, is_admin]);


         }catch(err){
            console.error(err)

         }
           
        }
        

        

    }

    classificarUsuario(): void{

    }

}