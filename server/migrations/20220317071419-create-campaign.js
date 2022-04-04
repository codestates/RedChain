'use strict';

const { sequelize } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('campaigns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type:Sequelize.STRING,
      },
      contract: {
        type: Sequelize.STRING,
      },
      goal: {
        type: Sequelize.INTEGER
      },
      organization: Sequelize.STRING,  //지갑주소
      endAt: {
        type: Sequelize.STRING
      },
      goal: {
        type: Sequelize.INTEGER
      },
      amount: {                  //현재 모금액
        type:Sequelize.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('campaigns');
  }
};