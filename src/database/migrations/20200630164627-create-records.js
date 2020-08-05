'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('records', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      invoiceNumber:{
        type: Sequelize.STRING
      },
      disease: {
        type: Sequelize.INTEGER
      },
      medication: {
        type: Sequelize.INTEGER
      },
      patientId: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      user: {
        type: Sequelize.UUID
      },
      pharmacyId: {
        type: Sequelize.UUID
      },
      expiryDate:{
        type: Sequelize.STRING
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
    return queryInterface.dropTable('records');
  }
};