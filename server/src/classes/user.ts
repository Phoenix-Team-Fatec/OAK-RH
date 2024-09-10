export default abstract class User{

    private name: string;
    private email: string;
    private password: string;
    
    constructor(name: string, email: string, password: string){
        this.name = name;
        this.email = email;
        this.password = password;
    }



    abstract login(): void;
    abstract logout(): void;
    
}