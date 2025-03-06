const express = require("express");
const router = express.Router();
const user_controller = require("../controller/user_controller");

router.post("/create-user", user_controller.create_admin);
// router.post("/login-user", admin_controller.login_admin);

module.exports = router;
