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

const profileController = require("../controllers/profile.controller");
const { updateProfileValidation } = require("../validators/profile.validator");

router.post(
  "/auth/login",
  loginValidation,
  handleCommonValidation,
  authController.login
);

router.post(
  "/admin/create",
  authentication,
  createAdminValidation,
  handleCommonValidation,
  adminController.create
);
router.get("/admin/list", authentication, adminController.list);
router.get("/admin/detail/:id", authentication, adminController.detail);
router.put(
  "/admin/update/:id",
  authentication,
  updateAdminValidation,
  handleCommonValidation,
  adminController.update
);
router.delete("/admin/delete/:id", authentication, adminController.destroy);

router.get("/profile", authentication, profileController.detail);
router.put(
  "/profile",
  authentication,
  updateProfileValidation,
  handleCommonValidation,
  profileController.update
);

module.exports = router;
