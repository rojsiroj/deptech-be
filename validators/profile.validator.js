const { User } = require("../models");
const { check } = require("express-validator");

exports.updateProfileValidation = [
  check("first_name")
    .exists()
    .withMessage("First name is required")
    .isLength({ max: 255 })
    .withMessage("Last name must be less than 255 characters"),
  check("last_name")
    .isLength({ max: 255 })
    .withMessage("Last name must be less than 255 characters"),
  check("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .custom((value, { req }) => {
      return User.findOne({ where: { email: value } }).then((data) => {
        if (
          data !== null &&
          data.id !== req.user.userId &&
          data instanceof User
        ) {
          return Promise.reject("Email already taken");
        }
      });
    }),
  check("dob")
    .exists()
    .withMessage("DoB is required")
    .isDate()
    .withMessage("DoB must be valid date"),
  check("gender")
    .isIn(["male", "female"])
    .withMessage("Gender must be male or female"),
];
