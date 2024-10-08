// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.27;

contract Landslide{
    struct Memo {
        string name ;
        string remarks ;
        uint timestamp ;
        address from ;
    }

    Memo[] public memos ;

    address payable public owner ;

    constructor() {
    owner = payable(msg.sender);
    }

    function donate(string calldata name , string calldata remarks) external payable{
        require(msg.value > 0 , "plz send more than 0 ether") ;
        owner.transfer(msg.value);
        memos.push(Memo(name , remarks , block.timestamp , msg.sender));
    }

    function retrieve() external view returns(Memo[] memory){
        return memos;
    }
}