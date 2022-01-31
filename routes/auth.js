const express = require("express");
const {
  registerBroker,
  loginBroker,
  changePassword,
  getProfileDetails,
  editProfile,
} = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/jwtTokenAuthentication");
const { updateBrokerProfile } = require("../services/brokerService");
const { registerValidation, changePasswordValidation, updateProfileValidation } = require("../validation/authValidations");
const router = express.Router();
// const authController = require("../controllers/authController");

/* POST route regitser broker account  AUTH:"/api/v1/auth/registerBroker" */
router.post("/registerBroker", registerValidation, registerBroker);

/* POST route login broker account  AUTH:"/api/v1/auth/loginBroker" */

router.post("/loginBroker", loginBroker);

router.post("/changePassword", authenticateToken, changePasswordValidation,changePassword);

router.get("/profile-details",authenticateToken,getProfileDetails);

router.put("/edit-profile",authenticateToken,updateProfileValidation,editProfile);

module.exports = router;
