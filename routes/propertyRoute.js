const express = require("express");
const {
  addLand,
  addHome,
  editLand,
  editHome,
  deleteLand,
  deleteHome,
  getAllProperty,
  getPropertyDetails,
  allPropertyForClientLocation,
} = require("../controllers/propertyController");
const {
  landValidation,
  homeValidation,
} = require("../validation/propertyValidation");
const router = express.Router();

/* GET route ,get all properties listing  AUTH:"/api/v1/allProperty" */
router.get("/allProperty", getAllProperty);

/* GET route ,get all properties listing for a single client  AUTH:"/api/v1/allProperty/:clientID" */

router.get("/allProperty/:clientId", allPropertyForClientLocation);

/* GET route ,get single property details  AUTH:"/api/v1/getProperty/:propertyId" */

router.get("/getProperty/:propertyId", getPropertyDetails);

/* POST route ,add single property details/land  AUTH:"/api/v1/addLand" */

router.post("/addLand", landValidation, addLand);

/* PUT route ,edit single property details/land  AUTH:"/api/v1/editLand/:propertyId" */

router.put("/editLand/:propertyId", landValidation, editLand);

/* DELETE route ,delete single property details/land  AUTH:"/api/v1/deleteLand/:propertyId" */

router.delete("/deleteLand/:propertyId", deleteLand);

/* POST route ,add single property details/home  AUTH:"/api/v1W/addHome" */

router.post("/addHome", homeValidation, addHome);

/* PUT route ,edit single property details/home  AUTH:"/api/v1/editLand/:propertyId" */

router.put("/editHome/:propertyId", homeValidation, editHome);

/* DELETE route ,delete single property details/home  AUTH:"/api/v1/deleteHome/:propertyId" */

router.delete("/deleteHome/:propertyId", deleteHome);

module.exports = router;
