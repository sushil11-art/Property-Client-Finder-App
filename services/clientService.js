// const { clientData } = require("../helpers/createObject");
const { clientData } = require("../helpers/createObject");
const { filterClientWithDistance } = require("../helpers/filterClient");
const { Client } = require("../models");
const client = require("../models/client");
const {
  addClientLocation,
  updateLocation,
  updateClientLocation,
  removeClientLocation,
} = require("./locationService");

const addClientDetails = async (client, location, brokerId) => {
  const reqLocation = await addClientLocation(location);
  const newClient = {
    ...client,
    requiredlocationId: reqLocation.dataValues.id,
    brokerId: brokerId,
  };

  return await Client.create({ ...newClient });
};

const findClient = async (id, brokerId) => {
  return await Client.findOne({ where: { id: id, brokerId: brokerId } });
};

const findClientAndUpdate = async (
  clientId,
  clientInfo,
  requiredlocationId
) => {
  const { client, location } = await clientData(clientInfo);
  await updateClientLocation(location, requiredlocationId);
  await updateClient(client, clientId);
  return await Client.findOne({ where: { id: clientId } });
};

const updateClient = async (client, clientId) => {
  return await Client.update({ ...client }, { where: { id: clientId } });
};

const removeClient = async (id, requiredlocationId) => {
  await removeClientLocation(requiredlocationId);
  await Client.destroy({ where: { id: id } });
};

const findAllClients = async (brokerId) => {
  return await Client.findAll({
    where: { brokerId: brokerId },
    include: ["broker", "requiredlocation"],
  });
};

const findClientDetails = async (id, brokerId) => {
  return await Client.findOne({
    where: { id: id, brokerId: brokerId },
    include: ["broker", "requiredlocation"],
  });
};

const findNearestClientsForPropertyLocation = async (
  brokerId,
  latitude,
  longitude,
  property
) => {
  const filter = {};

  if (property.dataValues.landId == null) {
    (filter["brokerId"] = brokerId), (filter["propertyType"] = 1);
  } else {
    (filter["brokerId"] = brokerId), (filter["propertyType"] = 0);
  }
  const clients = await Client.findAll({
    where: filter,
    include: ["requiredlocation"],
  });
  if (clients.length > 0) {
    const filteredClients = await filterClientWithDistance(
      clients,
      latitude,
      longitude,
      property
    );
    return filteredClients;
  } else {
    return clients;
  }
};
const checkIfClientExists = async (brokerId, email) => {
  return await Client.findOne({ where: { brokerId: brokerId, email: email } });
};
const totalClientCount=async(brokerId)=>{
  return await Client.count({where:{brokerId:brokerId}});

}

module.exports = {
  addClientDetails,
  findClient,
  findClientAndUpdate,
  removeClient,
  findAllClients,
  findClientDetails,
  checkIfClientExists,
  findNearestClientsForPropertyLocation,
  totalClientCount
};
