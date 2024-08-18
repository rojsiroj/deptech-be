const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const upload = require("../middlewares/upload");
const { handleCommonValidation } = require("../handlers/validation.handler");

const productCategoryController = require("../controllers/productcategory.controller");
const {
  productCategoryValidation,
} = require("../validators/productcategory.validator");

const productController = require("../controllers/product.controller");
const { productValidation } = require("../validators/product.validator");

// Product Category Routes
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

// Product Routes
router.post(
  "/create",
  authentication,
  productValidation,
  handleCommonValidation,
  productController.create
);
router.patch(
  "/image/:id",
  authentication,
  upload.single("file"),
  productController.upload
);
router.get("/list", authentication, productController.list);
router.get("/detail/:id", authentication, productController.detail);
router.put(
  "/update/:id",
  authentication,
  productValidation,
  handleCommonValidation,
  productController.update
);
router.delete("/delete/:id", authentication, productController.destroy);

module.exports = router;
