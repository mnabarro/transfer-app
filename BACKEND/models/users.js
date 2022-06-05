'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Friendship_requests,{ foreignKey:{name: 'users_id_from'}});
      Users.hasMany(models.Friendship_requests,{ foreignKey:{name: 'users_id_to'}});

      Users.hasMany(models.Friendships,{ foreignKey:{name: 'users_id1'}});
      Users.hasMany(models.Friendships,{ foreignKey:{name: 'users_id2'}});
      
      Users.hasMany(models.Messages,{ foreignKey:{name: 'users_id_from'}});
      Users.hasMany(models.Messages,{ foreignKey:{name: 'users_id_to'}});

      Users.hasMany(models.Accounts,{ foreignKey:{name: 'users_id'}});
      Users.hasMany(models.Transfers,{ foreignKey:{name: 'users_id'}});
    }
  }
  Users.init({
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate : {
        notEmpty : true
      }
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate : {
        notEmpty : true
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique : true,
      validate : {
        notEmpty : true,
        isEmail : true
      }
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate : {
        notEmpty : true,
      }
    },
    phoneNumber: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique : true,
      validate : {
        notEmpty : true,
        isNumeric : true
      }
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate : {
        notEmpty : true,
        isDate : true
      }
    }
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users'
  });


  return Users
};