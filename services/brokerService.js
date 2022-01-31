const { Broker } = require("../models");

const findBroker = async (email) => {
  return await Broker.findOne({ where: { email: email } });
};

const createBroker = async (username, email, password) => {
  const newUser = await Broker.create({ username, email, password });
  return newUser;
};

const findBrokerWithId = async (id) => {
  return await Broker.findOne({ where: { id: id } });
};

const updateBrokerProfile = async (username, imageUrl, id) => {
  return await Broker.update(
    { username: username, imageUrl: imageUrl },
    { where: { id: id } }
  );
};

const updateBrokerPassword = async (id, password) => {
  return await Broker.update({ password: password }, { where: { id: id } });
};
module.exports = {
  findBroker,
  createBroker,
  findBrokerWithId,
  updateBrokerPassword,
  updateBrokerProfile
};
