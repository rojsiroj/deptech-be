const fs = require("fs");
const { Product } = require("../models");
const messages = require("../utils/lang/messages");

const create = async (req, res, next) => {
  // #swagger.tags = ['Product']
  try {
    const { name, description, product_category, stock } = req.body;

    const data = {
      name,
      description,
      product_category,
      stock,
    };

    Product.create(data)
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

const upload = async (req, res, next) => {
  // #swagger.tags = ['Product']
  /*
      #swagger.consumes = ['multipart/form-data']
      #swagger.parameters['file'] = {
          in: 'formData',
          type: 'file',
          required: false,
          description: 'Image',
      }
  */
  try {
    if (!req.file) {
      return res
        .status(messages.response.c400.code)
        .json({ error: "No image uploaded" });
    }

    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (product === null) {
      return res.status(messages.response.c404.code).json({
        message: messages.response.c404.message,
        data: product,
      });
    }

    const data = {
      image: "uploads/" + req.file.filename,
    };

    product
      .update(data)
      .then((data) => {
        res.status(messages.response.c200.code).json({
          message: messages.response.c200.message,
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
  // #swagger.tags = ['Product']
  try {
    const result = await Product.findAndCountAll();
    res.status(messages.response.c200.code).json({
      message: messages.response.c200.message,
      data: { count: result.count, data: result.rows },
    });
  } catch (error) {
    next(error);
  }
};

const detail = async (req, res, next) => {
  // #swagger.tags = ['Product']
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (product === null) {
      return res.status(messages.response.c404.code).json({
        message: messages.response.c404.message,
        data: product,
      });
    }

    res.status(messages.response.c200.code).json({
      message: messages.response.c200.message,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  // #swagger.tags = ['Product']
  try {
    const { id } = req.params;
    const { name, description, product_category, stock } = req.body;

    const product = await Product.findByPk(id);
    if (product === null) {
      return res.status(messages.response.c404.code).json({
        message: messages.response.c404.message,
        data: product,
      });
    }

    product
      .update({
        name,
        description,
        product_category,
        stock,
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

const destroy = async (req, res, next) => {
  // #swagger.tags = ['Product']
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (product === null) {
      return res.status(messages.response.c404.code).json({
        message: messages.response.c404.message,
        data: product,
      });
    }

    product
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
  upload,
  list,
  detail,
  update,
  destroy,
};
