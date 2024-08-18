const fs = require("fs");
const messages = require("../utils/lang/messages");
const { validationResult } = require("express-validator");

exports.handleCommonValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  return res
    .status(messages.response.c422.code)
    .json({ message: messages.response.c422.message, data: errors.array() });
};

exports.handleWithFileValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  fs.unlink(req.file.path, (err) => {
    if (err) {
      /* HANLDE ERROR */
    }
    console.log(`successfully deleted ${req.file.path}`);
  });

  return res
    .status(messages.response.c422.code)
    .json({ message: messages.response.c422.message, data: errors.array() });
};
