'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Accounts.hasMany(models.Transfers,{ foreignKey:{name: 'accounts_id_from'}});
      Accounts.hasMany(models.Transfers,{ foreignKey:{name: 'accounts_id_to'}});
      // define association here
    Accounts.belongsTo(models.Users,{ foreignKey:{name: 'users_id'}});
    }
  }
  Accounts.init({
    uuid: DataTypes.UUID,
    users_id: DataTypes.INTEGER,
    balance: DataTypes.DECIMAL(10,3),
    active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Accounts',
    tableName: 'accounts'
  });
  return Accounts;
};