'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('equipe_user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      },
      equipe_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'equipe',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      is_lider: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  
  async down(queryInterface, Sequelize) {
    const foreignKeys = await queryInterface.getForeignKeyReferencesForTable('equipe');
    for (const fk of foreignKeys) {
      await queryInterface.removeConstraint('equipe', fk.constraintName);
    }

    await queryInterface.dropTable('equipe_user');
  }
};