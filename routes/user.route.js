const router = require("express").Router();
const authentication = require("../middlewares/authentication");

const {
  handleValidationErrors,
} = require("../handlers/validation-error.handler");

const authController = require("../controllers/auth.controller");
const { loginValidation } = require("../validators/auth.validate");

const adminController = require("../controllers/admin.controller");

// const profileController = require("../controllers/profile.controller");

router.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  authController.login
);

// router.post("/admin/create", adminController.register);
router.get("/admin/list", authentication, adminController.list);
router.get("/admin/detail/:id", authentication, adminController.detail);
// router.put("/admin/update/:id", adminController.register);
// router.delete("/admin/delete/:id", adminController.register);

// router.get("/profile", profileController.register);
// router.put("/profile", profileController.register);

module.exports = router;
