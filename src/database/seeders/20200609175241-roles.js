'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [{
      id:1,
      name: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id:2,
      name: 'owner',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id:3,
      name: 'cashier',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id:4,
      name: 'manager',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
