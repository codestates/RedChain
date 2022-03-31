'use strict';
const {addDays} = require('../functions/index');
const date = new Date();

module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('auctionlists', [{
      id: 1,
      contributor: "0xB76417Fe5F4Dbe4206a85ca09070947c3ee9D079",
      tokenAddress: "0x7D553c88B422F0f7645dED4262C7DEeEa4eC2c14",
      tokenId: 1,
      tokenUri: "ipfs://QmTUNoQdbjTckufDNcx1Mpsq9UbtbZgh5UGztZvpfhmpVF",
      auctionAddress: "0x04910E1a8AbdC56d419E26b564D94326DcE6e586",
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
