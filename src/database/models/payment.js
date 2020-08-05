'use strict';
module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define('payment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    business: DataTypes.UUID,
    amount: DataTypes.INTEGER,
    payDate: DataTypes.STRING,
    expiryDate: DataTypes.STRING,
    period: DataTypes.INTEGER,
    user:DataTypes.UUID
  }, {});
  payment.associate = function(models) {
    // associations can be defined here
  };
  return payment;
};