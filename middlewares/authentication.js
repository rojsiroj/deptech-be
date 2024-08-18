const { User } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, _, next) => {
  try {
    if (!req.headers.authorization) throw { name: "Token not found" };

    let [type, token] = req.headers.authorization.split(" ");
    if (type !== "Bearer") throw { name: "Token must Bearer type" };

    let payload = jwt.verify(token, "secretKey");
    if (!payload) throw { name: "Invalid token" };

    let user = await User.findByPk(payload.id);
    if (!user) throw { name: "User in token not found" };
    req.user = {
      userId: user.id,
    };

    next();
  } catch (error) {
    next(error);
  }
};
