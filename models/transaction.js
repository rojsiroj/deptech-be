"use strict";
const uuid = require("uuid");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init(
    {
      type: DataTypes.ENUM("in", "out"),
    },
    {
      sequelize,
      modelName: "Transaction",
      hooks: {
        beforeCreate: (transaction) => (transaction.id = uuid.v4()),
      },
    }
  );
  return Transaction;
};
