'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('payments', [{
      id: '8b545b39-af81-4c69-8802-dc2efd24b974',
      business: '027bd2aa-4f49-48ea-bea7-a0802195c502',
      amount: 30000,
      payDate: '2020-07-04 12:38:35',
      expiryDate: '2050-11-04 12:38:35',
      period:1200,
      user: 'b936e941-0647-4a2d-ab61-ec470e86227c',
      updatedAt: '2020-07-04T10:38:36.132Z',
      createdAt: '2020-07-04T10:38:36.132Z'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('payments', null, {});
  }
};
