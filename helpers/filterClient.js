const {
  calculateOverallPercentageMatch,
} = require("./calculateMatchPercentage");
const { getNearestLocation } = require("./getNearestLocation");

const filterClientWithDistance = async (
  clients,
  propertyLat,
  propertyLong,
  property,
  area = 3
) => {
  const filteredClients = [];
  for (const client of clients) {
    let { requiredlocation } = client.dataValues;
    let { latitude, longitude } = requiredlocation.dataValues;

    const distance = await getNearestLocation(
      propertyLat,
      propertyLong,
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
      let newPropertyDoc = { ...client.dataValues, percentage };
      filteredClients.push(newPropertyDoc);
    }
  }
  const descendingClients = filteredClients.sort(
    (a, b) => parseFloat(b.percentage) - parseFloat(a.percentage)
  );

  return descendingClients;
};


module.exports = { filterClientWithDistance };
