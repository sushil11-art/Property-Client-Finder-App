const calculateOverallPercentageMatch = async (
  property,
  distance,
  area,
  client
) => {
  const { land, home } = property.dataValues;

  let matchPercentageOfLocation = 0;
  let matchPercentageOfLandArea = 0;
  let matchPercentageOfPrice = 0;
  let matchPercentageOfKitchens = 0;
  let matchPercentageOfBathrooms = 0;
  let matchPercentageOfBedrooms = 0;
  let matchPercentageOfFloors = 0;

  let averageMatchPercentage = 0;

  matchPercentageOfLocation = await percentageMatchOfLocation(distance, area);
  // check for property type land
  if (home == null) {
    matchPercentageOfLandArea = await percentageMatchOfLandArea(
      land.landArea,
      client.dataValues.landArea
    );
    matchPercentageOfPrice = await percentageMatchOfPrice(
      land.price,
      client.dataValues.price
    );
    averageMatchPercentage =
      matchPercentageOfLandArea * 0.3 +
      matchPercentageOfLocation * 0.4 +
      matchPercentageOfPrice * 0.3;
  }

  if (land == null) {
    // check for property type /home
    matchPercentageOfLandArea = await percentageMatchOfLandArea(
      home.landArea,
      client.dataValues.landArea
    );
    matchPercentageOfPrice = await percentageMatchOfPrice(
      home.price,
      client.dataValues.price
    );
    matchPercentageOfKitchens = await percentageMatchOfKitchens(
      home.kitchens,
      client.dataValues.kitchens
    );
    matchPercentageOfBedrooms = await percentageMatchOfBedrooms(
      home.bedrooms,
      client.dataValues.bedrooms
    );
    matchPercentageOfBathrooms = await percentageMatchOfBathrooms(
      home.bathrooms,
      client.dataValues.bathrooms
    );
    matchPercentageOfFloors = await percentageMatchOfFloors(
      home.floors,
      client.dataValues.floors
    );
    averageMatchPercentage =
      matchPercentageOfLandArea * 0.2 +
      matchPercentageOfLocation * 0.2 +
      matchPercentageOfPrice * 0.2 +
      matchPercentageOfKitchens * 0.1 +
      matchPercentageOfBathrooms * 0.1 +
      matchPercentageOfBedrooms * 0.1 +
      matchPercentageOfFloors * 0.1;
  }

  // console.log("average", averageMatchPercentage);
  return averageMatchPercentage;
};

const percentageMatchOfLocation = async (distance, area) => {
  let matchPerc = 0;
  if (distance < area) {
    matchPerc = Math.abs((distance / area) * 100);
  } else if (distance > area) {
    matchPerc = Math.abs((area / distance) * 100);
  } else if (distance == area) {
    matchPerc = 100;
  }
  return matchPerc;
};

const percentageMatchOfLandArea = async (
  propertyLandArea,
  requiredLandArea
) => {
  let matchPerc = 0;
  if (requiredLandArea < propertyLandArea) {
    matchPerc = Math.abs((requiredLandArea / propertyLandArea) * 100);
  } else if (requiredLandArea > propertyLandArea) {
    matchPerc = Math.abs((propertyLandArea / requiredLandArea) * 100);
  } else if (requiredLandArea == propertyLandArea) {
    matchPerc = 100;
  }
  return matchPerc;
};

const percentageMatchOfPrice = async (propertyPrice, requiredPrice) => {
  let matchPerc = 0;
  if (requiredPrice < propertyPrice) {
    matchPerc = Math.abs((requiredPrice / propertyPrice) * 100);
  } else if (requiredPrice > propertyPrice) {
    matchPerc = Math.abs((propertyPrice / requiredPrice) * 100);
  } else if (requiredPrice == propertyPrice) {
    matchPerc = 100;
  }
  return matchPerc;
};

const percentageMatchOfKitchens = async (
  propertyKitchens,
  requiredKitchens
) => {
  let matchPerc = 0;
  if (requiredKitchens < propertyKitchens) {
    matchPerc = Math.abs((requiredKitchens / propertyKitchens) * 100);
  } else if (requiredKitchens > propertyKitchens) {
    matchPerc = Math.abs((propertyKitchens / requiredKitchens) * 100);
  } else if (requiredKitchens == propertyKitchens) {
    matchPerc = 100;
  }
  return matchPerc;
};

const percentageMatchOfBathrooms = async (
  propertyBathrooms,
  requiredBathrooms
) => {
  let matchPerc = 0;
  if (requiredBathrooms < propertyBathrooms) {
    matchPerc = Math.abs((requiredBathrooms / propertyBathrooms) * 100);
  } else if (requiredBathrooms > propertyBathrooms) {
    matchPerc = Math.abs((propertyBathrooms / requiredBathrooms) * 100);
  } else if (requiredBathrooms == propertyBathrooms) {
    matchPerc = 100;
  }
  return matchPerc;
};

const percentageMatchOfBedrooms = async (
  propertyBedrooms,
  requiredBedrooms
) => {
  if (requiredBedrooms < propertyBedrooms) {
    matchPerc = Math.abs((requiredBedrooms / propertyBedrooms) * 100);
  } else if (requiredBedrooms > propertyBedrooms) {
    matchPerc = Math.abs((propertyBedrooms / requiredBedrooms) * 100);
  } else if (requiredBedrooms == propertyBedrooms) {
    matchPerc = 100;
  }
  return matchPerc;
};

const percentageMatchOfFloors = async (propertyFloors, requiredFloors) => {
  if (requiredFloors < propertyFloors) {
    matchPerc = Math.abs((requiredFloors / propertyFloors) * 100);
  } else if (requiredFloors > propertyFloors) {
    matchPerc = Math.abs((propertyFloors / requiredFloors) * 100);
  } else if (requiredFloors == propertyFloors) {
    matchPerc = 100;
  }
  return matchPerc;
};

module.exports = { calculateOverallPercentageMatch };
