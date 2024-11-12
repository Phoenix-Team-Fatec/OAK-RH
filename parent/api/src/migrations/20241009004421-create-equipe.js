'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('equipe', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_admin: {
        type: Sequelize.INTEGER,
        references: {
          model: 'admin',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    const foreignKeys = await queryInterface.getForeignKeyReferencesForTable('equipe');
    for (const fk of foreignKeys) {
      await queryInterface.removeConstraint('equipe', fk.constraintName);
    }

    await queryInterface.dropTable('equipe');
  }
};