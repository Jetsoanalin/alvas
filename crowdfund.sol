// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract Crowdfunding {
    
    address payable public beneficiary;
    uint256 public goal;
    uint256 public deadline;
    uint256 public raisedAmount;
    mapping (address => uint256) public contributions;

    constructor(address payable _beneficiary,uint256 _goal, uint256 _deadline)
    {
        beneficiary = _beneficiary;
        goal = _goal;
        deadline = _deadline;
    }

    function contribute() public payable {
        // require(block.timestamp<= deadline,"Campaign is Ended");
        require(msg.value > 0,"Contribution must be greater than 0");

        contributions[msg.sender] += msg.value;
        raisedAmount += msg.value;
    }

    function withdraw() public {
        require(block.timestamp > deadline,"Campaign has not ended");
        require(raisedAmount >= goal, "Goal not reached");
        require(msg.sender == beneficiary,"Only beneficiary can claim");
        payable(beneficiary).transfer(raisedAmount);
    }
}

