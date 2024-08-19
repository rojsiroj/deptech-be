"use strict";
require("dotenv").config();
const uuid = require("uuid");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.ProductCategory, {
        foreignKey: "product_category",
        as: "category",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      product_category: DataTypes.UUID,
      stock: DataTypes.INTEGER,
      image: DataTypes.STRING,
      image_url: {
        type: DataTypes.VIRTUAL,
        get() {
          if (!this.image) return null;
          return `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/${this.image}`;
        },
        set(value) {
          throw new Error("Do not try to set the `image_url` value!");
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
      hooks: {
        beforeCreate: (product) => (product.id = uuid.v4()),
      },
      defaultScope: {
        include: "category",
      },
    }
  );
  return Product;
};
