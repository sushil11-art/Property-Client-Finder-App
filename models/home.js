module.exports = (sequelize, DataTypes) => {
    const Home = sequelize.define("home", {
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
      //     type:DataTypes.STRINGs
      // },
      kitchens:{
            type:DataTypes.INTEGER
      },
      bathrooms:{
          type:DataTypes.INTEGER
      },
      floors:{
          type:DataTypes.FLOAT
      },
      bedrooms:{
          type:DataTypes.INTEGER
      }
    });
  
    return Home;
  };
