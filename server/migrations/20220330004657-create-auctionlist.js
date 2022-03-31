'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('auctionlists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contributor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
      tokenAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tokenId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tokenURI: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      auctionAddress: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      startAt: {
        type: Sequelize.STRING
      },
      endAt: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('auctionlists');
  }
};