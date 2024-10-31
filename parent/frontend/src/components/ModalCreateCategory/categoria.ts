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

// função para buscar categorias
export async function fetchCategories(id_admin: number) {
    try {
        const response = await axios.get(`http://localhost:3000/categorias/${id_admin}`)
        return response.data
    }catch (error) {
        console.error('Erro ao listar categorias', error)
        return []
    }
}

// função para deletar categoria
export async function deleteCategorie(id: number) {
    try {
        await axios.delete(`http://localhost:3000/categorias/${id}`)
        return true
    }catch (error) {
        console.error('Erro ao deletar categoria', error)
        return false
    }
}

// função para atualizar categoria
export async function editCategorie(id: number, nome: string) {
    try {
        await axios.put(`http://localhost:3000/categorias/${id}`, {
            nome
        })
        return true
    }catch (error) {
        console.error("Erro ao editar categoria", error)
        return false
    }
}

