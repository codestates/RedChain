//kaikas연결
const getAccount = async() => {
    return await window.klaytn.enable();
}

  //피나타나 ipfs일경우 파싱이 느려서 로컬ipfs주소로 변환하거나 개인api라면 그냥 api로 반환
const classify = (url) => {
    let result = 'http://127.0.0.1:8080/ipfs/';
    if(url.startsWith('ipfs://')) {
        result += url.slice('ipfs://'.length)
        return result;
    } 
    else if(url.startsWith('https://gateway.pinata.cloud/ipfs/')) {
        result += url.slice('https://gateway.pinata.cloud/ipfs/'.length)
        return result;
    } 
    else {
        return url;
    }
}

  export {getAccount, classify,}