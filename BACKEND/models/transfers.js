'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transfers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transfers.init({
    accounts_id_from: DataTypes.INTEGER,
    accounts_id_to: DataTypes.INTEGER,
    users_id: DataTypes.INTEGER,
    ammount: DataTypes.DECIMAL(10,3),
    reason: DataTypes.STRING(25),
    description: DataTypes.STRING(100),
    requested: DataTypes.DATE,
    confirmed: DataTypes.DATE,
    rejected: DataTypes.DATE,
    result: DataTypes.STRING(45)
  }, {
    sequelize,
    modelName: 'Transfers',
    tableName: 'transfers'
  });
  return Transfers;
};