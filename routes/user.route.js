const authController = require("../controllers/auth.controller");
const adminController = require("../controllers/admin.controller");
const profileController = require("../controllers/profile.controller");
const router = require("express").Router();

router.post("/auth/login", authController.login);
router.post("/admin/create", adminController.register);
router.post("/admin/list", adminController.register);
router.put("/admin/update", adminController.register);
router.delete("/admin/delete", adminController.register);
router.get("/profile", profileController.register);
router.put("/profile", profileController.register);

module.exports = router;
