const { ProductCategory } = require("../models");
const messages = require("../utils/lang/messages");

const create = async (req, res, next) => {
  // #swagger.tags = ['Product Categories']
  try {
    const { name, description } = req.body;

    const data = { name, description };

    ProductCategory.create(data)
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
    next(error);
  }
};

const list = async (_, res, next) => {
  // #swagger.tags = ['Product Categories']
  try {
    const result = await ProductCategory.findAndCountAll();
    res.status(messages.response.c200.code).json({
      message: messages.response.c200.message,
      data: { count: result.count, data: result.rows },
    });
  } catch (error) {
    next(error);
  }
};

const detail = async (req, res, next) => {
  // #swagger.tags = ['Product Categories']
  try {
    const { id } = req.params;
    const productCategory = await ProductCategory.findByPk(id);
    if (productCategory === null) {
      return res.status(messages.response.c404.code).json({
        message: messages.response.c404.message,
        data: productCategory,
      });
    }

    res.status(messages.response.c200.code).json({
      message: messages.response.c200.message,
      data: productCategory,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  // #swagger.tags = ['Product Categories']
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const productCategory = await ProductCategory.findByPk(id);
    if (productCategory === null) {
      return res.status(messages.response.c404.code).json({
        message: messages.response.c404.message,
        data: productCategory,
      });
    }

    productCategory
      .update({ name, description, updatedAt: new Date() })
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

const destroy = async (req, res, next) => {
  // #swagger.tags = ['Product Categories']
  try {
    const { id } = req.params;

    const productCategory = await ProductCategory.findByPk(id);
    if (productCategory === null) {
      return res.status(messages.response.c404.code).json({
        message: messages.response.c404.message,
        data: productCategory,
      });
    }

    productCategory
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
