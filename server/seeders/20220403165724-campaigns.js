'use strict';
const {addDays} = require('../functions/index');
const date = new Date();

module.exports = {
  async up (queryInterface, Sequelize) {

      return queryInterface.bulkInsert('campaigns', [{
        id: 0,
        title: "다문화 이웃을 도와주세요",
        contract: "컨트랙주소",
        organization: "지갑주소",
        goal: 5000,
        amount: 0,
        endAt: addDays(date,30),
        status:true,
      },
    {
      id: 1,
      title: "산불 재난 극복 ",
      contract: "컨트랙주소",
      organization: "지갑주소",
      goal: 2000,
      amount: 0,
      endAt: addDays(date,30),
      status:true,
    },
    {
      id: 2,
      title: "우크라이나 전쟁 피해 ",
      contract: "컨트랙주소",
      organization: "지갑주소",
      goal: 3000,
      amount: 0,
      endAt: addDays(date,30),
      status:true,
    },
      {
        id: 3,
        title: "반려견을 돌봐 주세요 ",
        contract: "컨트랙주소",
        organization: "지갑주소",
        goal: 1000,
        amount: 0,
        endAt: addDays(date,30),
        status:true,
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
