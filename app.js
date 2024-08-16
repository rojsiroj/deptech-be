require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config/cloud.config");

// Routers
const userRoute = require("./routes/user.route");
const healthRoute = require("./routes/health.route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

app.use("/api/user", userRoute);
app.use("/api/health", healthRoute);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(config.port, () =>
  console.log(`App listening on port ${config.host}:${config.port}`)
);
