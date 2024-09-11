import User from "./user";

export default class Lider extends User{

    
    constructor(name: string, email: string, password: string){
        super(name, email, password)
    }

    login(): void {
        throw new Error("Method not implemented.");
    }
    logout(): void {
        throw new Error("Method not implemented.");
    }

}