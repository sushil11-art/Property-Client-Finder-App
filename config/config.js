// const username = process.env.USER_NAME;
// const password = process.env.PASSWORD;
// const database = process.env.DATABASE;
// const host = process.env.HOST;
// const dialect = "mysql";
// const dbConfig = {
//             username,
//             password,
//             database,
//             host,
//             dialect
// };

// module.exports = dbConfig;


require("dotenv").config();
module.exports = {
  development: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: 3306,
    dialect: process.env.DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: 3306,
    dialect: process.env.DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: 3306,
    dialect: process.env.DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
      // ssl: {
      //   ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
      // }
    },
  },
};