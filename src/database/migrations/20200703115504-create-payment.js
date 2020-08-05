'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      business: {
        type: Sequelize.UUID
      },
      amount: {
        type: Sequelize.INTEGER
      },
      payDate: {
        type: Sequelize.STRING
      },
      expiryDate: {
        type: Sequelize.STRING
      },
      period: {
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('payments');
  }
};