pragma solidity ^0.4.10;

contract Lottery {
	
	// address public owner;
	mapping (address => uint) public bets;

	uint public betPrice; //the price of a bet in wei
	uint public future; //number of blocks past the lastBetBlock to use for the draw
	uint public quota; //number of bets for a single draw
	uint public numBets; //current number of bets
	bool public active; //if we are currently taking bets (otherwise waiting for a draw)
	uint public lastBetBlock; //the block number of the last bet

	//constrcutor without arguments
	function Lottery() public {
		// owner = msg.sender;
		active = true;
		betPrice = 1;
		future = 10;
		quota = 2;
	}

	function placeBet(uint bet) payable public returns (bool success) {
		require(active == true);
		require(numBets < quota);
		require(msg.value == betPrice);

		//record the bet numbers played
		bets[msg.sender] = bet;

		numBets++;
		if (numBets == quota) {
			lastBetBlock = block.number;
			active = false;
		}

		return true;

	}

	function draw() public returns (bool success) {
		// bytes32 drawHash;
		// uint blockNumber = block.number;

		// if (blockNumber > lastBetBlock + future) {
		// 	drawHash = block.blockhash(blockNumber);
			
		// }
		
		bytes1 drawHex = block.blockhash(11)[31];
		uint draw = uint(drawHex);
		

		for (uint i = 0; i < numBets; i++) {
			if (bets[i] === draw) {

			}
		}

		// return draw;
		// return uint(byteZero);
		// return block.blockhash(block.number-1);
		// return block.blockhash(block.number-1).length;
		// return uint(block.blockhash(block.number-1));
		return true;
	}

}