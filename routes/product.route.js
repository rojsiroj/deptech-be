const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const { handleCommonValidation } = require("../handlers/validation.handler");

const productCategoryController = require("../controllers/productcategory.controller");
const {
  productCategoryValidation,
} = require("../validators/productcategory.validator");

router.post(
  "/category/create",
  authentication,
  productCategoryValidation,
  handleCommonValidation,
  productCategoryController.create
);
router.get("/category/list", authentication, productCategoryController.list);
router.get(
  "/category/detail/:id",
  authentication,
  productCategoryController.detail
);
router.put(
  "/category/update/:id",
  authentication,
  productCategoryValidation,
  handleCommonValidation,
  productCategoryController.update
);
router.delete(
  "/category/delete/:id",
  authentication,
  productCategoryController.destroy
);

module.exports = router;
