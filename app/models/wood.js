"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wood.init(
    {
      name: DataTypes.STRING,
      type: {
        type: DataTypes.ENUM,
        values: ["softwood", "exotic wood", "noble and hardwoods"],
      },
      hardness: {
        type: DataTypes.ENUM,
        values: ["tender", "medium-hard", "hard"],
      },
    },
    {
      sequelize,
      modelName: "Wood",
    }
  );
  return Wood;
};
