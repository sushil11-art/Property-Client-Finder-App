const swaggerAutogen = require("swagger-autogen")();

const docs = {
  info: {
    title: "API",
    version: "1.0.0",
    description: "Property Client Finder API",
  },

  host: "localhost:3005",
  basePath: "/api/v1",
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "authorization",
      scheme: "bearer",
      in: "header",
    },
  },
  security: [{ Bearer: [] }],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, docs);