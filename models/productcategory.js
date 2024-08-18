"use strict";
const uuid = require("uuid");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductCategory.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "ProductCategory",
      hooks: {
        beforeCreate: (productCategory) => (productCategory.id = uuid.v4()),
      },
    }
  );
  return ProductCategory;
};
