const { ProductCategory, Product } = require("../models");
const { check } = require("express-validator");

exports.productValidation = [
  check("name")
    .exists()
    .withMessage("Product name is required")
    .isLength({ min: 2 })
    .withMessage("Product name must be at least 2 characters long"),
  check("product_category").custom((value) => {
    if (value === null || value === undefined) {
      return Promise.reject("Product Category is required");
    }

    return ProductCategory.findOne({ where: { id: value } }).then((data) => {
      if (data === null) {
        return Promise.reject(`Product Category with id=${value} not found`);
      }
    });
  }),
  check("stock")
    .exists()
    .withMessage("Product stock is required")
    .isInt({ min: 0 })
    .withMessage("Product stock must be a positive number"),
];
