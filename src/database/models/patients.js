'use strict';
module.exports = (sequelize, DataTypes) => {
  const patient = sequelize.define('patient', {
    firstName: DataTypes.STRING,
    lastName:DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    user: DataTypes.UUID,
    record:DataTypes.UUID
    
  }, {});
  patient.associate = function(models) {
    patient.hasMany(models.records, {
      as: 'records',
      targetKey: 'invoiceNumber',
    });
    patient.belongsTo(models.Users, {
      as: 'users',
      foreignKey: 'user',
      targetKey: 'id',
    });
  };
  return patient;
};