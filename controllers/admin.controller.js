const saltRounds = 10;
const bcrypt = require("bcrypt");
const { User } = require("../models");
const messages = require("../utils/lang/messages");

const create = async (req, res) => {
  // #swagger.tags = ['Admin']
  try {
    const { first_name, last_name, email, dob, password, gender } = req.body;

    const data = { first_name, last_name, email, dob, gender };

    bcrypt
      .hash(password, saltRounds)
      .then(async (hash) => {
        data.password = hash;

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
    const user = await User.findByPk(id);
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

const update = async (req, res) => {
  // #swagger.tags = ['Admin']
  try {
    const { id } = req.params;
    const { first_name, last_name, email, dob, gender } = req.body;

    const user = await User.findByPk(id);
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

const destroy = async (req, res) => {
  // #swagger.tags = ['Admin']
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (user === null) {
      return res.status(messages.response.c404.code).json({
        message: messages.response.c404.message,
        data: user,
      });
    }

    user
      .destroy()
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
  create,
  list,
  detail,
  update,
  destroy,
};
