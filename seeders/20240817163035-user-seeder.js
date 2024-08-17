"use strict";
const uuid = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Users", [
      {
        id: uuid.v4(),
        email: "admin@example.com",
        password:
          "$2b$10$RppJC4f4m.g6IhEw9bGgvOnr5xPfipnjBiqF384df2DwgRLw9G7MO",
        first_name: "Moch",
        last_name: "Siroj",
        gender: "male",
        dob: "1999-01-01",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid.v4(),
        email: "admin2@example.com",
        password:
          "$2b$10$RppJC4f4m.g6IhEw9bGgvOnr5xPfipnjBiqF384df2DwgRLw9G7MO",
        first_name: "Izz",
        last_name: "Luthfi",
        gender: "male",
        dob: "2000-11-01",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
