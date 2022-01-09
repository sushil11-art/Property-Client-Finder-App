const fs = require("fs");

const stringfyArrayOfImages = async (images) => {
  return images.toString();
};
const convertStringIntoArrayAndUnlinkImages = async (imageString) => {
  const arrayOfImages = imageString.split(",");
  await unlinkImages(arrayOfImages);
};

const unlinkImages = async (images) => {
  for (const image of images) {
    if (fs.existsSync(image)) {
      fs.unlinkSync(image);
    }
  }
};
module.exports = {
  stringfyArrayOfImages,
  convertStringIntoArrayAndUnlinkImages,
};
