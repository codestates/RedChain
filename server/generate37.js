const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/') // Replace EN url
require('dotenv').config();


  const privateKey  = process.env.PRIVATE_KEY;
  const keyring = caver.wallet.add(caver.wallet.keyring.createFromPrivateKey(privateKey)) // Replace private key
  const tokenAddress = "0x4f1c4658015d16144ad1561252f52fe07a317f29";
  
  //tokenURI에 발행할 자료
  const tokenURI = 'ipfs://QmTTKKNdP8XG6VBwCwboxuEqw7tRjNH5BQmGa4GgWtGn7E/{id}.json'
  const createKIP37 = async() => {
   try{
    //  const kip37 = await caver.kct.kip37.deploy({ uri: tokenURI }, keyring.address)
    //  console.log(kip37.options.address)
     const kip37 = await new caver.kct.kip37(tokenAddress);
     const maxTokenId = 6;
     const initialSupply = 15;
    // console.log(myKIP37.uri);
      // const batchMint = await kip37.mintBatch(keyring.address, [0,1,2,3,4,5], [15,15,15,15,15,15],{ from: keyring.address, gas:8500000 })
      // console.log(batchMint);
      for(let i = 1; i< maxTokenId; i++) {
        const created = await kip37.create(i, initialSupply, { from: keyring.address })
        console.log(created)
      }
     

    //    const transferred = await kip37.safeTransferFrom(keyring.address, receiver.address, tokenId, 1, { from: keyring.address })
    //    console.log(transferred)
  
    //  const operator = caver.wallet.add(
    //      caver.wallet.keyring.createFromPrivateKey(privateKey)
    //  );
    //    const setApproved = await kip37.setApprovalForAll(operator.address, true, { from: keyring.address })
    //    console.log(setApproved)
  
     //    const transferredByOperator = await kip37.safeTransferFrom(keyring.address, receiver.address, tokenId, 2, { from: operator.address })
     //    console.log(transferredByOperator)
  
     //    const balanceOfReceiver = await kip37.balanceOf(receiver.address, tokenId)
     //    console.log(balanceOfReceiver)
  
    //  const minted = await kip37.mint(operator.address, tokenId, 100, { from: keyring.address })
    //  console.log(minted)
  
    //  const balanceOfOperator = await kip37.balanceOf(operator.address, tokenId)
    //  console.log(balanceOfOperator)
   }
   catch (err) {
    throw(err)
    }
  }
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

  //토큰 발행시 이부분의 주석을 해제
  // createKIP37();

  //랜덤박스로 토큰의 권한을 넘길떄 실행
  setRandomBox("0x1A43a72c706DfD164393588F9361823248191519");
