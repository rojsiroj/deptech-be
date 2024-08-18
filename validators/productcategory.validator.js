const { check } = require("express-validator");

exports.productCategoryValidation = [
  check("name")
    .exists()
    .withMessage("Product Category name is required")
    .isLength({ min: 2 })
    .withMessage("Product Category name must be at least 2 characters long"),
];
