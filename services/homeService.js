const { homeData } = require("../helpers/createObject");
const {
  stringfyArrayOfImages,
  convertStringIntoArrayAndUnlinkImages,
} = require("../helpers/ImageUpload");
const { Home, Property } = require("../models");
const { updateLocation } = require("./locationService");

const createHome = async (home) => {
  return await Home.create({ ...home });
};

const findHomeAndUpdate = async (
  homeId,
  landInfo,
  locationId,
  propertyId,
  req
) => {
  const { home, location } = await homeData(landInfo);
  await updateHome(home, homeId);
  await updateLocation(location, locationId);
  const images = await stringfyArrayOfImages(req.body.images);
  const property = await Property.findOne({ where: { id: propertyId } });
  await convertStringIntoArrayAndUnlinkImages(property.dataValues.images);
  await Property.update({ images: images }, { where: { id: propertyId } });
  return await Property.findOne({ where: { id: propertyId } });
};

const updateHome = async (home, homeId) => {
  return await Home.update({ ...home }, { where: { id: homeId } });
};

const removeHome = async (homeId) => {
  await Home.destroy({ where: { id: homeId } });
};
module.exports = { createHome, findHomeAndUpdate, removeHome };
