const { Transaction, Product, ProductTransaction } = require("../models");
const messages = require("../utils/lang/messages");

const create = (req, res, next) => {
  // #swagger.tags = ['Transaction']
  try {
    let { type, products } = req.body;

    if (products.length === 0) {
      throw { name: "products is required" };
    }

    const productDatas = [];

    products.forEach((product) => {
      if (product.hasOwnProperty("id")) {
        Product.findByPk(product.id)
          .then((productData) => {
            if (!productData) {
              throw { name: `Product with id=${product.id} not found` };
            }
            productDatas.push(productData);
            if (product.hasOwnProperty("quantity")) {
              if (type === "out" && productData.stock < product.quantity) {
                throw {
                  name: `Product with id=${product.id} stock not enough. quantity must be less than ${productData.stock}`,
                };
              }
            } else {
              throw {
                name: `products must have quantity`,
              };
            }
          })
          .catch((error) => {
            next(error);
          });
      } else {
        throw {
          name: `products must have id`,
        };
      }
    });

    const data = {
      type,
    };

    Transaction.create(data)
      .then((data) => {
        let promises = [];

        products.forEach((product) => {
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
            products.forEach((product) => {
              Product.findByPk(product.id)
                .then((productData) => {
                  if (type === "out") {
                    productData.stock = productData.stock - product.quantity;
                  } else {
                    productData.stock = productData.stock + product.quantity;
                  }
                  productData.save();
                })
                .catch((error) => {
                  next(error);
                });
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
