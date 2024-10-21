import Equipe_user from "../models/equipe_userModel";
import User from "../models/userModels";
import Equipe from "../models/equipeModels";

// Função para associar um usuário a uma equipe
// Função para associar um usuário a uma equipe
export const setUsarioEquipe = async (
  userId: number,
  equipeId: number,
  isLider: boolean
) => {
  try {
    // Log dos dados antes de salvar
    console.log("Dados antes de salvar:", { userId, equipeId, isLider });

    // Verificação para garantir que os valores não sejam nulos ou indefinidos
    if (userId == null || equipeId == null || isLider == null) {
      throw new Error("Os valores userId, equipeId e isLider não podem ser nulos.");
    }

    // Verificar se a associação já existe
    const existingAssociation = await Equipe_user.findOne({
      where: {
        user_id: userId,
        equipe_id: equipeId,
      },
    });

    if (existingAssociation) {
      console.warn("A associação já existe:", existingAssociation);
      return existingAssociation; // Retorna a associação existente
    }

    // Criação da nova associação
    const newAssociation = await Equipe_user.create({
      user_id: userId,
      equipe_id: equipeId,
      is_lider: isLider,
    });

    return newAssociation;
  } catch (error) {
    console.log("Error in setUsarioEquipe function:", error);
    throw new Error("Erro ao associar usuário à equipe");
  }
};

// Função para listar equipes com seus respectivos usuários
export const listarEquipe_User = async () => {
  try {
    const teamsWithUsers = await Equipe.findAll({
      attributes: ['id', 'nome'], // Inclua apenas o ID da equipe
      include: [
        {
          model: Equipe_user,
          as: 'users',
          attributes: ['is_lider'], // Apenas ID do usuário e status de liderança
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'nome', 'email'], // Inclua apenas o ID do usuário
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

// Função para mostrar uma equipe com seus usuários
export const getEquipe_user = async (equipeId: number) => {
  try {
    const equipeUser = await Equipe.findOne({
      where: {
        id: equipeId,
      },
      attributes: ['id', 'nome'],
      include: [
        {
          model: Equipe_user,
          as: 'users',
          attributes: ['is_lider'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'nome', 'email'],
            },
          ],
        },
      ],
    });

    return equipeUser;
  } catch (error) {
    console.log("Error in getEquipe_user function:", error);
    throw new Error("Erro ao mostrar uma equipe com seus usuários");
  }
};

// Função para mudar o status de liderança de um usuário em uma equipe
export const mudarEstatosLider = async (userId: number, equipeId: number, isLider: boolean) => {
  // Verificar se os parâmetros não são undefined
  if (userId === undefined || equipeId === undefined || isLider === undefined) {
      throw new Error("userId, equipeId e isLider não podem ser undefined");
  }

  console.log("Dados antes de salvar:", { userId, equipeId, isLider });

  try {
      // Buscar a associação atual do usuário na equipe
      let equipeUser = await Equipe_user.findOne({
          where: {
              user_id: userId,
              equipe_id: equipeId,
          },
      });

      // Se a associação não for encontrada, lançar um erro
      if (!equipeUser) {
          throw new Error("Associação entre usuário e equipe não encontrada");
      }

      // Se o usuário está sendo rebaixado de líder para liderado, verificar se há outros líderes
      if (!isLider && equipeUser.is_lider) {
          const totalLideres = await Equipe_user.count({
              where: {
                  equipe_id: equipeId,
                  is_lider: true,
              },
          });

          // Se há apenas um líder na equipe, impedir a remoção
          if (totalLideres <= 1) {
              throw new Error("A equipe deve ter pelo menos um líder.");
          }
      }

      // Atualizar o status de liderança do usuário atual
      equipeUser.is_lider = isLider;
      await equipeUser.save();

      console.log("Associação atualizada:", equipeUser);

      // Retornar a associação atualizada
      return equipeUser;
  } catch (error) {
      console.log("Erro na função mudarEstatosLider:", error);
      throw new Error("Erro ao mudar estado de líder de uma equipe");
  }
};

// Deletar usuário de uma equipe
export const deletarUsuarioEquipe = async (userId: number, equipeId: number) => {
  try {
    const equipeUser = await Equipe_user.findOne({
      where: {
        user_id: userId,
        equipe_id: equipeId,
      },
    });

    if (!equipeUser) {
      throw new Error("Associação entre usuário e equipe não encontrada");
    }

    await equipeUser.destroy();

    return equipeUser;
  } catch (error) {
    console.log("Error in deletarUsuarioEquipe function:", error);
    throw new Error("Erro ao deletar usuário de uma equipe");
  }
};
