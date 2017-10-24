var EthereumLottery = artifacts.require("EthereumLottery");

contract('EthereumLottery', function (accounts) {

	it("test initial settings", function (done) {
		var betPrice;
		var future;
		var quota;
		var lottery;

		EthereumLottery.new().then(function (instance) { //with constructor
			instance.betPrice.call()
				.then(function (_betPrice) {
					betPrice = _betPrice;
					return instance.future.call();
				})
				.then(function (_future) {
					future = _future;
					return instance.quota.call();
				})
				.then(function (_quota) {
					quota = _quota;
					return instance.lotteries.call(0);
				}).then(function (_lottery) {
					lottery = _lottery;

					assert.equal(betPrice, 1000000000000000000, "betPrice should be 1");
					assert.equal(future, 10, "future should be 1");
					assert.equal(quota, 2, "Quota should be 2");
					assert.equal(lottery, '0,0,0', "lottery should be 0,0,0");
					done();
				});
		});
	});


	it("should place a single bet", function (done) {
		var ethereum_lottery;
		var betPrice;
		var contractInitialBalance;
		var contractFinalBalance;
		var account1InitialBalance;
		var account1FinalBalance;
		var numBets;
		var playerAddress;
		var playerBet;
		var bet;

		// return Lottery.new(1, 1, 2, { from: accounts[0] }).then(function (instance) { //with constructor
		// return Lottery.deployed().then(function (instance) { //without constructor
		EthereumLottery.new().then(function (instance) { //with constructor
			ethereum_lottery = instance;
			contractInitialBalance = web3.fromWei(web3.eth.getBalance(ethereum_lottery.address), 'ether').toNumber();
			account1InitialBalance = web3.fromWei(web3.eth.getBalance(accounts[1]), 'ether').toNumber();

			ethereum_lottery.betPrice.call().then(function (_betPrice) {
				betPrice = _betPrice;
			}).then(function () {
				return ethereum_lottery.placeBet(123, { from: accounts[1], value: betPrice });
			}).then(function () {
				return ethereum_lottery.getNumBets.call(0);
			}).then(function (_numBets) {
				numBets = _numBets;
				return ethereum_lottery.getPlayerAddress.call(0, 0);
			}).then(function (_playerAddress) {
				playerAddress = _playerAddress;
				return ethereum_lottery.getPlayerBet.call(0, 0);
			}).then(function (_bet) {
				bet = _bet;

				// console.log('account 1: ' + accounts[1]);
				// console.log('player address: ' + playerAddress);
				// console.log('player bet: ' + bet);

				contractFinalBalance = web3.fromWei(web3.eth.getBalance(ethereum_lottery.address), 'ether').toNumber();
				account1FinalBalance = web3.fromWei(web3.eth.getBalance(accounts[1]), 'ether').toNumber();

				// console.log('contract initial balance: ' + contractInitialBalance);
				// console.log('contract final balance: ' + contractFinalBalance);
				// console.log('account 1 initial balance: ' + account1InitialBalance);
				// console.log('account 1 final balance: ' + account1FinalBalance);
				// console.log('numBets: ' + numBets);

				var contractBalanceDifference = contractFinalBalance - contractInitialBalance;
				var accounts1BalanceDifference = Math.round(account1FinalBalance - account1InitialBalance);

				// console.log('contract balance differnce: ' + contractBalanceDifference);
				// console.log('account 1 balance difference: ' + accounts1BalanceDifference);

				assert.equal(numBets, 1, "numBets should be 1");
				assert.equal(playerAddress, accounts[1], "player[0] should be accounts[1]");
				assert.equal(bet, 123, "player[0] bet should be 123");
				assert.equal(contractBalanceDifference, 1, "contract balance should have increased by 1 ether");
				assert.equal(accounts1BalanceDifference, -1, "account 1 balance should have decreased by 1 ether");
				done();
			});
		});
	});

	it("should place 2 bets", function (done) {
		var ethereum_lottery;
		var betPrice;
		var contractInitialBalance;
		var contractFinalBalance;
		var account1InitialBalance;
		var account1FinalBalance;
		var account2InitialBalance;
		var account2FinalBalance;
		var numBets;
		var playerAddress1;
		var playerBet1;
		var bet1;
		var playerAddress2;
		var playerBet2;
		var bet2;
		var contractBalanceDifference;
		var account1BalanceDifference;
		var account2BalanceDifference;

		// return Lottery.new(1, 1, 2, { from: accounts[0] }).then(function (instance) { //with constructor
		// return Lottery.deployed().then(function (instance) { //without constructor
		EthereumLottery.new().then(function (instance) { //with constructor
			ethereum_lottery = instance;
			contractInitialBalance = web3.fromWei(web3.eth.getBalance(ethereum_lottery.address), 'ether').toNumber();
			account1InitialBalance = web3.fromWei(web3.eth.getBalance(accounts[1]), 'ether').toNumber();
			account2InitialBalance = web3.fromWei(web3.eth.getBalance(accounts[2]), 'ether').toNumber();

			ethereum_lottery.betPrice.call().then(function (_betPrice) {
				betPrice = _betPrice;
			}).then(function () {
				return ethereum_lottery.placeBet(123, { from: accounts[1], value: betPrice });
			}).then(function () {
				return ethereum_lottery.getPlayerAddress.call(0, 0);
			}).then(function (_playerAddress1) {
				playerAddress1 = _playerAddress1;
				return ethereum_lottery.getPlayerBet.call(0, 0);
			}).then(function (_bet1) {
				bet1 = _bet1;
				return ethereum_lottery.placeBet(111, { from: accounts[2], value: betPrice });
			}).then(function () {
				return ethereum_lottery.getPlayerAddress.call(0, 1);
			}).then(function (_playerAddress2) {
				playerAddress2 = _playerAddress2;
				return ethereum_lottery.getPlayerBet.call(0, 1);
			}).then(function (_bet2) {
				bet2 = _bet2;
				return ethereum_lottery.getNumBets.call(0);
			}).then(function (_numBets) {
				numBets = _numBets;
				// console.log('account 1: ' + accounts[1]);
				// console.log('player address: ' + playerAddress);
				// console.log('player bet: ' + bet);

				contractFinalBalance = web3.fromWei(web3.eth.getBalance(ethereum_lottery.address), 'ether').toNumber();
				account1FinalBalance = web3.fromWei(web3.eth.getBalance(accounts[1]), 'ether').toNumber();
				account2FinalBalance = web3.fromWei(web3.eth.getBalance(accounts[2]), 'ether').toNumber();

				// console.log('contract initial balance: ' + contractInitialBalance);
				// console.log('contract final balance: ' + contractFinalBalance);
				// console.log('account 1 initial balance: ' + account1InitialBalance);
				// console.log('account 1 final balance: ' + account1FinalBalance);
				// console.log('numBets: ' + numBets);

				contractBalanceDifference = contractFinalBalance - contractInitialBalance;
				account1BalanceDifference = Math.round(account1FinalBalance - account1InitialBalance);
				account2BalanceDifference = Math.round(account2FinalBalance - account2InitialBalance);

				// console.log('contract balance differnce: ' + contractBalanceDifference);
				// console.log('account 1 balance difference: ' + accounts1BalanceDifference);

				assert.equal(numBets, 2, "numBets should be 2");
				assert.equal(playerAddress1, accounts[1], "player[0] should be accounts[1]");
				assert.equal(playerAddress2, accounts[2], "player[1] should be accounts[2]");
				assert.equal(bet1, 123, "player[0] bet should be 123");
				assert.equal(bet2, 111, "player[1] bet should be 123");
				assert.equal(contractBalanceDifference, 2, "contract balance should have increased by 1 ether");
				assert.equal(account1BalanceDifference, -1, "account 1 balance should have decreased by 1 ether");
				assert.equal(account2BalanceDifference, -1, "account 2 balance should have decreased by 1 ether");
				done();
			});
		});
	});

	it("should place 2 bets, then the third bet should fail and account 3 refunded", function (done) {
		var ethereum_lottery;
		var betPrice;
		var contractInitialBalance;
		var contractFinalBalance;
		var account3InitialBalance;
		var account3FinalBalance;
		var numBets;
		var contractBalanceDifference;
		var account3BalanceDifference;

		// return Lottery.new(1, 1, 2, { from: accounts[0] }).then(function (instance) { //with constructor
		// return Lottery.deployed().then(function (instance) { //without constructor
		EthereumLottery.new().then(function (instance) { //with constructor
			ethereum_lottery = instance;
			contractInitialBalance = web3.fromWei(web3.eth.getBalance(ethereum_lottery.address), 'ether').toNumber();
			account3InitialBalance = web3.fromWei(web3.eth.getBalance(accounts[3]), 'ether').toNumber();

			ethereum_lottery.betPrice.call().then(function (_betPrice) {
				betPrice = _betPrice;
			}).then(function () {
				return ethereum_lottery.placeBet(123, { from: accounts[1], value: betPrice });
			}).then(function () {
				return ethereum_lottery.placeBet(111, { from: accounts[2], value: betPrice });
			}).then(function () {
				return ethereum_lottery.placeBet(99, { from: accounts[3], value: betPrice });
			}).then(assert.fail).catch(function (error) {
			}).then(function () {
				return ethereum_lottery.getNumBets.call(0);
			}).then(function (_numBets) {
				numBets = _numBets;

				contractFinalBalance = web3.fromWei(web3.eth.getBalance(ethereum_lottery.address), 'ether').toNumber();
				account3FinalBalance = web3.fromWei(web3.eth.getBalance(accounts[3]), 'ether').toNumber();

				// console.log('contract initial balance: ' + contractInitialBalance);
				// console.log('contract final balance: ' + contractFinalBalance);
				// console.log('numBets: ' + numBets);

				contractBalanceDifference = contractFinalBalance - contractInitialBalance;
				account3BalanceDifference = Math.round(account3FinalBalance - account3InitialBalance);

				// console.log('contract balance differnce: ' + contractBalanceDifference);
				// console.log('account 3 balance difference: ' + accounts3BalanceDifference);

				assert.equal(numBets, 2, "numBets should be 2");
				assert.equal(contractBalanceDifference, 2, "contract balance should have increased by 1 ether");
				assert.equal(account3BalanceDifference, 0, "account 3 balance shouldnot have changed");
				done();
			});
		});
	});

	// it("should place two bets, one bet wins and gets the payout", function () {
	// 	var lottery;

	// 	var betPrice;
	// 	var initialBalance1;
	// 	var finalBalance1;
	// 	var initialBalance2;
	// 	var finalBalance2;
	// 	var bet;
	// 	var numBets;
	// 	var player;
	// 	var result;
	// 	var potSize;
	// 	var winner;

	// 	// return Lottery.new(1, 1, 2, { from: accounts[0] }).then(function (instance) { //with constructor
	// 	// return Lottery.deployed().then(function (instance) { //without constructor
	// 	return Lottery.new().then(function (instance) { //with constructor
	// 		lottery = instance;
	// 		initialBalance1 = web3.fromWei(web3.eth.getBalance(accounts[1]), 'ether').toNumber();
	// 		initialBalance2 = web3.fromWei(web3.eth.getBalance(accounts[2]), 'ether').toNumber();

	// 		lottery.betPrice.call().then(function (_betPrice) {
	// 			betPrice = _betPrice;
	// 		}).then(function () {
	// 			return lottery.placeBet(123, { from: accounts[1], value: betPrice });
	// 		}).then(function () {
	// 			return lottery.placeBet(221, { from: accounts[2], value: betPrice });
	// 		}).then(function () {
	// 			return lottery.numBets.call();
	// 		}).then(function (_numBets) {
	// 			numBets = _numBets;
	// 			return lottery.bets.call(accounts[1]);
	// 		}).then(function (_bet) {
	// 			bet = _bet;
	// 			return lottery.players.call(0);
	// 		}).then(function (_player) {
	// 			player = _player;
	// 			return lottery.draw();
	// 		}).then(function (_winner) {
	// 			winner = _winner;
	// 			return lottery.potSize.call();
	// 		}).then(function (_potSize) {
	// 			potSize = _potSize;
	// 			// result = _result;



	// 			// assert.equal(finalBalance, initialBalance + betPrice, "Final balance must be initialBalance + betPrice");
	// 			// assert.equal(numBets, 1, "numBets should be 1");
	// 			// assert.equal(bet, 123, "bet should be 123");
	// 			// assert.equal(player, accounts[1], "the first player should be accounts[1]");
	// 			// assert.equal(result, true, "winner has been selected");

	// 			finalBalance1 = web3.fromWei(web3.eth.getBalance(accounts[1]), 'ether').toNumber();
	// 			finalBalance2 = web3.fromWei(web3.eth.getBalance(accounts[2]), 'ether').toNumber();

	// 			// console.log('potSize: ' + potSize);

	// 			// console.log('accounts[1]: ' + accounts[1]);
	// 			// console.log('winner: ' + winner);

	// 			// console.log('intial balance accounts[1]: ' + initialBalance1);
	// 			// console.log('intial balance accounts[2]: ' + initialBalance2);
	// 			// console.log('final balance accounts[1]: ' + finalBalance1);
	// 			// console.log('final balance accounts[2]: ' + finalBalance2);
	// 		});
	// 	});
	// });

	// it("should place two bets, both bets lose and get refunded", function () {
	// 	var lottery;

	// 	var betPrice;
	// 	var initialBalance1;
	// 	var finalBalance1;
	// 	var initialBalance2;
	// 	var finalBalance2;
	// 	var bet;
	// 	var numBets;
	// 	var player;
	// 	var result;
	// 	var potSize;
	// 	var winner;

	// 	// return Lottery.new(1, 1, 2, { from: accounts[0] }).then(function (instance) { //with constructor
	// 	// return Lottery.deployed().then(function (instance) { //without constructor
	// 	return Lottery.new().then(function (instance) { //with constructor
	// 		lottery = instance;
	// 		initialBalance1 = web3.fromWei(web3.eth.getBalance(accounts[1]), 'ether').toNumber();
	// 		initialBalance2 = web3.fromWei(web3.eth.getBalance(accounts[2]), 'ether').toNumber();

	// 		lottery.betPrice.call().then(function (_betPrice) {
	// 			betPrice = _betPrice;
	// 		}).then(function () {
	// 			return lottery.placeBet(123, { from: accounts[1], value: betPrice });
	// 		}).then(function () {
	// 			return lottery.placeBet(123, { from: accounts[2], value: betPrice });
	// 		}).then(function () {
	// 			return lottery.numBets.call();
	// 		}).then(function (_numBets) {
	// 			numBets = _numBets;
	// 			return lottery.bets.call(accounts[1]);
	// 		}).then(function (_bet) {
	// 			bet = _bet;
	// 			return lottery.players.call(0);
	// 		}).then(function (_player) {
	// 			player = _player;
	// 			return lottery.draw();
	// 		}).then(function (_result) {
	// 			result = _result;
	// 			return lottery.potSize.call();
	// 		}).then(function (_potSize) {
	// 			potSize = _potSize;
	// 			// result = _result;



	// 			// assert.equal(finalBalance, initialBalance + betPrice, "Final balance must be initialBalance + betPrice");
	// 			// assert.equal(numBets, 1, "numBets should be 1");
	// 			// assert.equal(bet, 123, "bet should be 123");
	// 			// assert.equal(player, accounts[1], "the first player should be accounts[1]");
	// 			// assert.equal(result, true, "winner has been selected");

	// 			finalBalance1 = web3.fromWei(web3.eth.getBalance(accounts[1]), 'ether').toNumber();
	// 			finalBalance2 = web3.fromWei(web3.eth.getBalance(accounts[2]), 'ether').toNumber();

	// 			console.log('potSize: ' + potSize);
	// 			console.log('accounts[1]: ' + accounts[1]);
	// 			console.log('result: ' + result);
	// 			// console.log('result: ' + JSON.stringify(result));

	// 			console.log('intial balance accounts[1]: ' + initialBalance1);
	// 			console.log('intial balance accounts[2]: ' + initialBalance2);
	// 			console.log('final balance accounts[1]: ' + finalBalance1);
	// 			console.log('final balance accounts[2]: ' + finalBalance2);
	// 		});
	// 	});
	// });

});