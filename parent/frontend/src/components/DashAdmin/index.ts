import axios from 'axios';





export async function getFormsUserAdmin(id_admin: number) {
    try{
        const response = await axios.get(`http://localhost:3000/formulario/usuarios/${id_admin}`)
        const data = response.data.flatMap((item: any) => 
            item.users.map((userItem: any, index:number) => ({
                id: `${item.id}-${index}`,
                user_nome: item.nome,
                equipe_nome: userItem.form.formularios[0].equipes.nome,
                status: userItem.status,
                formulario: userItem.form.nome
            }))
        );

        return data;
    }catch(error){
        console.log("Erro ao listar todos os formulário", error)
        return []
    }

}