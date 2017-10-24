var Lottery = artifacts.require("Lottery");

contract('Lottery', function (accounts) {
	it("test initial settings", function () {
		return Lottery.new().then(function (instance) { //with constructor
			instance.betPrice.call()
				.then(function (betPrice) {
					assert.equal(betPrice, 1000000000000000000, "betPrice should be 1");
					return instance.future.call();
				})
				.then(function (future) {
					assert.equal(future, 10, "future should be 1");
					return instance.quota.call();
				})
				.then(function (quota) {
					assert.equal(quota, 2, "Quota should be 2");
					return instance.numBets.call();
				}).then(function (numBets) {
					assert.equal(numBets, 0, "numBets should be 0");
					return instance.active.call();
				}).then(function (active) {
					assert.equal(active, true, "lottery should be active");
					//test lastBetBlock
				});
		});
	});


	// it("should place a single bet", function () {
	// 	var lottery;

	// 	var betPrice;
	// 	var initialBalance;
	// 	var finalBalance;
	// 	var bet;
	// 	var numBets;
	// 	var player;

	// 	// return Lottery.new(1, 1, 2, { from: accounts[0] }).then(function (instance) { //with constructor
	// 	// return Lottery.deployed().then(function (instance) { //without constructor
	// 	return Lottery.new().then(function (instance) { //with constructor
	// 		lottery = instance;
	// 		initialBalance = web3.eth.getBalance(lottery.address).toNumber();

	// 		lottery.betPrice.call().then(function (_betPrice) {
	// 			betPrice = _betPrice;
	// 		}).then(function () {
	// 			return lottery.placeBet(12345, { from: accounts[1], value: betPrice });
	// 		}).then(function () {
	// 			finalBalance = web3.eth.getBalance(lottery.address).toNumber();
	// 			return lottery.numBets.call();
	// 		}).then(function (_numBets) {
	// 			numBets = _numBets;
	// 			return lottery.bets.call(accounts[1]);
	// 		}).then(function (_bet) {
	// 			bet = _bet;
	// 			return lottery.players.call(0);
	// 		}).then(function (_player) {
	// 			player = _player;
	// 			// assert.equal(finalBalance, initialBalance + betPrice, "Final balance must be initialBalance + betPrice");
	// 			assert.equal(numBets, 1, "numBets should be 1");
	// 			assert.equal(bet, 12345, "bet should be 12345");
	// 			assert.equal(player, accounts[1], "the first player should be accounts[1]");
	// 		});
	// 	});
	// });

	// it("should place two bets and the lottery status should be inactive", function () {

	// 	var lottery;

	// 	var betPrice;
	// 	var initialBalance;
	// 	var finalBalance;
	// 	var bet1;
	// 	var bet2;
	// 	var numBets;
	// 	var active;

	// 	return Lottery.new().then(function (instance) { //with constructor
	// 		lottery = instance;
	// 		initialBalance = web3.eth.getBalance(lottery.address).toNumber();

	// 		lottery.betPrice.call().then(function (_betPrice) {
	// 			betPrice = _betPrice;
	// 		}).then(function () {
	// 			return lottery.placeBet(12345, { from: accounts[1], value: betPrice });
	// 		}).then(function () {
	// 			return lottery.placeBet(54321, { from: accounts[2], value: betPrice });
	// 		}).then(function () {
	// 			finalBalance = web3.eth.getBalance(lottery.address).toNumber();
	// 			return lottery.numBets.call();
	// 		}).then(function (_numBets) {
	// 			numBets = _numBets;
	// 			return lottery.bets.call(accounts[1]);
	// 		}).then(function (_bet1) {
	// 			bet1 = _bet1;
	// 			return lottery.bets.call(accounts[2]);
	// 		}).then(function (_bet2) {
	// 			bet2 = _bet2;
	// 			return lottery.active.call();
	// 		}).then(function (_active) {
	// 			active = _active;

	// 			assert.equal(finalBalance, initialBalance + betPrice * 2, "Final balance must be initialBalance + betPrice");
	// 			assert.equal(numBets, 2, "numBets should be 1");
	// 			assert.equal(bet1, 12345, "bet should be 12345");
	// 			assert.equal(bet2, 54321, "bet should be 12345");
	// 			assert.equal(active, false, "lottery should be inactive");
	// 		});
	// 	});
	// });

	// it("should place two bets and the lottery status should be inactive, then a thrid bet should fail and the money refunded", function () {

	// 	var lottery;

	// 	var betPrice;
	// 	var initialBalance;
	// 	var finalBalance;
	// 	var bet1;
	// 	var bet2;
	// 	var bet3;
	// 	var numBets;
	// 	var active;

	// 	// return Lottery.new(web3.toWei(1, 'ether'), 1, 2, { from: accounts[0] }).then(function (instance) { //with constructor
	// 	return Lottery.new().then(function (instance) { //with constructor
	// 		lottery = instance;
	// 		initialBalance = web3.eth.getBalance(lottery.address).toNumber();

	// 		lottery.betPrice.call().then(function (_betPrice) {
	// 			betPrice = _betPrice;
	// 		}).then(function () {
	// 			return lottery.placeBet(12345, { from: accounts[1], value: betPrice });
	// 			// return lottery.placeBet(12345, { from: accounts[1], value: web3.toWei(betPrice, 'ether') });
	// 		}).then(function () {
	// 			return lottery.placeBet(54321, { from: accounts[2], value: betPrice });
	// 			// return lottery.placeBet(54321, { from: accounts[2], value: web3.toWei(betPrice, 'ether') });
	// 		}).then(function () {
	// 			return lottery.placeBet(54321, { from: accounts[3], value: betPrice });
	// 			// return lottery.placeBet(12323, { from: accounts[3], value: web3.toWei(betPrice, 'ether') });
	// 		}).then(assert.fail)
	// 			.catch(function (error) { })
	// 			.then(function () {
	// 				finalBalance = web3.eth.getBalance(lottery.address).toNumber();
	// 				// finalBalance = web3.fromWei(web3.eth.getBalance(lottery.address).toNumber(), 'ether');
	// 				return lottery.numBets.call();
	// 			}).then(function (_numBets) {
	// 				numBets = _numBets;
	// 				return lottery.bets.call(accounts[1]);
	// 			}).then(function (_bet1) {
	// 				bet1 = _bet1;
	// 				return lottery.bets.call(accounts[2]);
	// 			}).then(function (_bet2) {
	// 				bet2 = _bet2;
	// 				return lottery.bets.call(accounts[3]);
	// 			}).then(function (_bet3) {
	// 				bet3 = _bet3;
	// 				return lottery.active.call();
	// 			}).then(function (_active) {
	// 				active = _active;

	// 				// console.log('betPrice: ' + betPrice);
	// 				// console.log('account[0] final balance: ' + web3.fromWei(finalBalance, 'ether'));
	// 				// console.log('bet1: ' + bet1);
	// 				// console.log('bet2: ' + bet2);
	// 				// console.log('bet3: ' + bet3);
	// 				// console.log('active: ' + active);
	// 				// console.log('account 1 balance: ' + web3.fromWei(web3.eth.getBalance(accounts[1]), 'ether').toNumber());
	// 				// console.log('account 3 balance: ' + web3.fromWei(web3.eth.getBalance(accounts[3]), 'ether').toNumber());


	// 				assert.equal(finalBalance, initialBalance + betPrice * 2, "Final balance must be initialBalance + betPrice");
	// 				assert.equal(numBets, 2, "numBets should be 2");
	// 				assert.equal(active, false, "lottery should be inactive");
	// 			});
	// 	});
	// });

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