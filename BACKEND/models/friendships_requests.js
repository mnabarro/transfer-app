'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friendship_requests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Friendship_requests.init({
    users_id_from: DataTypes.INTEGER,
    users_id_to: DataTypes.INTEGER,
    requested: DataTypes.DATE,
    accepted: DataTypes.DATE,
    rejected: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Friendship_requests',
    tableName: 'friendship_requests'
  });
  return Friendship_requests;
};