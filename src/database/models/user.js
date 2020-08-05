'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
  },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
    isActive:DataTypes.BOOLEAN,
    isVerified: DataTypes.BOOLEAN,
    phoneNumber:DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    User.belongsTo(models.roles, {
      as: 'roles',
      foreignKey: 'role',
      targetKey: 'id',
    });
  };
  return User;
};