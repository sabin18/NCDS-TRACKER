'use strict';
module.exports = (sequelize, DataTypes) => {
  const diseases = sequelize.define('diseases', {
    name: DataTypes.STRING,
  }, {});
  diseases.associate = function(models) {
 // association
  };
  return diseases;
};