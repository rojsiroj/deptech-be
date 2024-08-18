"use strict";
const uuid = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("ProductCategories", [
      {
        id: uuid.v4(),
        name: "Product Category 1",
        description: "Product Category 1 Description",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid.v4(),
        name: "Product Category 2",
        description: "Product Category 2 Description",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("ProductCategories", null, {});
  },
};
