import axios from "axios";

//função para ler os dados de um usuário
export const readUserService = async (id: number) => {
  try {
    const user = await axios.get(`http://localhost:3000/user/listar_um/${id}`);
    return user.data;
  } catch (error) {
    console.log("Error in readUserService function:", error);
    return { message: error};
  }
};