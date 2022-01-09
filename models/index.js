const Sequelize = require("sequelize");
let dbConfig = require("../config/config");

const { database, username, password, host ,dialect} =
  process.env.NODE_ENV === "development"
    ? dbConfig.development
    : dbConfig.production;

const sequelize = new Sequelize(
  database,
  username,
  password,
  {
    dialect: dialect,
    host: host,
    logging: false,
  }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.tutorials = require("./tutorial")(sequelize, Sequelize);

db.Broker = require("./broker")(sequelize, Sequelize);
db.Client = require("./client")(sequelize, Sequelize);
db.Land = require("./land")(sequelize, Sequelize);
db.Home = require("./home")(sequelize, Sequelize);
db.Location = require("./propertyLocation")(sequelize, Sequelize);
db.Property = require("./property")(sequelize, Sequelize);
db.RequriedLocation = require("./requiredLocation")(sequelize, Sequelize);
// db.Image = require("./image")(sequelize, Sequelize);

db.Property.belongsTo(db.Land, {
  foreignKey: "landId",
  as: "land",
});
db.Property.belongsTo(db.Home, {
  foreignKey: "homeId",
  as: "home",
});

db.Broker.hasMany(db.Property, { as: "properties" });

db.Property.belongsTo(db.Broker, {
  foreignKey: "brokerId",
  as: "broker",
});
db.Property.belongsTo(db.Location, {
  foreignKey: "locationId",
  as: "location",
});
db.Broker.hasMany(db.Client, { as: "clients" });

db.Client.belongsTo(db.Broker, {
  foreignKey: "brokerId",
  as: "broker",
});

db.Client.belongsTo(db.RequriedLocation, {
  foreignKey: "requiredlocationId",
  as: "requiredlocation",
});

// db.Property.hasMany(db.Image, { as: "images" });

// db.Image.belongsToMany(db.Property, {
//   through: "ImageProperty",
//   as: "property",
//   foreignKey: "propertyId",
// });

module.exports = db;
