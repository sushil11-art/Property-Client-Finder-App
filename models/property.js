
module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define("property", {
      // O property not sold
      // 1 property sold  
      sellStatus:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
      },
      images:{
        type:DataTypes.TEXT
      }
      
    });
  
    return Property;
  };