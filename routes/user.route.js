const router = require("express").Router();
const authentication = require("../middlewares/authentication");

const { handleCommonValidation } = require("../handlers/validation.handler");

const authController = require("../controllers/auth.controller");
const { loginValidation } = require("../validators/auth.validator");

const adminController = require("../controllers/admin.controller");
const {
  createAdminValidation,
  updateAdminValidation,
} = require("../validators/admin.validator");

// const profileController = require("../controllers/profile.controller");

router.post(
  "/auth/login",
  loginValidation,
  handleCommonValidation,
  authController.login
);

router.post(
  "/admin/create",
  createAdminValidation,
  handleCommonValidation,
  authentication,
  adminController.create
);
router.get("/admin/list", authentication, adminController.list);
router.get("/admin/detail/:id", authentication, adminController.detail);
router.put(
  "/admin/update/:id",
  updateAdminValidation,
  handleCommonValidation,
  authentication,
  adminController.update
);
router.delete("/admin/delete/:id", authentication, adminController.destroy);

// router.get("/profile", profileController.register);
// router.put("/profile", profileController.register);

module.exports = router;
