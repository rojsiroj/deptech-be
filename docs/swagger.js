/* Swagger configuration */
require("dotenv").config();

const config = require("../config/cloud.config");
const swaggerAutogen = require("swagger-autogen")();
const messages = require("../utils/lang/messages");

const doc = {
  info: {
    version: "2.0.0",
    title: "Deptech Developer Test API",
    description: "Deptech Developer Test API",
    contact: {
      name: "Muhamad Sirojudin",
      email: "sirojudin.dev@gmail.com",
    },
  },
  host: config.swagger.host,
  basePath: "/",
  schemes: config.swagger.protocol,
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [],
  securityDefinitions: {},
  definitions: {
    helathResponse: {
      code: messages.response.c200.code,
      message: messages.response.c200.message,
    },
    "errorResponse.400": {
      code: messages.response.c400.code,
      message: messages.response.c400.message,
    },
    "errorResponse.403": {
      code: messages.response.c403.code,
      message: messages.response.c403.message,
    },
    "errorResponse.404": {
      code: messages.response.c404.code,
      message: messages.response.c404.message,
    },
    "errorResponse.500": {
      code: messages.response.c500.code,
      message: messages.response.c500.message,
    },
  },
};

const outputFile = "./docs/swagger.json";
const endpointsFiles = ["../app.js", "../controllers/*.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
