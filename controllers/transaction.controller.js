const { Transaction, Product, ProductTransaction } = require("../models");
const messages = require("../utils/lang/messages");

const create = async (req, res, next) => {
  // #swagger.tags = ['Transaction']
  try {
    let { type, products } = req.body;

    if (products.length === 0) {
      return res.status(messages.response.c400.code).json({
        message: "products is required",
        data: null,
      });
    }

    const productDatas = [];

    products.forEach(async (product) => {
      if (product.hasOwnProperty("id")) {
        const productData = await Product.findByPk(product.id);
        if (!productData) {
          return res.status(messages.response.c404.code).json({
            message: `Product with id=${product.id} not found`,
            data: null,
          });
        }
        productDatas.push(productData);

        if (product.hasOwnProperty("quantity")) {
          if (type === "out" && productData.stock < product.quantity) {
            return res.status(messages.response.c400.code).json({
              message: `Product with id=${product.id} stock not enough. quantity must be less than ${productData.stock}`,
              data: null,
            });
          }
        } else {
          return res.status(messages.response.c400.code).json({
            message: "products must have quantity",
            data: null,
          });
        }
      } else {
        return res.status(messages.response.c400.code).json({
          message: "products must have id",
          data: null,
        });
      }
    });

    const data = {
      type,
    };

    Transaction.create(data)
      .then(async (data) => {
        let promises = [];

        products.forEach(async (product) => {
          promises.push(
            ProductTransaction.create({
              product: product.id,
              transaction: data.id,
              quantity: product.quantity,
            })
          );
        });

        Promise.all(promises)
          .then((data) => {
            products.forEach(async (product) => {
              const productData = await Product.findByPk(product.id);
              if (type === "out") {
                productData.stock = productData.stock - product.quantity;
              } else {
                productData.stock = productData.stock + product.quantity;
              }
              productData.save();
            });

            return res.status(messages.response.c201.code).json({
              message: messages.response.c201.message,
              data,
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
    next(error);
  }
};

const list = async (req, res, next) => {
  // #swagger.tags = ['Transaction']
  /*
    #swagger.parameters['transactionId'] = {
      in: 'query',
      description: 'Filter by Transaction Id',
      type: 'string'
    }
    #swagger.parameters['productId'] = {
      in: 'query',
      description: 'Filter by Product Id',
      type: 'string'
    }
  */
  try {
    const { transactionId, productId } = req.query;

    let where = {};

    if (transactionId !== "" && transactionId !== undefined) {
      const transactionData = await Transaction.findByPk(transactionId);
      if (!transactionData) {
        return res.status(messages.response.c404.code).json({
          message: `Transaction with id=${transactionId} not found`,
          data: null,
        });
      }

      where.transaction = transactionId;
    }

    if (productId !== "" && productId !== undefined) {
      const productData = await Product.findByPk(productId);
      if (!productData) {
        return res.status(messages.response.c404.code).json({
          message: `Product with id=${productId} not found`,
          data: null,
        });
      }

      where.product = productId;
    }

    console.log(where);

    const result = await ProductTransaction.findAndCountAll({ where });
    res.status(messages.response.c200.code).json({
      message: messages.response.c200.message,
      data: { count: result.count, data: result.rows },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  list,
};
