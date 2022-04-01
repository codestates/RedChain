'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('seals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tokenAddress: {                    //토큰주소
        type: Sequelize.STRING
      },
      tokenId: {                    //토큰id
        type: Sequelize.INTEGER
      },
      tokenURI: {
        type: Sequelize.STRING          //토큰 URI
      },
      amount: {                         //토큰 잔액
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER        // 토큰 가격
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('seals');
  }
};