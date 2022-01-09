const {
  calculateOverallPercentageMatch,
} = require("./calculateMatchPercentage");
const { getNearestLocation } = require("./getNearestLocation");

const filterPropertyWithDistance = async (
  properties,
  clientLat,
  clientLong,
  client,
  area = 3
) => {
  const filteredProperties = [];
  for (const property of properties) {
    let { location } = property.dataValues;
    let { latitude, longitude } = location.dataValues;
    let distance = await getNearestLocation(
      clientLat,
      clientLong,
      latitude,
      longitude,
      "K"
    );
    if (distance <= area) {
      const percentage = await calculateOverallPercentageMatch(
        property,
        distance,
        area,
        client
      );
      let newPropertyDoc = { ...property.dataValues, percentage };
      filteredProperties.push(newPropertyDoc);
    }
  }
  const descendingProperties = filteredProperties.sort(
    (a, b) => parseFloat(b.percentage) - parseFloat(a.percentage)
  );

  return descendingProperties;
};

module.exports = { filterPropertyWithDistance };
