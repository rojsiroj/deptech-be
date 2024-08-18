const { User } = require("../models");
const messages = require("../utils/lang/messages");

const create = async (req, res) => {
  // #swagger.tags = ['Admin']
  try {
    const { description } = req.body;

    const data = {
      status: "OPEN",
      description,
    };

    User.create(data)
      .then((data) => {
        res.status(messages.response.c201.code).json({
          message: messages.response.c201.message,
          data: data,
        });
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    res.json(error).status(422);
  }
};

const list = async (_, res) => {
  // #swagger.tags = ['Admin']
  try {
    const result = await User.findAndCountAll();
    res.status(messages.response.c200.code).json({
      message: messages.response.c200.message,
      data: { count: result.count, data: result.rows },
    });
  } catch (error) {
    next(error);
  }
};

const detail = async (req, res) => {
  // #swagger.tags = ['Admin']
  try {
    const { id } = req.params;
    const data = await User.findByPk(id);
    if (data === null) {
      return res.status(messages.response.c404.code).json({
        message: messages.response.c404.message,
        data,
      });
    }

    res.status(messages.response.c200.code).json({
      message: messages.response.c200.message,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  list,
  detail,
};
