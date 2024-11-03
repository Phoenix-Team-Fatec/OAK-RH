'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('formulario_user', {
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
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' 
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    const foreignKeys = await queryInterface.getForeignKeyReferencesForTable('formulario-user');
    for (const fk of foreignKeys) {
      await queryInterface.removeConstraint('formulario-user', fk.constraintName);
    }

    await queryInterface.dropTable('formulario-user');
  }
};