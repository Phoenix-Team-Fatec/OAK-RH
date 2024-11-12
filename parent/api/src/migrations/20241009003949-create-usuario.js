'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      id_admin: {
        type: Sequelize.INTEGER,
        references: {
          model: 'admin',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    const foreignKeys = await queryInterface.getForeignKeyReferencesForTable('usuario');
    for (const fk of foreignKeys) {
      await queryInterface.removeConstraint('usuario', fk.constraintName);
    }

    await queryInterface.dropTable('usuario');
  }
};