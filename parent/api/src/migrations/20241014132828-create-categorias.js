'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categorias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      id_admin: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'admin', // Nome da tabela relacionada
          key: 'id',        // Chave estrangeira
        },
        onUpdate: 'CASCADE', // Propagação em caso de alteração do ID
        onDelete: 'CASCADE', // Exclui categorias se o admin for removido
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categorias');
  },
};
