require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config/cloud.config");

// Routers
const userRoute = require("./routes/user.route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

app.use("/api/user", userRoute);

app.listen(config.port, () =>
  console.log(`App listening on port ${config.host}:${config.port}`)
);
