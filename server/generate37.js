const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/') // Replace EN url
require('dotenv').config();


  const privateKey  = process.env.PRIVATE_KEY;
  const keyring = caver.wallet.add(caver.wallet.keyring.createFromPrivateKey(privateKey)) // Replace private key
  
  //KIP37계약 네트워크에 디플로이
  const tokenURI = 'ipfs://QmTTKKNdP8XG6VBwCwboxuEqw7tRjNH5BQmGa4GgWtGn7E/{id}.json'
  const deployKIP37 = async() => {
   try{
     const kip37 = await caver.kct.kip37.deploy({ uri: tokenURI }, keyring.address)
     console.log(kip37);

    //  console.log(kip37.options.address)
    //  const kip37 = await new caver.kct.kip37(tokenAddress);
    //  const maxTokenId = 6;
    //  const initialSupply = 15;
  
    //   for(let i = 1; i< maxTokenId; i++) {
    //     const created = await kip37.create(i, initialSupply, { from: keyring.address })
    //     console.log(created)
    //   }
  
   }
   catch (err) {
    throw(err)
    }
  }

  //deploy이후 나온 contractAddress를 밑의 주소로 설정.
const tokenAddress = "0x1f94a9f772a48115405eac32bb916b1ac1e66f4c";

//디플로이된 KIP37에 토큰 만들기
const createKIP37 = async () => {
     const kip37 = await new caver.kct.kip37(tokenAddress);
     const maxTokenId = 6;
     const initialSupply = 15;
  
      for(let i = 0; i< maxTokenId; i++) {
        const created = await kip37.create(i, initialSupply, { from: keyring.address })
        console.log(created)
      }
}

//KIP37토큰의 권한 위임
  const setRandomBox = async(auctionAddress) => {
    try{
    const kip37 = await new caver.kct.kip37(tokenAddress);
    const setApproved = await kip37.setApprovalForAll(auctionAddress, true, { from: keyring.address })
    // const batchTransfer = await kip37.safeBatchTransferFrom(auctionAddress)
    console.log(setApproved)
    }
    catch (err) {
      throw(err);
    }
  }

 

  //토큰 발행시 이부분의 주석을 해제[1]
  // deployKIP37();

  // createKIP37();[2]

  //랜덤박스로 토큰의 권한을 넘길떄 실행[3]
  setRandomBox("0x871a107594590d8327Ddb4A300943a37a54D51c4");
