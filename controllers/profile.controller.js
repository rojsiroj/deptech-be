const { User } = require("../models");
const messages = require("../utils/lang/messages");

const detail = async (req, res, next) => {
  // #swagger.tags = ['Profile']
  try {
    const { userId } = req.user;

    const user = await User.findByPk(userId);
    if (user === null) {
      return res.status(messages.response.c404.code).json({
        message: messages.response.c404.message,
        data: user,
      });
    }

    res.status(messages.response.c200.code).json({
      message: messages.response.c200.message,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  // #swagger.tags = ['Profile']
  try {
    const { userId } = req.user;

    const { first_name, last_name, email, dob, gender } = req.body;

    const user = await User.findByPk(userId);
    if (user === null) {
      return res.status(messages.response.c404.code).json({
        message: messages.response.c404.message,
        data: user,
      });
    }

    user
      .update({
        first_name,
        last_name,
        email,
        dob,
        gender,
        updatedAt: new Date(),
      })
      .then((data) => {
        return res.status(messages.response.c200.code).json({
          message: messages.response.c200.message,
          data,
        });
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  detail,
  update,
};
