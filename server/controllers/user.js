require('dotenv').config();


module.exports = {
    get: async(req,res) => {
        // const chainId = process.env.XCHAIN_ID;
        // const accessKey = process.env.KAS_ACCESS_KEY;
        // const secretKey = process.env.KAS_SECRET_KEY;
        
        // const caver = new CaverExtKAS(chainId,accessKey,secretKey);
        // const result = await caver.kas.kip17.getContractList();
        
        console.log(result);
        res.status(200).json(result);
        },
    post : (req,res) => {

        },
}
 