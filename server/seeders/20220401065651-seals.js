'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('seals', [{
      id: 0,
      tokenAddress: "0x1f94a9f772a48115405eac32bb916b1ac1e66f4c",
      tokenId: 0,
      tokenURI: 'ipfs://QmTTKKNdP8XG6VBwCwboxuEqw7tRjNH5BQmGa4GgWtGn7E/0.json',
      amount: 15,
      price: 1,
    },
    {
      id: 1,
      tokenAddress: "0x1f94a9f772a48115405eac32bb916b1ac1e66f4c",
      tokenId: 1,
      tokenURI: 'ipfs://QmTTKKNdP8XG6VBwCwboxuEqw7tRjNH5BQmGa4GgWtGn7E/1.json',
      amount: 15,
      price: 1,
    },
    {
      id: 2,
      tokenAddress: "0x1f94a9f772a48115405eac32bb916b1ac1e66f4c",
      tokenId: 2,
      tokenURI: 'ipfs://QmTTKKNdP8XG6VBwCwboxuEqw7tRjNH5BQmGa4GgWtGn7E/2.json',
      amount: 15,
      price: 1,
    },
    {
      id: 3,
      tokenAddress: "0x1f94a9f772a48115405eac32bb916b1ac1e66f4c",
      tokenId: 3,
      tokenURI:'ipfs://QmTTKKNdP8XG6VBwCwboxuEqw7tRjNH5BQmGa4GgWtGn7E/3.json',
      amount: 14,
      price: 1,
    },
    {
      id: 4,
      tokenAddress: "0x1f94a9f772a48115405eac32bb916b1ac1e66f4c",
      tokenId: 4,
      tokenURI: 'ipfs://QmTTKKNdP8XG6VBwCwboxuEqw7tRjNH5BQmGa4GgWtGn7E/4.json',
      amount: 15,
      price: 1,
    },
    {
      id: 5,
      tokenAddress: "0x1f94a9f772a48115405eac32bb916b1ac1e66f4c",
      tokenId: 5,
      tokenURI: 'ipfs://QmTTKKNdP8XG6VBwCwboxuEqw7tRjNH5BQmGa4GgWtGn7E/5.json',
      amount: 15,
      price: 1,
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
