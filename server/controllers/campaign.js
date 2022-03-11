// const caver = require('caver-js');
// const axios = require('axios');
// require('dotenv').config();

module.exports = {
//     post: async (req,res) => {
//         const to = env.process.REDCHAIN_WALLET; //레드체인 지갑(확인용/ 추후 db에서 조회해서 단체의 지갑을 가져올 예정)
//         const {from,amount} = req.body;
//         const peb = caver.utils.convertToPeb(amount, 'KLAY'); //amount는 string 클레이를 10의 18승 number로바꿔준다.
//         const hexpeb = caver.utils.numberTohex(peb) // 10의18승으로 바뀐 펩을 16진수로 바꿔준다.
//         const options = {
//             method: 'POST',
//             url: 'http://wallet.api.klaytnapi.com/v2/tx/fd/value',
//             headers: {
//               'x-chain-id': process.env.XCHAIN_ID,
//               Authrization: process.env.Authrization,
//               'Content-Type': 'application/json'
//             },
//             body: {
//                 from,
//                 to,
//                 submit: true,
//             },
//             json: true,
//         }
        
//         const result = await this.call(options);

//           if(result.transactionHash) {
//               res.status(200).json(result.transactionHash);
//           }
//           else {
//              res.status(500).json("fail");
//           }
//     },
    get: async(req,res) => {
        
    }
}