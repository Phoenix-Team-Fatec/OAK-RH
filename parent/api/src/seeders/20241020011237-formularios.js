'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('formularios', [
      {
        admin_id: 1,
        nome: 'Formulário 1',
        descricao: 'Descrição Formulário 1'
      },
      {
        admin_id: 1,
        nome: 'Formulário 2',
        descricao: 'Descrição Formulário 2'
      },
      {
        admin_id: 1,
        nome: 'Formulário 3',
        descricao: 'Descrição Formulário 3'
      },
      {
        admin_id: 1,
        nome: 'Formulário 4',
        descricao: 'Descrição Formulário 4'
      },
      {
        admin_id: 1,
        nome: 'Formulário 5',
        descricao: 'Descrição Formulário 5'
      },
      {
        admin_id: 1,
        nome: 'Formulário 6',
        descricao: 'Descrição Formulário 6'
      },
      {
        admin_id: 1,
        nome: 'Formulário 7',
        descricao: 'Descrição Formulário 7'
      },
      {
        admin_id: 1,
        nome: 'Formulário 8',
        descricao: 'Descrição Formulário 8'
      },
      {
        admin_id: 1,
        nome: 'Formulário 9',
        descricao: 'Descrição Formulário 9'
      },
      {
        admin_id: 1,
        nome: 'Formulário 10',
        descricao: 'Descrição Formulário 10'
      },
      {
        admin_id: 2,
        nome: 'Formulário 1',
        descricao: 'Descrição Formulário 1'
      },
      {
        admin_id: 2,
        nome: 'Formulário 2',
        descricao: 'Descrição Formulário 2'
      },
      {
        admin_id: 2,
        nome: 'Formulário 3',
        descricao: 'Descrição Formulário 3'
      },
      {
        admin_id: 2,
        nome: 'Formulário 4',
        descricao: 'Descrição Formulário 4'
      },
      {
        admin_id: 2,
        nome: 'Formulário 5',
        descricao: 'Descrição Formulário 5'
      },
      {
        admin_id: 2,
        nome: 'Formulário 6',
        descricao: 'Descrição Formulário 6'
      },
      {
        admin_id: 2,
        nome: 'Formulário 7',
        descricao: 'Descrição Formulário 7'
      },
      {
        admin_id: 2,
        nome: 'Formulário 8',
        descricao: 'Descrição Formulário 8'
      },
      {
        admin_id: 2,
        nome: 'Formulário 9',
        descricao: 'Descrição Formulário 9'
      },
      {
        admin_id: 2,
        nome: 'Formulário 10',
        descricao: 'Descrição Formulário 10'
      }
    ], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('formularios', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
