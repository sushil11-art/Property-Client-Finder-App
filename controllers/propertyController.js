const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { homeData, landData } = require("../helpers/createObject");
const { uploadFilesMiddleware } = require("../middlewares/upload");
const { findClientDetails } = require("../services/clientService");
const { findHomeAndUpdate } = require("../services/homeService");
const { findLandAndUpdate } = require("../services/landService");
const {
  addPropertyLand,
  addPropertyHome,
  findProperty,
  removePropertyLand,
  removePropertyHome,
  findProperties,
  findPropertyDetails,
  findNearestPropertiesForClientLocation,
} = require("../services/propertyService");
const { validationResult } = require("express-validator");
const { landValidation } = require("../validation/propertyValidation");
const { generatePropertyArea } = require("../helpers/convertArea");

// const { uploadProperty } = require("./uploadController");

const addLand = async (req, res, next) => {
  try {
    const brokerId = req.user.user.id;
    const {
      price,
      ropani,
      aana,
      roadAccess,
      waterSupply,
      images,
      province,
      district,
      municipality,
      ward,
      street,
      latitude,
      longitude,
    } = req.body;
    const { land, location } = await landData(req.body);
    console.log(land);
    let newProperty = await addPropertyLand(land, location, brokerId, req);
    return res.send(newProperty);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error", err);
  }
};

const addHome = asyncHandler(async (req, res, next) => {
  try {
    const brokerId = req.user.user.id;
    const {
      price,
      ropani,
      aana,
      roadAccess,
      waterSupply,
      kitchens,
      bathrooms,
      bedrooms,
      floors,
      images,
      province,
      district,
      municipality,
      ward,
      street,
      latitude,
      longitude,
    } = req.body;
    // console.log(brokerId);
    const { home, location } = await homeData(req.body);
    let newProperty = await addPropertyHome(home, location, brokerId, req);
    return res.send(newProperty);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error", err);

    // console.log(err);
  }
});

const editLand = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.propertyId;
    const brokerId = req.user.user.id;
    const {
      price,
      ropani,
      aana,
      roadAccess,
      waterSupply,
      images,
      province,
      district,
      municipality,
      ward,
      street,
      latitude,
      longitude,
    } = req.body;
    const property = await findProperty(id, brokerId);
    // console.log(property);
    if (!property)
      return res
        .status(400)
        .json({ errors: [{ message: "Cannot find a property " }] });

    const updatedLand = await findLandAndUpdate(
      property.dataValues.landId,
      req.body,
      property.dataValues.locationId,
      property.dataValues.id,
      req
    );

    return res.send(updatedLand);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error", err);
  }
});

const editHome = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.propertyId;
    const brokerId = req.user.user.id;
    const {
      price,
      ropani,
      aana,
      roadAccess,
      waterSupply,
      kitchens,
      bathrooms,
      bedrooms,
      floors,
      images,
      province,
      district,
      municipality,
      ward,
      street,
      latitude,
      longitude,
    } = req.body;
    const property = await findProperty(id, brokerId);
    // console.log(property);
    if (!property)
      return res
        .status(400)
        .json({ errors: [{ messsage: "Cannot find a property " }] });

    const updatedHome = await findHomeAndUpdate(
      property.dataValues.homeId,
      req.body,
      property.dataValues.locationId,
      property.dataValues.id,
      req
    );

    return res.send(updatedHome);
  } catch (err) {
    return res.status(500).send("Server error", err);
  }
});

const deleteLand = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.propertyId;
    const brokerId = req.user.user.id;
    const property = await findProperty(id, brokerId);
    // console.log("property Id is",req.params.propertyId);
    // console.log("brokerId",brokerId);
    if (!property)
      return res
        .status(400)
        .json({ errors: [{ message: "Cannot find a property " }] });
    const deletedLand = await removePropertyLand(
      property.dataValues.id,
      property.dataValues.landId,
      property.dataValues.locationId
    );
    return res.status(200).json({ message: "Property Deleted " });
    // return res.send(deletedLand);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error", err);
  }
});

const deleteHome = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.propertyId;
    const brokerId = req.user.user.id;
    const property = await findProperty(id, brokerId);
    if (!property)
      return res
        .status(400)
        .json({ errors: [{ message: "Cannot find a property " }] });
    const deletedHome = await removePropertyHome(
      property.dataValues.id,
      property.dataValues.homeId,
      property.dataValues.locationId
    );
    return res.status(200).json({ message: "Property Deleted " });
    // return res.send(deletedLand);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error", err);
  }
});

const getAllProperty = asyncHandler(async (req, res, next) => {
  try {
    const brokerId = req.user.user.id;
    const docs = await findProperties(brokerId);
    // console.log(properties);
    // convert propertyArea into ropani,aana
    let properties=docs.map((doc)=>{
      let area;
      if(doc.dataValues.land !=null){
        
        area= generatePropertyArea (doc.dataValues.land.landArea);
      }
      else{
        area= generatePropertyArea( doc.dataValues.home.landArea);
      }
      return{
        ...doc.dataValues,
        area
      }
    })

    // console.log(properties);

    return res.send(properties);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error", err);
  }
});

const getPropertyDetails = asyncHandler(async (req, res, next) => {
  try {
    const brokerId = req.user.user.id;
    const id = req.params.propertyId;
    const doc= await findPropertyDetails(id, brokerId);
    if (!doc)
      return res
        .status(400)
        .json({ errors: [{ message: "Cannot find a property " }] });
    if(doc.dataValues.land !=null){
      area= generatePropertyArea(doc.dataValues.land.landArea);
    }
    else{
      area=  generatePropertyArea( doc.dataValues.home.landArea);

    }
    let property={...doc.dataValues,area};
    return res.send(property);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error", err);
  }
});

const allPropertyForClientLocation = asyncHandler(async (req, res, next) => {
  try {
    const clientId = req.params.clientId;
    const brokerId = req.user.user.id;
    const client = await findClientDetails(clientId, brokerId);
    // console.log(client);
    if (!client)
      return res
        .status(400)
        .json({ errors: [{ message: "Cannot find a client details " }] });
    const { requiredlocation } = client.dataValues;
    const properties = await findNearestPropertiesForClientLocation(
      brokerId,
      requiredlocation.dataValues.latitude,
      requiredlocation.dataValues.longitude,
      client
    );
    // console.log("matching properties hai........")
    // console.log(properties);
    // console.log(requiredlocation);
    return res.send(properties);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error", err);
  }
});

module.exports = {
  addLand,
  addHome,
  editLand,
  editHome,
  deleteLand,
  deleteHome,
  getAllProperty,
  getPropertyDetails,
  allPropertyForClientLocation,
};
