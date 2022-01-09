const express = require("express");
const {
  addClient,
  editClient,
  deleteClient,
  getAllClients,
  getClientDetails,
  getAllClientsForPropertyLocation,
} = require("../controllers/clientController");
const { clientValidation } = require("../validation/clientValidation");

// const { authenticateToken } = require("../middlewares/jwtTokenAuthentication");
const router = express.Router();


/* GET route ,get all clients listing  AUTH:"/api/v1/client/allClient" */

router.get("/allClient",getAllClients);

/* GET route ,get all clients listing for a single property  AUTH:"/api/v1/client/allClient/:propertyId" */

router.get("/allClient/:propertyId",getAllClientsForPropertyLocation);

/* GET route ,get single client details  AUTH:"/api/v1/getClient/:clientId" */

router.get("/getClient/:clientId", getClientDetails);

/* POST route ,add single client details  AUTH:"/api/v1/addClient" */

router.post("/addClient",clientValidation,addClient);

/* PUT route ,edit single client details  AUTH:"/api/v1/editClient/:clientId" */

router.put("/editClient/:clientId",clientValidation,editClient);

/* DELETE route ,delete single client details  AUTH:"/api/v1/deleteClient/:clientId" */

router.delete("/deleteClient/:clientId",deleteClient);

module.exports = router;
