module.exports = (sequelize, DataTypes) => {
    const Broker = sequelize.define("broker", {
      username: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password:{
        type: DataTypes.STRING
      },
      imageUrl:{
          type:DataTypes.STRING
      }
    });
  
    return Broker;
  };

