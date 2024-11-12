'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('perguntas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      formulario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'formularios',
          key: 'id'
        }
      },
      texto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      categoria_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categorias',
          key: 'id'
        }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    const foreignKeys = await queryInterface.getForeignKeyReferencesForTable('perguntas');
    for (const fk of foreignKeys) {
      await queryInterface.removeConstraint('perguntas', fk.constraintName);
    }

    await queryInterface.dropTable('perguntas');
  }
};