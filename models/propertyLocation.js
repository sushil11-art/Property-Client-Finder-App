module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define("location", {
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
      //   type:DataTypes.GEOMETRY
      // },
      latitude:{
            type:DataTypes.DOUBLE
      },
      longitude:{
          type:DataTypes.DOUBLE
      }
    });
  
    return Location;
  };