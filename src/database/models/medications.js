'use strict';
module.exports = (sequelize, DataTypes) => {
  const medications = sequelize.define('medications', {
    name: DataTypes.STRING,
  }, {});
  medications.associate = function(models) {
  };
  return medications;
};