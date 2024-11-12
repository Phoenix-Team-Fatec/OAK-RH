'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('equipe', [
      {
        id_admin: 2,
        descricao: 'Equipe de TI',
        nome: 'Equipe 1'
      },
      {
        id_admin: 2,
        descricao: 'Equipe de Marketing',
        nome: 'Equipe 2'
      },
      {
        id_admin: 2,
        descricao: 'Equipe de RH',
        nome: 'Equipe 3'
      },
      {
        id_admin: 2,
        descricao: 'Equipe de Vendas',
        nome: 'Equipe 4'
      },
      {
        id_admin: 2,
        descricao: 'Equipe de Desenvolvimento',
        nome: 'Equipe 5'
      }
    ], {})
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
    await queryInterface.bulkDelete('equipe', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
