'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuario', [
      {
        nome: 'João',
        email: 'joao@gmail.com',
        id_admin: 2
      },
      {
        nome: 'Vinicius',
        email: 'vinicius@gmail.com',
        id_admin: 2
      },
      {
        nome: 'Guilherme',
        email: 'guilherme@gmail.com',
        id_admin: 2
      },
      {
        nome: 'Matheus',
        email: 'matheus@gmail.com',
        id_admin: 2
      },
      {
        nome: 'Pedro',
        email: 'pedro@gmail.com',
        id_admin: 2
      },
      {
        nome: 'Samuel',
        email: 'samuel@gmail.com',
        id_admin: 2
      },
      {
        nome: 'Larissa',
        email: 'larissa@gmail.com',
        id_admin: 2
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
    await queryInterface.bulkDelete('usuario', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
