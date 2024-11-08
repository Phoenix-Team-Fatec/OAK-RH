import axios from "axios";


export async function getFormulariosEquipe(equipe_id:number){
    try{
        const response = await axios.get(`http://localhost:3000/formulario_equipe/listar/${equipe_id}`)
        const data = response.data.map((item) => (
            {
                id: item.id,
                formulario_id: item.formulario_id,
                formulario: item.formularios.nome,


            }
        ))

        return data;

    }catch(error){
        console.log(error)
    }
}




export async function getUserFormularioEquipe(equipe_id:number, formulario_id:number){
    try{
        const response = await axios.get(`http://localhost:3000/formulario_equipe/${formulario_id}/${equipe_id}`)
        const data = response.data.flatMap((item: any) => 
            item.users.map((userItem: any, index:number) => ({
                id: `${item.id}-${index}`,
                user_nome: item.nome,
                status: userItem.status
            }))
        );

        return data
        

    }catch(error){
        console.log(error)
    }
}