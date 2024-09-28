import Equipe_user from "../models/equipe_userModel";
import User from "../models/userModels";
import Equipe from "../models/equipeModels";

// Função para associar um usuário a uma equipe
  export const setUsarioEquipe = async (
    userId: number,
    equipeId: number,
    isLider: boolean
  ) => {
    try {
      const newAssociation = await Equipe_user.create({
        user_id: userId,
        equipe_id: equipeId,
        is_lider: isLider,
      });

      return newAssociation;
    } catch (error) {
      console.log("Error in setUsuarioEquipe function:", error);
      throw new Error("Erro ao associar usuário à equipe");
    }
  };

// Função para listar equipes com seus respectivos usuários
export const listarEquipe_User = async () => {
  try {
    const teamsWithUsers = await Equipe.findAll({
      attributes: ['id','nome'], // Inclua apenas o ID da equipe
      include: [
        {
          model: Equipe_user,
          as: 'users',
          attributes: [ 'is_lider'], // Apenas ID do usuário e status de liderança
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id','nome','email'], // Inclua apenas o ID do usuário
            },
          ],
        },
      ],
      logging: console.log,
    });

    return teamsWithUsers;
  } catch (error) {
    console.log("Error in listEquipeUser function:", error);
    throw new Error("Erro ao listar equipes com usuários");
  }
};



//função para mostrar uma equipe com seus usuários
export const getEquipe_user = async(equipeId: number) =>{
  try{
    const equipeUser = await Equipe.findOne({
      where:{
        id: equipeId
      },
      attributes: ['id','nome'],
      include: [
        {
          model: Equipe_user,
          as: 'users',
          attributes: ['is_lider'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id','nome','email']
            }
          ]
        }
      ]
    });

    return equipeUser;

  }catch(error){
    console.log("Error in getEquipe_user function:", error);
    throw new Error("Erro ao mostrar uma equipe com seus usuários");
  }
}






//mudar estatos de líder de uma equipe
export const mudarEstatosLider = async(userId: number, equipeId: number, isLider: boolean) =>{
       
  try{

    //encontra a associação entre o usuário e a equipe
    const equipeUser = await Equipe_user.findOne({
      where:{
        user_id: userId,
        equipe_id: equipeId
      }
    });

    if (!equipeUser){
      throw new Error("Associação entre usuário e equipe não encontrada");
    }

    //Atualiza o campo is_lider
    equipeUser.is_lider = isLider;
    await equipeUser.save();


    return equipeUser;



  }catch(error){
    console.log("Error in mudarEstatosLider function:", error);
    throw new Error("Erro ao mudar estatos de líder de uma equipe");
  }
} 





//deletar usuário de uma equipe
export const deletarUsuarioEquipe = async(userId: number, equipeId: number) =>{
  try{
    const equipeUser = await Equipe_user.findOne({
      where:{
        user_id: userId,
        equipe_id: equipeId
      }
    });

    if (!equipeUser){
      throw new Error("Associação entre usuário e equipe não encontrada");
    }

    await equipeUser.destroy();

    return equipeUser;

  }catch(error){
    console.log("Error in deletarUsuarioEquipe function:", error);
    throw new Error("Erro ao deletar usuário de uma equipe");
  }
}
