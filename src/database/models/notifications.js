'use strict';
module.exports = (sequelize, DataTypes) => {
  const notifications = sequelize.define('notifications', {
    pharmacyId: DataTypes.UUID,
    userId: DataTypes.UUID,
    activity: DataTypes.STRING,
    timestamp: {
      type: DataTypes.TIME,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {});
  notifications.associate = function(models) {
     notifications.belongsTo(models.Users, {
      as: 'user',
      foreignKey: 'userId',
      targetKey: 'id',
    });
     notifications.belongsTo(models.pharmacy, {
      as: 'pharmacy',
      foreignKey: 'pharmacyId',
      targetKey: 'id',
    });
  };
  return notifications;
};