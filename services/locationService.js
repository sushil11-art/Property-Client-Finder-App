const { Location, RequriedLocation } = require("../models");

const createLocation = async (location) => {
  return await Location.create({ ...location });
};
const updateLocation = async (location, locationId) => {
  return await Location.update({ ...location }, { where: { id: locationId } });
  // console.log(l);
};

const addClientLocation = async (location) => {
  return await RequriedLocation.create({ ...location });
};
const updateClientLocation = async (location, requiredlocationId) => {
  return await RequriedLocation.update(
    { ...location },
    { where: { id: requiredlocationId } }
  );
};

const removeClientLocation = async (requiredlocationId) => {
  return await RequriedLocation.destroy({ where: { id: requiredlocationId } });
};

const removePropertyLocation=async(locationId)=>{

}

module.exports = {
  createLocation,
  updateLocation,
  addClientLocation,
  updateClientLocation,
  removeClientLocation,
  removePropertyLocation
};
