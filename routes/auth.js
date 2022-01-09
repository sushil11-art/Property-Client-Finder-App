const express = require("express");
const {
  registerBroker,
  loginBroker,
  changePassword,
} = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/jwtTokenAuthentication");
const { registerValidation, changePasswordValidation } = require("../validation/authValidations");
const router = express.Router();
// const authController = require("../controllers/authController");

/* POST route regitser broker account  AUTH:"/api/v1/auth/registerBroker" */
router.post("/registerBroker", registerValidation, registerBroker);

/* POST route login broker account  AUTH:"/api/v1/auth/loginBroker" */

router.post("/loginBroker", loginBroker);

router.post("/changePassword", authenticateToken, changePasswordValidation,changePassword);

module.exports = router;
