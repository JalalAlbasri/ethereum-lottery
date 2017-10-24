pragma solidity ^0.4.10;

contract EthereumLottery {
	uint public betPrice; //the price of a bet in wei
	uint public future; //number of blocks past the lastBetBlock to use for the draw
	uint public quota; //number of bets for a single draw
	uint public numLotteries;
	mapping (uint => Lottery) public lotteries;
	uint currentLottery;

	struct Player {
		address playerAddress;
		uint bet;
	}

	struct Lottery {
		uint numBets;
		uint lastBetBlock;
		uint draw;
		// Player[] players;
		// Player[] winners;
		uint[] payouts;
		mapping (uint => Player) players;
	}

	function newLottery() public returns (uint lotteryId) {
		lotteryId = numLotteries++;
		// lotteries[lotteryId] = Lottery(0,0,0);
	}

	function newPlayer(address playerAddress, uint bet) public returns (uint playerId) {
		playerId = lotteries[currentLottery].numBets++;
		lotteries[currentLottery].players[playerId] = Player(playerAddress, bet);
	}

	//constrcutor without arguments
	function EthereumLottery() public {
		betPrice = 1000000000000000000;
		future = 10;
		quota = 2;
		currentLottery = newLottery();
	}

	function contractBalance() public returns (uint balance) {
		return this.balance;
	}

	function getNumBets(uint lotteryIndex) public returns (uint numBets) {
		return lotteries[lotteryIndex].numBets;
	}

	function getPlayerAddress(uint lotteryIndex, uint playerIndex) public returns (address playerAddress) {
		return lotteries[lotteryIndex].players[playerIndex].playerAddress;
	}

	function getPlayerBet(uint lotteryIndex, uint playerIndex) public returns (uint playerBet) {
		return lotteries[lotteryIndex].players[playerIndex].bet;
	}

	function getDraw(uint lotteryIndex) public returns (uint draw) {
		return lotteries[lotteryIndex].draw;
	}

	function getPayoutsLength(uint lotteryIndex) public returns (uint payoutsLength) {
		return lotteries[lotteryIndex].payouts.length;
	}
	
	function placeBet(uint bet) payable public returns (bool success) {
		require(lotteries[currentLottery].numBets < quota);
		require(msg.value == betPrice);
		
		newPlayer(msg.sender, bet);

		if (lotteries[currentLottery].numBets == quota) {
			lotteries[currentLottery].lastBetBlock = block.number;
		}
		return true;
	}

	//TODO: confirm that this is the last hex number in the block hash
	function draw() public returns (bool result) {
		
		uint drawBlock = lotteries[currentLottery].lastBetBlock + future;

		//for testing only
		drawBlock = 1;

		//only proceed if drawBlock has been mined
		//TODO: use a require instead of if, check the quota and numbets and active status
		if (block.number > drawBlock) {

			//calculate the draw
			bytes1 drawHex = block.blockhash(drawBlock)[31];
			lotteries[currentLottery].draw = uint(drawHex);

			//for testing only
			lotteries[currentLottery].draw = 123;

			for (uint i = 0; i < lotteries[currentLottery].numBets; i++) {
				if (lotteries[currentLottery].players[i].bet == lotteries[currentLottery].draw) {
					lotteries[currentLottery].payouts.push(i);
				}
			}

			//if there are any winners, make payouts to the winners
			if (lotteries[currentLottery].payouts.length > 0) {
				uint payout = this.balance / lotteries[currentLottery].payouts.length;

				for (uint j = 0; j < lotteries[currentLottery].payouts.length; j++) {
					lotteries[currentLottery].players[lotteries[currentLottery].payouts[j]].playerAddress.transfer(payout);
				}

			} else { //if there are no winners, refund all the players
				for (uint k = 0; k < lotteries[currentLottery].numBets; k++) {
					lotteries[currentLottery].players[k].playerAddress.transfer(betPrice); //might be a problem since there might not be a player at players[0]
				}
			}

			// return true;
			//reset the lottery

		}

		// return false;
		return true;
		// return winners.length;
	}

}