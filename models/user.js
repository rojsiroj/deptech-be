"use strict";
const uuid = require("uuid");

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
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      dob: DataTypes.DATEONLY,
      password: DataTypes.STRING,
      gender: DataTypes.ENUM("male", "female"),
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => (user.id = uuid.v4()));

  return User;
};
