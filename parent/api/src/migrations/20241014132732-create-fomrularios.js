'use strict';

const { type } = require('os');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('formularios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'admin',
          key: 'id'
        },
        onUpdate: 'CASCADE', // Propagação em caso de alteração do ID
        onDelete: 'CASCADE', // Exclui categorias se o admin for removido
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING
      },
      criado_em: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('formularios');
  }
};