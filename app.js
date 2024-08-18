require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config/cloud.config");
const errorHandler = require("./handlers/error.handler");
const { basicAuth } = require("./middlewares/basic-auth");

// Routers
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const healthRoute = require("./routes/health.route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

app.use("/api/health", healthRoute);
app.use(
  "/api/docs",
  basicAuth,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use(errorHandler);
app.use("/", (_, res) => {
  // #swagger.ignore = true
  res.json({
    message: "Welcome to Deptech Developer Test API",
  });
});

app.listen(config.port, () =>
  console.log(`App listening on port ${config.host}:${config.port}`)
);
