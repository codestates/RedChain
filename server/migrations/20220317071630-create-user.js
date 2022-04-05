'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     
      name: {
        type: Sequelize.STRING
      },
      account: {
        type: Sequelize.STRING
      },
      about: Sequelize.STRING,
      amount: {                  //기부 금액
        type:Sequelize.INTEGER,
        defaultValue: 0,
      },
      countDonation: {
        type: Sequelize.INTEGER,
        defaultValue:0,
      },
      profileImg: Sequelize.STRING//이미지파일
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};