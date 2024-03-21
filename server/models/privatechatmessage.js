'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PrivateChatMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PrivateChatMessage.belongsTo(models.User, { foreignKey: 'senderId' });
      PrivateChatMessage.belongsTo(models.User, { foreignKey: 'recipientId', as: 'recipient' });
    }
  }
  PrivateChatMessage.init({
    senderId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER,
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'PrivateChatMessage',
  });
  return PrivateChatMessage;
};