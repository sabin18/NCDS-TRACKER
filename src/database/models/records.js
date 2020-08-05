'use strict';
module.exports = (sequelize, DataTypes) => {
  const records = sequelize.define('records', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
  },
    invoiceNumber: DataTypes.STRING,
    disease:DataTypes.INTEGER,
    medication:DataTypes.INTEGER,
    patientId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    date: DataTypes.STRING,
    user: DataTypes.UUID,
    pharmacyId: DataTypes.UUID,
    expiryDate:DataTypes.STRING
  }, {});
  records.associate = function(models) {
    records.belongsTo(models.patient, {
      as: 'patient',
      foreignKey: 'patientId',
      targetKey: 'id',
    });
    records.belongsTo(models.Users, {
      as: 'users',
      foreignKey: 'user',
      targetKey: 'id',
    });
    records.belongsTo(models.pharmacy, {
      as: 'pharmacy',
      foreignKey: 'pharmacyId',
      targetKey: 'id',
    });
    records.belongsTo(models.diseases, {
      as: 'diseases',
      foreignKey: 'disease',
      targetKey: 'id',
    });
    records.belongsTo(models.medications, {
      as: 'medications',
      foreignKey: 'medication',
      targetKey: 'id',
    });
  };
  return records;
};