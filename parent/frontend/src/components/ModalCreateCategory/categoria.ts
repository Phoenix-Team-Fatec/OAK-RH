import axios from "axios";


//função para cadastrar categorias
export async function createCategory(nome:string, id_admin:number){
    try{
        await axios.post('http://localhost:3000/categorias', {
        nome,
        id_admin
        });
        return true;
    } catch (error) {
        console.error("Erro ao criar categoria", error);
        return false;
    }

}
