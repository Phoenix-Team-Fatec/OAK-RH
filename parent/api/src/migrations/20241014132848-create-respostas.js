'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('respostas', {
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
          model: 'perguntas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      pergunta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      respondido_por: {
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
      resposta: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      tipo_resposta: {
        type: Sequelize.STRING,
        allowNull: false
      },
      respondido_em: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    const foreignKeys = await queryInterface.getForeignKeyReferencesForTable('respostas');
    for (const fk of foreignKeys) {
      await queryInterface.removeConstraint('respostas', fk.constraintName);
    }

    await queryInterface.dropTable('respostas');
  }
};