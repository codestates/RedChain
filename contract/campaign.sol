pragma solidity ^0.5.0;


library SafeMath {
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }
 function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }

}
contract Campaign {
    using SafeMath for uint256;
    event donation(address indexed contributor, uint256 price);
    event withdrawRecord(address organization, uint256 amount);

    address payable operator;
    address payable organization;

    uint256 public goal;
    uint256 public currentFund;
    uint256 public endAt;

    constructor() public{
        operator = msg.sender;
    }

    

    modifier OnlyOperator {
        require(msg.sender == operator, "You are not operator!");
        _;
    }
    function setOrganization(address payable _organization) external  OnlyOperator{
        organization =  _organization;
    }

    function setGoal(uint256 _goal) public OnlyOperator {
        goal = _goal * 10 ** 18; //KLAY
        endAt = block.timestamp + 30 days;
    }

    function() external payable {
        currentFund = currentFund.add(msg.value);
        emit donation(msg.sender, msg.value);
    }

    function withdraw() external payable OnlyOperator{
        if(block.timestamp > endAt || goal <= currentFund) {
            (bool sent,) = organization.call.value(currentFund)("");
             require(sent,"Failed withdraw");  
        } else {
            revert("Not yet, Still processing funding");
        }
    }


}