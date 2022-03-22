// const caver = require('caver-js');
// const axios = require('axios');
// require('dotenv').config();

module.exports = {
    get: async(req,res) => {
        const data =  [
            {id:0, title: "다문화이웃을 도웁시다",group:"다문화가정도우미",dday: 49,amount: '0' },
            {id:1, title: "산불 재난 극복",group:"한국산림연구원",dday: 29, amount: '131,511,000' },
            {id:2, title: "우크라이나 전쟁피해",group:"유니세프",dday: 10, amount: '12,223,000' },
            {id:3, title: "반려견을 돌봐줘요",group:"애견사랑카페",dday: 40, amount: '12,311,000'},
          ]
        res.status(200).json(data);
    },
    
}