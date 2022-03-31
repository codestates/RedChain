//SPDX-License-Identifier: GPL-3.0;
pragma solidity ^0.5.6;

contract NFTSealGacha {
    event Record(address indexed sender, uint256 _tokenId);

    uint256[] TokenLists;
    
    address operator;
    uint256 price;
    // address KIP37Address;

    // constructor(address _tokenAddress,uint256 _price) public payable {
    constructor(uint256 _price) public payable {
        operator = msg.sender;
        price = _price * 10**18; //wei환산
        // KIP37Address = _tokenAddress;
    }
    modifier onlyOperator {
        require(msg.sender == operator, "Only operator!");
        _;
    }

    //_tokenId : 당첨금   / _balance : 발행량
    function setInit(uint256 _tokenId, uint256 _balance) public onlyOperator{

        //TokenList 0~999까지 총 길이가 1000인 배열을 생성
         for(uint256 i = 0; i< _balance; i++) {
            TokenLists.push(_tokenId);
        }
    }

    //진행현황 Count는 각 당첨금별 토큰 갯수를, List는 전체 판매가능한 
    function getTokenList(uint256 _index) public view onlyOperator returns(uint256) {
        return TokenLists[_index];
    }
    
    //셔플함수
    function shuffleArr() public onlyOperator {
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

    function widthral() external onlyOperator payable {
        (bool sent, ) = operator.call.gas(1000).value(address(this).balance)("");
        require(sent, "Failed to pay");
    }

    function buy() external payable returns(uint256) {
        // require(operator != msg.sender, "You are opeator!!");
        require(TokenLists.length > 0, "Sold out!!");
        require(msg.value == price, "You need pay");

        uint256 result = TokenLists[(TokenLists.length) - 1];
        TokenLists.pop();
        emit Record(msg.sender, result);
        // callKIP37(result);
        return result;
    }
    //KIP37컨트랙트 안의 safeTransferFrom함수 호출하는 함수

    // function callKIP37(uint256 _tokenId) private {
    //     (bool success,) = KIP37Address.delegatecall(
    //         abi.encodeWithSignature("safeTransferFrom(address,address, uint256, uint256)", operator, msg.sender, _tokenId, 1)
    //     );
    //     require(success, "failed to transfer KIP37");
    // }
}