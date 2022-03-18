const CaverExtKAS = require('caver-js-ext-kas');
const caver = new CaverExtKAS();
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
        
            const result = [];

            for(let i=0; i<KIP17.items.length; i++) {

                //contractaddress와 tokenid로 해당컨트랙트의 토큰정보를 뽑아온다. 물론 여기에는 image를 담당하는 tokenuri도 포함된다.
                let nft = await caver.kas.tokenHistory.getNFT(KIP17.items[i].contract.address, KIP17.items[i].tokenId)
                
                //이 중에서 owner = EOA인 정보만 추려낸다.(본인소유의 토큰만 보여주기 위함)
                //getNFT함수의 결과값에는 contractaddress정보가없다. 
                //따라서 contractaddress정보는 getTransferHistoryByAccount함수에서 뽑아낸걸 그대로 사용해서 결과값에 이어붙여준다.
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