const { User } = require("../models");
const messages = require("../utils/lang/messages");

const list = async (_, res) => {
  // #swagger.tags = ['Profile']

  try {
    const result = await User.findAndCountAll();
    res.json(result).status(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  list,
};
