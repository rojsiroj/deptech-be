const router = require("express").Router();
const authentication = require("../middlewares/authentication");

const { handleCommonValidation } = require("../handlers/validation.handler");

const transactionController = require("../controllers/transaction.controller");
const {
  transactionValidation,
} = require("../validators/transaction.validator");

router.post(
  "/create",
  authentication,
  transactionValidation,
  handleCommonValidation,
  transactionController.create
);
router.get("/list", authentication, transactionController.list);

module.exports = router;
