"use strict";
const uuid = require("uuid");
const { Product, Transaction } = require("./index");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductTransaction.belongsTo(models.Product, {
        foreignKey: "product",
        as: "product_data",
      });
      ProductTransaction.belongsTo(models.Transaction, {
        foreignKey: "transaction",
        as: "transaction_data",
      });
    }
  }
  ProductTransaction.init(
    {
      quantity: DataTypes.INTEGER,
      product: DataTypes.UUID,
      transaction: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "ProductTransaction",
      hooks: {
        beforeCreate: (productTransaction) =>
          (productTransaction.id = uuid.v4()),
      },
      defaultScope: {
        include: ["product_data", "transaction_data"],
      },
    }
  );
  return ProductTransaction;
};
