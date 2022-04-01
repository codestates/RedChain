const Caver = require('caver-js');
const caver = new Caver('https://api.baobab.klaytn.net:8651/');
require('dotenv').config();
const {seal,user,sequelize} = require('../models');


const PRIVATE_KEY = process.env.PRIVATE_KEY;
const KIP37_ADDRESS = process.env.KIP37_ADDRESS;
const keyring = caver.wallet.add(caver.wallet.keyring.createFromPrivateKey(PRIVATE_KEY));

module.exports = {
    get: async(req,res) => {
    //    await sequelize.query(
    //         `SELECT price, amount
    //          FROM seals
    //          WHERE tokenId = ${req.params.id} 
    //          `
    //     ).then((data) => res.status(200).json(data))
    //     .catch(err => console.log(err));
    },
    post : async(req,res) => {
        const {tokenId} = req.body;
        //트랜잭션해쉬 검증
        
        const kip37 = await new caver.kct.kip37(KIP37_ADDRESS);
        await kip37.safeTransferFrom(keyring.address, account, tokenId, 1, { from: keyring.address })
        .then(async() => {
            const [results, metadata] = await sequelize.query(
                `UPDATE seals SET amount = amount-1
                 WHERE tokenId = ${tokenId}`
            ).then(() => res.status(200).json("OK")).catch(err => console.log(err));
        }).catch(err => console.log(err));
        // db에 총 갯수 -1;
    }
}
   