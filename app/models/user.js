"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          msg: "First name is correct",
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          msg: "Last name is correct",
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          msg: "Email is correct",
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            msg: "Password is correct",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
