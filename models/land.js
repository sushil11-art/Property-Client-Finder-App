module.exports = (sequelize, DataTypes) => {
    const Land = sequelize.define("land", {
      price: {
        type: DataTypes.DOUBLE
      },
      landArea: {
        type: DataTypes.FLOAT
      },
      roadAccess:{
        type: DataTypes.STRING
      },
      waterSupply:{
          type:DataTypes.STRING
      },
      // imageUrl:{
      //     type:DataTypes.STRING
      // }
    });
  
    return Land;
  };