'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admin', [
      {
        nome: 'adm',
        email: 'adm@example.com',
        empresa: 'Exemplo S/A',
        cnpj: '12.345.678/0001-95'
      },
      {
        nome: 'Vinicius',
        email: 'viniassisperetta@gmail.com',
        empresa: 'LTDA',
        cnpj: '12200'
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
    await queryInterface.bulkDelete('admin', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
