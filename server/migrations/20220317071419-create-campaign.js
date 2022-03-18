'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('campaigns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.INTEGER
      },
      endtime: {
        type: Sequelize.DATE
      },
      goal: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('campaigns');
  }
};