pragma solidity ^0.4.10;

contract Lottery {
	
	// address public owner;
	mapping (address => uint) public bets;
	address[] public players;
	uint[] public winners;

	uint public betPrice; //the price of a bet in wei
	uint public future; //number of blocks past the lastBetBlock to use for the draw
	uint public quota; //number of bets for a single draw
	uint public numBets; //current number of bets
	bool public active; //if we are currently taking bets (otherwise waiting for a draw)
	uint public lastBetBlock; //the block number of the last bet

	//TODO: active is not really necessary since we can check numbets vs quota

	//constrcutor without arguments
	function Lottery() public {
		// owner = msg.sender;
		active = true;
		betPrice = 1000000000000000000;
		future = 10;
		quota = 2;
	}

	function potSize() public returns (uint balance) {
		return this.balance;
	}

	function placeBet(uint bet) payable public returns (bool success) {
		require(active == true);
		require(numBets < quota);
		require(msg.value == betPrice);

		//record the bet numbers played
		bets[msg.sender] = bet;
		players.push(msg.sender);

		numBets++;
		if (numBets == quota) {
			lastBetBlock = block.number;
			active = false;
		}

		return true;

	}

	//TODO: confirm that this is the last hex number in the block hash
	function draw() public returns (uint result) {
		
		uint drawBlock = lastBetBlock + future;

		//for testing only
		drawBlock = 1;

		//only proceed if drawBlock has been mined
		//TODO: use a require instead of if, check the quota and numbets and active status
		if (block.number > drawBlock) {

			//calculate the draw
			bytes1 drawHex = block.blockhash(drawBlock)[31];
			uint drawInt = uint(drawHex);

			//for testing only
			drawInt = 123;

			//find winners using players array and store their indices in winners array
			for (uint i = 0; i < numBets; i++) {
				if (bets[players[i]] == drawInt) {
					winners.push(i);
				}
			}

			//if there are any winners, make payouts to the winners
			if (winners.length > 0) {
				uint payout = this.balance / winners.length; 
				for (uint j = 0; j < winners.length; j++) {
					players[winners[j]].transfer(payout);
				}
			} else { //if there are no winners, refund all the players
				for (uint k = 0; k < players.length; k++) {
					players[k].transfer(betPrice);
				}
			}

			// return true;
			//reset the lottery

		}

		// return false;
		// return true;
		return winners.length;
	}

}