export default abstract class User{

    private name: string;
    private email: string;
    private password: string;
    
    constructor(name: string, email: string, password: string){
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public get getName(){
        return this.name;
    }

    public set setName(name: string){
        this.name = name;
    }
    
    public get getEmail(){
        return this.email;
    }

    public set setEmail(email: string){
        this.email = email;
    }

    public get getPassword(){
        return this.password;
    }

    public set setPasswrod(password: string){
        this.password = password;
    }

    abstract login(): void;
    abstract logout(): void;
    
}