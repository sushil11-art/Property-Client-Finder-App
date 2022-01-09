module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define("client", {
      name: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.BIGINT,
      },
      email: {
        type: DataTypes.STRING,
      },
        propertyType: {
        // 0 for land
        // 1 for house
        type: DataTypes.INTEGER,
        defaultValue:0
      },
      price: {
        type: DataTypes.DOUBLE,
      },
      landArea: {
        type: DataTypes.FLOAT,
      },
      roadAccess: {
        type: DataTypes.STRING,
      },
      waterSupply: {
        type: DataTypes.STRING,
      },
      // extra field for house
  
      kitchens: {
        type: DataTypes.INTEGER,
      },
      bathrooms: {
        type: DataTypes.INTEGER,
      },
      floors: {
        type: DataTypes.FLOAT,
      },
      bedrooms: {
        type: DataTypes.INTEGER,
      },
    });
  
    return Client;
  };
  