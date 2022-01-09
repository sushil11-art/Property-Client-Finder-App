const { landData } = require("../helpers/createObject");
const {
  stringfyArrayOfImages,
  convertStringIntoArrayAndUnlinkImages,
} = require("../helpers/ImageUpload");
const { Land, Property } = require("../models");
const { updateLocation } = require("./locationService");

const createLand = async (land) => {
  return await Land.create({ ...land });
};

const findLandAndUpdate = async (
  landId,
  landInfo,
  locationId,
  propertyId,
  req
) => {
  const { land, location } = await landData(landInfo);
  await updateLand(land, landId);
  await updateLocation(location, locationId);
  const images = await stringfyArrayOfImages(req.body.images);
  const property = await Property.findOne({ where: { id: propertyId } });
  await convertStringIntoArrayAndUnlinkImages(property.dataValues.images);
  await Property.update({ images: images }, { where: { id: propertyId } });
  return await Property.findOne({ where: { id: propertyId } });
};

const updateLand = async (land, landId) => {
  return await Land.update({ ...land }, { where: { id: landId } });
};

const removeLand = async (landId) => {
  await Land.destroy({ where: { id: landId } });
};
module.exports = { createLand, findLandAndUpdate, removeLand };
