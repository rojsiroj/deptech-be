const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const messages = require("../utils/lang/messages");

exports.login = async (req, res, next) => {
  // #swagger.tags = ['Auth']
  try {
    const { email, password } = req.body;
    if (!email) {
      throw { name: "Email is required" };
    }

    if (!password) throw { name: "Password is required" };

    const user = await User.scope("withPassword").findOne({
      where: {
        email,
      },
    });
    if (!user) throw { name: "Invalid credencial" };

    bcrypt.compare(password, user.password, (err, data) => {
      try {
        if (err) throw { name: "Invalid credencial" };

        if (data) {
          const access_token = jwt.sign({ id: user.id }, "secretKey", {
            expiresIn: "1h",
          });
          return res.status(messages.response.c200.code).json({
            message: messages.response.c200.message,
            data: { access_token },
          });
        } else {
          throw { name: "Invalid credencial" };
        }
      } catch (error) {
        next(error);
      }
    });
    return;
  } catch (error) {
    next(error);
  }
};
