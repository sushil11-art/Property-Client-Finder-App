const sequelize = require("sequelize");
const Op = sequelize.Op;
// const operatorsAliases = {
//     $eq: op.eq,
//     $or: op.or,
// }
const { filterPropertyWithDistance } = require("../helpers/filterProperty");

const {
  stringfyArrayOfImages,
  convertStringIntoArrayAndUnlinkImages,
} = require("../helpers/ImageUpload");
const { uploadFilesMiddleware } = require("../middlewares/upload");
const { Property, Image, Land, Location, Home } = require("../models");
const { createHome, removeHome } = require("./homeService");
const { createLand, removeLand } = require("./landService");
const { createLocation, removePropertyLocation } = require("./locationService");

const addPropertyLand = async (land, location, brokerId, req) => {
  const newLand = await createLand(land);
  const newLocation = await createLocation(location);
  const images = await stringfyArrayOfImages(req.body.images);
  const property = {
    landId: newLand.dataValues.id,
    locationId: newLocation.dataValues.id,
    brokerId: brokerId,
    homeId: null,
    images: images,
  };
  const newProperty = await Property.create({ ...property });
  return newProperty;
};

const addPropertyHome = async (home, location, brokerId, req) => {
  const newHome = await createHome(home);
  const newLocation = await createLocation(location);
  const images = await stringfyArrayOfImages(req.body.images);
  const property = {
    landId: null,
    locationId: newLocation.dataValues.id,
    brokerId: brokerId,
    homeId: newHome.dataValues.id,
    images: images,
  };
  const newProperty = await Property.create({ ...property });
  return newProperty;
};

const removePropertyLand = async (id, landId, locationId) => {
  await removeLand(landId);
  await removePropertyLocation(locationId);
  const property = await Property.findOne({ where: { id: id } });
  await convertStringIntoArrayAndUnlinkImages(property.dataValues.images);
  return await Property.destroy({ where: { id: id } });
};

const removePropertyHome = async (id, homeId, locationId) => {
  await removeHome(homeId);
  await removePropertyLocation(locationId);
  const property = await Property.findOne({ where: { id: id } });
  await convertStringIntoArrayAndUnlinkImages(property.dataValues.images);
  return await Property.destroy({ where: { id: id } });
};

const findProperty = async (id, brokerId) => {
  return await Property.findOne({ where: { id: id, brokerId: brokerId } });
};

const findProperties = async (brokerId) => {
  return await Property.findAll({
    where: { brokerId: brokerId },
    include: ["land", "broker", "home", "location"],
  });
};

const findPropertyDetails = async (id, brokerId) => {
  return await Property.findOne({
    where: { id: id, brokerId: brokerId },
    include: ["land", "home", "broker", "location"],
  });
};

const findNearestPropertiesForClientLocation = async (
  brokerId,
  latitude,
  longitude,
  client
) => {
  const filter = {};
  if (client.dataValues.propertyType == 0) {
    (filter["brokerId"] = brokerId), (filter["landId"] = { [Op.not]: null });
  } else {
    (filter["brokerId"] = brokerId), (filter["homeId"] = { [Op.not]: null });
  }
  // client.dataValues.propertyType ==0 ? land
  const properties = await Property.findAll({
    where: filter,
    include: ["location", "land", "home"],
  });
  if (properties.length > 0) {
    const filteredProperties = await filterPropertyWithDistance(
      properties,
      latitude,
      longitude,
      client
    );
    return filteredProperties;
  } else {
    return properties;
  }
};

const totalPropertyCount=async(brokerId)=>{

  return await Property.count({where:{brokerId:brokerId}});
  // console.log(totalProperty);
  // return totalProperty;

}

module.exports = {
  addPropertyLand,
  addPropertyHome,
  findProperty,
  findProperties,
  findPropertyDetails,
  removePropertyLand,
  removePropertyHome,
  findNearestPropertiesForClientLocation,
  totalPropertyCount
};

// propoerty inner join location
// select( calculation as distance)
// orderBy(distance)
