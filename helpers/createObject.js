const homeData = async (homeData) => {
  const {
    price,
    landArea,
    roadAccess,
    waterSupply,
    kitchens,
    bedrooms,
    bathrooms,
    floors,
    province,
    district,
    municipality,
    ward,
    street,
    latitude,
    longitude,
  } = homeData;
  let home = {};
  if (price) home.price = price;
  if (landArea) home.landArea = landArea;
  if (roadAccess) home.roadAccess = roadAccess;
  if (waterSupply) home.waterSupply = waterSupply;
  if (kitchens) home.kitchens = kitchens;
  if (bedrooms) home.bedrooms = bedrooms;
  if (bathrooms) home.bathrooms = bathrooms;
  if (floors) home.floors = floors;

  let location = {};
  if (province) location.province = province;
  if (district) location.district = district;
  if (municipality) location.municipality = municipality;
  if (ward) location.ward = ward;
  if (street) location.street = street;
  if (longitude) location.longitude = longitude;
  if (latitude) location.latitude = latitude;
  return { home, location };
};

const landData = async (landData) => {
  const {
    price,
    landArea,
    roadAccess,
    waterSupply,
    province,
    district,
    municipality,
    ward,
    street,
    latitude,
    longitude,
  } = landData;
  let land = {};
  if (price) land.price = price;
  if (landArea) land.landArea = landArea;
  if (roadAccess) land.roadAccess = roadAccess;
  if (waterSupply) land.waterSupply = waterSupply;

  let location = {};
  if (province) location.province = province;
  if (district) location.district = district;
  if (municipality) location.municipality = municipality;
  if (ward) location.ward = ward;
  if (street) location.street = street;
  if (longitude) location.longitude = longitude;
  if (latitude) location.latitude = latitude;
  return { land, location };
};

const clientData = async (clientData) => {
  const {
    name,
    phone,
    email,
    propertyType,
    price,
    landArea,
    roadAccess,
    waterSupply,
    kitchens,
    bathrooms,
    floors,
    bedrooms,
    province,
    district,
    municipality,
    ward,
    street,
    latitude,
    longitude,
  } = clientData;
  const client = {};
  if (name) client.name = name;
  if (phone) client.phone = phone;
  if (email) client.email = email;
  if (propertyType) client.propertyType = propertyType;
  if (price) client.price = price;
  if (landArea) client.landArea = landArea;
  if (roadAccess) client.roadAccess = roadAccess;
  if (waterSupply) client.waterSupply = waterSupply;
  if (propertyType == 1 && kitchens) {
    client.kitchens = kitchens;
  } else {
    client.kitchens = 0;
  }
  if (propertyType == 1 && bathrooms) {
    client.bathrooms = bathrooms;
  } else {
    client.bathrooms = 0;
  }
  if (propertyType == 1 && floors) {
    client.floors = floors;
  } else {
    client.floors = 0;
  }
  if (propertyType == 1 && bedrooms) {
    client.bedrooms = bedrooms;
  } else {
    client.bedrooms = 0;
  }

  let location = {};
  if (province) location.province = province;
  if (district) location.district = district;
  if (municipality) location.municipality = municipality;
  if (ward) location.ward = ward;
  if (street) location.street = street;
  if (longitude) location.longitude = longitude;
  if (latitude) location.latitude = latitude;
  return { client, location };
};

module.exports = { homeData, landData, clientData };
