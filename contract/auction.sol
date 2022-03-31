//SPDX-License-Identifier: GPL-3.0;
pragma solidity ^0.5.6;

interface IKIP17 {
    function transfer(address, uint) external;
    function transferFrom (
        address,
        address,
        uint
    ) external;
}

contract RedchainAucntion {
    event Start();
    event End(address buyer, uint256 winningBid);
    event BidRecord(address indexed sender, uint256 amount);
    event withdrawRecord(address indexed bidder, uint256 amount);
    event Cancel();

    address payable seller;
    uint256 endAt;

    IKIP17 public  nft;
    uint256 public nftId;

    enum Status {
        Inactive,
        Active,
        End
    }
    Status public status;

    address public highestBidder;
    uint256 public highestBid;
    mapping (address => uint256) public bids;

    constructor() public {
        seller = msg.sender;
        status = Status.Inactive;
    }

      modifier OnlySeller {
        require(seller == msg.sender, "You are not owner");
        _;
    }

    function ActiveAuction(IKIP17 _nft, uint256 _nftId,uint256 _startingBid) external OnlySeller {
        require(status == Status.Inactive, "Acution is already actived");
        highestBid = _startingBid * 10**18;

        nft = _nft;
        nftId = _nftId;
        nft.transferFrom(msg.sender, address(this), nftId);

        status = Status.Active;
        endAt = block.timestamp + 3 days;
        emit Start();
    }
    function cancel() external payable OnlySeller {
        require(status == Status.Active, "auction is invalid");
        status = Status.Inactive;
        refund(highestBidder, highestBid);

    
        nft.transferFrom(address(this), msg.sender, nftId);
        
        delete nft;
        delete nftId;
        emit Cancel();
    }

    function end() external OnlySeller {
        require(status == Status.Active, "Auction is already inactived");
        require(block.timestamp > endAt, "still auction preiod...");

        if(highestBidder != address(0)) {
            nft.transfer(highestBidder, nftId);
            (bool sent, bytes memory data) = seller.call.value(highestBid)("");
            require(sent, "Failed pay to seller");
        } else {
            nft.transfer(seller, nftId);
        }
        status == Status.End;
        emit End(highestBidder, highestBid);
    }

    function bid() external payable {
        require(status == Status.Active, "Auction is inactived");
        require(block.timestamp < endAt, "Actuion is ended");
        require(msg.value > highestBid, "value is too low");
        
        address previousBidder = highestBidder;
        uint256 previousBid = highestBid;

        refund(previousBidder, previousBid);
        highestBid = msg.value;
        highestBidder = msg.sender;
        bids[highestBidder] = highestBid;
        emit BidRecord(highestBidder, highestBid);
    }
    
    function withdraw() external payable OnlySeller{
        //require(경매가 끝나야함);
        require(status == Status.End,"Auction is still processing..");
        uint256 bal = address(this).balance;
         (bool sent, ) = seller.call.value(bal)("");
        require(sent, "Failed to withdraw");
        emit withdrawRecord(msg.sender, bal);
    }
    function refund(address _bidder, uint256 _bid) private {

        (bool sent, ) = _bidder.call.value(_bid)("");
        require(sent, "Failed refund"); 

    }
}