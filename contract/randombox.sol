//SPDX-License-Identifier: GPL-3.0;
pragma solidity ^0.5.6;



// interface IKIP37 {

//    function setApprovalForAll(address operator, bool approved) external;
//     function safeTransferFrom(
//         address from,
//         address to,
//         uint256 id,
//         uint256 amount,
//         bytes calldata data
//     ) external;
//      function safeBatchTransferFrom(
//         address from,
//         address to,
//         uint256[] calldata ids,
//         uint256[] calldata amounts,
//         bytes calldata data
//     ) external;
// }

contract NFTSealGacha {
    event Record(address indexed sender, uint256 _tokenId);

    uint256[] TokenLists;
    
    address operator;
    uint256 public price;
    
    // IKIP37 public seal; 
    mapping(uint256 => uint256) public tokenBalance;

    constructor(uint256 _price) public  {
        operator = msg.sender;
        price = _price * 10**18; //Klay환산
    }
    modifier onlyOperator {
        require(msg.sender == operator, "Only operator!");
        _;
    }

    //_tokenId : 당첨금   / _balance : 발행량
    function setInit(uint256[] calldata _tokenId, uint256[] calldata _amount) external onlyOperator {
        // seal = _seal;
        // seal.safeTransferFrom(operator, address(this), _tokenId, _amount,"");
        //TokenList 0~999까지 총 길이가 1000인 배열을 생성
         for(uint256 i = 0; i < _tokenId.length; i++) {
             for(uint256 k = 0; k < _amount[i]; k++) {
                 TokenLists.push(i);
             }
            tokenBalance[i] = _amount[i];
        }
        shuffleArr();
    }

    //진행현황 Count는 각 당첨금별 토큰 갯수를, List는 전체 판매가능한 
    function getTokenList(uint256 _index) public view onlyOperator returns(uint256) {
        return TokenLists[_index];
    }
    
    //셔플함수
    function shuffleArr() private onlyOperator {
        for (uint256 i = 0; i < TokenLists.length; i++) {
            uint256 n = i + uint256(keccak256(abi.encodePacked(block.timestamp))) % (TokenLists.length - i);
            uint256 temp = TokenLists[n];
            TokenLists[n] = TokenLists[i];
            TokenLists[i] = temp;
        }
    }

      function getTotal() public view returns(uint256) {
        return TokenLists.length;
    }
    //구매시 뿌려줌
  
    function getBalance() external view returns(uint256) {
        return address(this).balance;
    }

    function withdrawal() private payable onlyOperator  {
        (bool sent, ) = operator.call.gas(1000).value(address(this).balance)("");
        require(sent, "Failed to pay");
    }

    function buy() external payable returns(uint256) {
        // require(operator != msg.sender, "You are opeator!!");
        require(TokenLists.length > 0, "Sold out!!");
        require(msg.value == price, "You need pay");
        uint256 selected = TokenLists[(TokenLists.length) - 1];

        //토큰전송
        // seal.safeTransferFrom(operator, msg.sender, selected, 1);

        uint256 result = selected;
        TokenLists.pop();
        emit Record(msg.sender, result);
       
        return result;
    }
   
}