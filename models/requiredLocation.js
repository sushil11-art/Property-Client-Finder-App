module.exports = (sequelize, DataTypes) => {
    const RequiredLocation = sequelize.define("requiredlocation", {
      province: {
        type: DataTypes.INTEGER
      },
      district: {
        type: DataTypes.STRING
      },
      municipality:{
        type: DataTypes.STRING
      },
      ward:{
          type:DataTypes.INTEGER
      },
      street:{
          type:DataTypes.STRING
      },
      // geoLocation:{
      //   type:DataTypes.GEOMETRY('POINT')
      // },
      latitude:{
            type:DataTypes.DOUBLE
      },
      longitude:{
          type:DataTypes.DOUBLE
      }
    });
  
    return RequiredLocation;
  };