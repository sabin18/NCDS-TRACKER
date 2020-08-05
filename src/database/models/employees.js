'use strict';
module.exports = (sequelize, DataTypes) => {
  const employees = sequelize.define('employees', {
    userId: DataTypes.UUID,
    pharmacyId: DataTypes.UUID,
    isActive:DataTypes.BOOLEAN
  }, {});
  employees.associate = function(models) {
    employees.belongsTo(models.Users, {
      as: 'user',
      foreignKey: 'userId',
      targetKey: 'id',
    });
    employees.belongsTo(models.pharmacy, {
      as: 'business',
      foreignKey: 'pharmacyId',
      targetKey: 'id',
    });
  };
  return employees;
};