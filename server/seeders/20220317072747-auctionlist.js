'use strict';
const {addDays} = require('../functions/index');
const date = new Date();

module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('auctionlists', [{
      id: 1,
      contributor: "0x3d7a899250aDBaA826A45603da5240f1ca12C88F",
      tokenAddress: "0x2998EA321237E2686e1c41Be5389Ec8e35d5DF60",
      tokenId: 1,
      tokenUri: "ipfs://QmbneexiKN6zWVrrr7RH8a4ysondUbQV5HTdx1DCyGcdHR",
      auctionAddress: "0xC50F03f3fcfAAe01693aD4718757C9d97EC69627",
      startAt: addDays(date,0),
      endAt: addDays(date,3),
      status: true,
    }])
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
