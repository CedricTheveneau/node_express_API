"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstname: "John",
          lastname: "Doe",
          email: "john.doe@mail.com",
          password: bcrypt.hashSync("123456", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstname: "Jane",
          lastname: "Doe",
          email: "jane.doe@mail.com",
          password: bcrypt.hashSync("987654", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
