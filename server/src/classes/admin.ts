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

    cadastrarUsuario(): void{

    }

    classificarUsuario(): void{

    }

}