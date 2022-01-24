const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { generatePropertyArea } = require("../helpers/convertArea");
const { clientData } = require("../helpers/createObject");

const {
  findClient,
  findClientAndUpdate,
  removeClient,
  findAllClients,
  findClientDetails,
  addClientDetails,
  findNearestClientsForPropertyLocation,
} = require("../services/clientService");
const { findPropertyDetails } = require("../services/propertyService");

const addClient = asyncHandler(async (req, res, next) => {
  try {
    const {
      name,
      phone,
      email,
      propertyType,
      price,
      ropani,
      aana,
      waterSupply,
      roadAccess,
      kitchens,
      bathrooms,
      floors,
      bedrooms,
      province,
      district,
      municipality,
      ward,
      street,
      latitude,
      longitude,
    } = req.body;

    const brokerId = req.user.user.id;
    const { client, location } = await clientData(req.body);
    const newClient = await addClientDetails(client, location, brokerId);
    return res.send(newClient);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error", err);
  }
});

const editClient = asyncHandler(async (req, res, next) => {
  try {
    const {
      name,
      phone,
      email,
      propertyType,
      price,
      ropani,
      aana,
      waterSupply,
      roadAccess,
      kitchens,
      bathrooms,
      floors,
      bedrooms,
      province,
      district,
      municipality,
      ward,
      street,
      latitude,
      longitude,
    } = req.body;
    const id = req.params.clientId;
    const brokerId = req.user.user.id;
    const client = await findClient(id, brokerId);
    if (!client)
      return res
        .status(400)
        .json({ errors: [{ message: "Cannot find a client " }] });
    const updatedClient = await findClientAndUpdate(
      id,
      req.body,
      client.dataValues.requiredlocationId
    );
    return res.send(updatedClient);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error", err);
  }
});

const deleteClient = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.clientId;
    const brokerId = req.user.user.id;
    const client = await findClient(id, brokerId);
    if (!client)
      return res
        .status(400)
        .json({ errors: [{ message: "Cannot find a client " }] });
    await removeClient(
      client.dataValues.id,
      client.dataValues.requiredlocationId
    );
    return res.status(200).json({ message: "Client Deleted " });
  } catch (err) {
    return res.status(500).send("Server error", err);
  }
});

const getAllClients = asyncHandler(async (req, res, next) => {
  try {
    const brokerId = req.user.user.id;
    const docs = await findAllClients(brokerId);
    // console.log(docs);
    let clients = docs.map((doc) => {
      let area;
      area = generatePropertyArea(doc.dataValues.landArea);
      return {
        ...doc.dataValues,
        area,
      };
    });
    console.log(clients);
    // console.log(clients);
    return res.send(clients);
  } catch (err) {
    // console.log(err);
    return res.status(500).send("Server error", err);
  }
});

const getClientDetails = asyncHandler(async (req, res, next) => {
  try {
    const brokerId = req.user.user.id;
    const id = req.params.clientId;
    const doc = await findClientDetails(id, brokerId);
    if (!doc)
      return res
        .status(400)
        .json({ errors: [{ message: "Cannot find a client " }] });
    let area = generatePropertyArea(doc.dataValues.landArea);
    let client = { ...doc.dataValues, area };

    return res.send(client);
  } catch (err) {
    // console.log(err);
    return res.status(500).send("Server error", err);
  }
});

const getAllClientsForPropertyLocation = asyncHandler(
  async (req, res, next) => {
    try {
      const propertyId = req.params.propertyId;
      const brokerId = req.user.user.id;
      const property = await findPropertyDetails(propertyId, brokerId);
      if (!property)
        return res
          .status(400)
          .json({ errors: [{ message: "Cannot find a property details " }] });
      const { location } = property.dataValues;
      const clients = await findNearestClientsForPropertyLocation(
        brokerId,
        location.dataValues.latitude,
        location.dataValues.longitude,
        property
      );
   
      return res.send(clients);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server error", err);
    }
  }
);

module.exports = {
  addClient,
  editClient,
  deleteClient,
  getAllClients,
  getClientDetails,
  getAllClientsForPropertyLocation,
};
