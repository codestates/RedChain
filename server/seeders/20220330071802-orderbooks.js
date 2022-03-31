'use strict';
const {addDays} = require('../functions/index');
const date = new Date();

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('orderbooks', [{
      id: 1,
      auctionId: 1,
      bidder: "0x3d7a899250aDBaA826A45603da5240f1ca12C88F",
      bid: 1,
      createdAt: addDays(date,0)
    },
    {
      id: 2,
      auctionId: 1,
      bidder: "0xB76417Fe5F4Dbe4206a85ca09070947c3ee9D079",
      bid: 2,
      createdAt: addDays(date,1)
    },
  ])
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
