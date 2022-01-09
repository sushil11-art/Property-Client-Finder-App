const express = require("express");
const router = express.Router();
const API = require("../constant/API").API;
const authRouter = require("./auth");
const propertyRouter = require("./propertyRoute");
const uploadImageRouter = require("./uploadImage");
const clientRouter = require("./clientRoute");
const { authenticateToken } = require("../middlewares/jwtTokenAuthentication");
// const publicRouter = require("./public");
// const privateRouter = require("./private");
// const {authe} = require("../middlewares/jwtTokenAuthentication");

router.use(API.BASE_URL, authRouter);
router.use(API.BASE_URL,authenticateToken, propertyRouter);
router.use(API.BASE_URL,authenticateToken, clientRouter);
router.use(API.BASE_URL,authenticateToken, uploadImageRouter);
// router.use(API.PRIVATE,jwtTokenAuthentication.authenticateToken, privateRouter);

module.exports = router;
