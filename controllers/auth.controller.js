require("dotenv").config();

const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    if (!email) {
      throw { name: "Email is required" };
    }

    if (!password) throw { name: "Password is required" };

    let user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) throw { name: "Invalid credencial" };

    bcrypt.compare(password, user.password, (err, data) => {
      try {
        if (err) throw { name: "Invalid credencial" };

        if (data) {
          let access_token = jwt.sign({ id: user.id }, "secretKey", {
            expiresIn: "1h",
          });
          return res.status(200).json({
            message: "Successfully logged in",
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
