const Caver = require('caver-js');
const caver = new Caver('https://api.baobab.klaytn.net:8651/');
require('dotenv').config();
const {seal,sealhisotry, user,sequelize} = require('../models');


const PRIVATE_KEY = process.env.PRIVATE_KEY;
const KIP37_ADDRESS = process.env.KIP37_ADDRESS;
const keyring = caver.wallet.add(caver.wallet.keyring.createFromPrivateKey(PRIVATE_KEY));

module.exports = {
    //씰 세부페이지 orderbook처럼 누가 구매했는지 id별로
    get: async(req,res) => {
        await seal.sum('amount')
        .then(async(data)=> {
            res.status(200).json(data)
        })
        .catch(err => console.log(err));
    },
    post : async(req,res) => {
        const {tokenId, account} = req.body;
        //트랜잭션해쉬 검증
        const sealId = await sequelize.query(`
                        SELECT id FROM seals
                        WHERE tokenId = ${tokenId}
                        `)
        const kip37 = await new caver.kct.kip37(KIP37_ADDRESS);
        await kip37.safeTransferFrom(keyring.address, account, tokenId, 1, { from: keyring.address })
        .then(async(tx) => {
            console.log(tx);
            await sequelize.query(
                `UPDATE seals SET amount = amount-1
                 WHERE tokenId = ${tokenId}`
            ).then(async() => {
                await sealhisotry.create({
                    sealId,
                    buyer:account,
                }).then(() => res.status(200).json("OK"))
                 .catch(err =>console.log(err))
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }
}
   