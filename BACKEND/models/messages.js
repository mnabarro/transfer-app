'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Messages.init({
    title: DataTypes.STRING(45),
    body: DataTypes.STRING(100),
    users_id_from: DataTypes.INTEGER,
    users_id_to: DataTypes.INTEGER,
    sent: DataTypes.DATE,
    delivered: DataTypes.DATE,
    read: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Messages',
    tableName: 'messages'
  });
  return Messages;
};