'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkInsert('employees', [{
        userId:'6d4a21d6-f16b-4c26-9db0-acd29bdd4d20',
        pharmacyId:'d08a096f-6536-4507-aeca-f18f8234129f',
        isActive:true,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('employees', null, {});
  }
};
