import axios from 'axios';



//função para listar formulários
export async function getFormularios(admin_id: number) {
  try {
    const response = await axios.get(`http://localhost:3000/formulario/listar/${admin_id}`);
   
    return response.data;
    
  } catch (error) {
    console.error("Erro ao buscar formulários", error);
    return [];
  }
}



//função para deletar formulários
export async function deleteFormulario(formularioId: number) {
  try {
    await axios.delete(`http://localhost:3000/formulario/${formularioId}`);
    return true;
  } catch (error) {
    console.error("Erro ao deletar formulário", error);
    return false;
  }
}