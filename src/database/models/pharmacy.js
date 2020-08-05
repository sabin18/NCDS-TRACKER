'use strict';
module.exports = (sequelize, DataTypes) => {
  const pharmacy = sequelize.define('pharmacy', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
  },
    name: DataTypes.STRING,
    owner: DataTypes.UUID,
    payment: DataTypes.UUID,
    district: DataTypes.STRING,
    sector:DataTypes.STRING,
    isPaid: DataTypes.BOOLEAN
  }, {});
  pharmacy.associate = function(models) {
    pharmacy.belongsTo(models.Users, {
      as: 'user',
      foreignKey: 'owner',
      targetKey: 'id',
    });
    pharmacy.belongsTo(models.payment, {
      as: 'payments',
      foreignKey: 'payment',
      targetKey: 'id',
    });
  };
  return pharmacy;
};