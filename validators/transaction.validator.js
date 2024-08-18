const { check } = require("express-validator");

exports.transactionValidation = [
  check("type")
    .exists()
    .withMessage("type is required")
    .isIn(["in", "out"])
    .withMessage("type must be in or out"),
];
