const CaverExtKAS = require('caver-js-ext-kas');
const caver = new CaverExtKAS();
const {filteringCA} = require('../functions/index');

require('dotenv').config();
caver.initKASAPI(
    1001,
    process.env.KAS_ACCESS_KEY,
    process.env.KAS_SECRET_KEY,
  );

module.exports = {
    //KIP17토큰 목록 조회
    get: async(req,res) => {
        const {account} = req.params;
        const lowcaseAC = account.toLowerCase();
        const query = {
            kind: [caver.kas.tokenHistory.queryOptions.kind.NFT],
            size: 1000,
        }
        //EOA기준으로 보유한 NFT들의 contractaddress와 tokenId를 뽑아내서
        const KIP17 = await caver.kas.tokenHistory.getTransferHistoryByAccount(lowcaseAC, query);
        
        if(KIP17.items.length === 0 ) {
            res.status(404).json(`You don't Have any NFT`);
        } else {
            const filteredData = filteringCA(KIP17.items)
            const result = [];

            for(let i = 0; i < filteredData.length; i++) {
                let nft = await caver.kas.tokenHistory.getNFT(filteredData[i].contractaddress, filteredData[i].tokenId)
                if(nft.owner === lowcaseAC) {
                    nft.contractAddress = KIP17.items[i].contract.address;
                    result.push(nft);
                }
            }   
        
            res.status(200).json(result);
        }
    },
    //KIP17토큰 transfer
    post : (req,res) => {
        
    },
}
