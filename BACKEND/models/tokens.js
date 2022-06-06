'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Tokens.init({
    token: DataTypes.STRING(200),
  }, {
    sequelize,
    modelName: 'Tokens',
    tableName: 'tokens'
  });
  return Tokens;
};