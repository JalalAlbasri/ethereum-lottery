var Lottery = artifacts.require("Lottery");

contract('Lottery', function (accounts) {
	it("test initial settings", function () {
		// return Lottery.deployed().then(function (instance) { //without constructor
		return Lottery.new().then(function (instance) { //with constructor
			// return Lottery.new(1, 1, 2, { from: accounts[0] }).then(function (instance) { //with constructor
			instance.betPrice.call()
				.then(function (betPrice) {
					assert.equal(betPrice, 1, "betPrice should be 1");
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


	it("should place a single bet", function () {
		var lottery;

		var betPrice;
		var initialBalance;
		var finalBalance;
		var bet;
		var numBets;

		// return Lottery.new(1, 1, 2, { from: accounts[0] }).then(function (instance) { //with constructor
		// return Lottery.deployed().then(function (instance) { //without constructor
		return Lottery.new().then(function (instance) { //with constructor
			lottery = instance;
			initialBalance = web3.eth.getBalance(lottery.address).toNumber();

			lottery.betPrice.call().then(function (_betPrice) {
				betPrice = _betPrice;
			}).then(function () {
				return lottery.placeBet(12345, { from: accounts[1], value: betPrice });
			}).then(function () {
				finalBalance = web3.eth.getBalance(lottery.address).toNumber();
				return lottery.numBets.call();
			}).then(function (_numBets) {
				numBets = _numBets;
				return lottery.bets.call(accounts[1]);
			}).then(function (_bet) {
				bet = _bet;

				// assert.equal(finalBalance, initialBalance + betPrice, "Final balance must be initialBalance + betPrice");
				assert.equal(numBets, 1, "numBets should be 1");
				assert.equal(bet, 12345, "bet should be 12345");
			});
		});
	});

	// it("should place a single bet from account 2 on the same deployed lottery from last test", function () {

	// 	var lottery;

	// 	var betPrice;
	// 	var initialBalance;
	// 	var finalBalance;
	// 	var bet1;
	// 	var bet2;
	// 	var numBets;

	// 	// return Lottery.new(1, 1, 2, { from: accounts[0] }).then(function (instance) { //with constructor
	// 	return Lottery.deployed().then(function (instance) { //with constructor
	// 		lottery = instance;
	// 		initialBalance = web3.eth.getBalance(lottery.address).toNumber();
	// 		console.log('initialBalance: ' + initialBalance);
	// 		lottery.betPrice.call().then(function (_betPrice) {
	// 			betPrice = _betPrice;
	// 		}).then(function () {
	// 			return lottery.placeBet(54321, { from: accounts[2], value: betPrice });
	// 		}).then(function () {
	// 			finalBalance = web3.eth.getBalance(lottery.address).toNumber();
	// 			return lottery.numBets.call();
	// 		}).then(function (_numBets) {
	// 			numBets = _numBets;
	// 			return lottery.bets.call(accounts[1]);
	// 		}).then(function (_bet1) {
	// 			console.log('asdf');
	// 			bet1 = _bet1;
	// 			return lottery.bets.call(accounts[2]);
	// 		}).then(function (_bet2) {
	// 			bet2 = _bet2;

	// 			console.log('bet1: ' + bet1);
	// 			console.log('bet2: ' + bet2);

	// 			// assert.equal(finalBalance, initialBalance + betPrice, "Final balance must be initialBalance + betPrice");
	// 			// assert.equal(numBets, 1, "numBets should be 1");
	// 			assert.equal(bet, 12345, "bet should be 12345");
	// 			assert.equal(bet, 54321, "bet should be 12345");

	// 		});
	// 	});
	// });

	it("should place two bets and the lottery status should be inactive", function () {

		var lottery;

		var betPrice;
		var initialBalance;
		var finalBalance;
		var bet1;
		var bet2;
		var numBets;
		var active;

		return Lottery.new().then(function (instance) { //with constructor
			lottery = instance;
			initialBalance = web3.eth.getBalance(lottery.address).toNumber();

			lottery.betPrice.call().then(function (_betPrice) {
				betPrice = _betPrice;
			}).then(function () {
				return lottery.placeBet(12345, { from: accounts[1], value: betPrice });
			}).then(function () {
				return lottery.placeBet(54321, { from: accounts[2], value: betPrice });
			}).then(function () {
				finalBalance = web3.eth.getBalance(lottery.address).toNumber();
				return lottery.numBets.call();
			}).then(function (_numBets) {
				numBets = _numBets;
				return lottery.bets.call(accounts[1]);
			}).then(function (_bet1) {
				bet1 = _bet1;
				return lottery.bets.call(accounts[2]);
			}).then(function (_bet2) {
				bet2 = _bet2;
				return lottery.active.call();
			}).then(function (_active) {
				active = _active;

				assert.equal(finalBalance, initialBalance + betPrice * 2, "Final balance must be initialBalance + betPrice");
				assert.equal(numBets, 2, "numBets should be 1");
				assert.equal(bet1, 12345, "bet should be 12345");
				assert.equal(bet2, 54321, "bet should be 12345");
				assert.equal(active, false, "lottery should be inactive");
			});
		});
	});

	it("should place two bets and the lottery status should be inactive, then a thrid bet should fail and the money refunded", function () {

		var lottery;

		var betPrice;
		var initialBalance;
		var finalBalance;
		var bet1;
		var bet2;
		var bet3;
		var numBets;
		var active;

		// return Lottery.new(web3.toWei(1, 'ether'), 1, 2, { from: accounts[0] }).then(function (instance) { //with constructor
		return Lottery.new().then(function (instance) { //with constructor
			lottery = instance;
			initialBalance = web3.eth.getBalance(lottery.address).toNumber();

			lottery.betPrice.call().then(function (_betPrice) {
				betPrice = _betPrice;
			}).then(function () {
				return lottery.placeBet(12345, { from: accounts[1], value: betPrice });
				// return lottery.placeBet(12345, { from: accounts[1], value: web3.toWei(betPrice, 'ether') });
			}).then(function () {
				return lottery.placeBet(54321, { from: accounts[2], value: betPrice });
				// return lottery.placeBet(54321, { from: accounts[2], value: web3.toWei(betPrice, 'ether') });
			}).then(function () {
				return lottery.placeBet(54321, { from: accounts[3], value: betPrice });
				// return lottery.placeBet(12323, { from: accounts[3], value: web3.toWei(betPrice, 'ether') });
			}).then(assert.fail)
				.catch(function (error) { })
				.then(function () {
					finalBalance = web3.eth.getBalance(lottery.address).toNumber();
					// finalBalance = web3.fromWei(web3.eth.getBalance(lottery.address).toNumber(), 'ether');
					return lottery.numBets.call();
				}).then(function (_numBets) {
					numBets = _numBets;
					return lottery.bets.call(accounts[1]);
				}).then(function (_bet1) {
					bet1 = _bet1;
					return lottery.bets.call(accounts[2]);
				}).then(function (_bet2) {
					bet2 = _bet2;
					return lottery.bets.call(accounts[3]);
				}).then(function (_bet3) {
					bet3 = _bet3;
					return lottery.active.call();
				}).then(function (_active) {
					active = _active;

					// console.log('betPrice: ' + betPrice);
					// console.log('account[0] final balance: ' + web3.fromWei(finalBalance, 'ether'));
					// console.log('bet1: ' + bet1);
					// console.log('bet2: ' + bet2);
					// console.log('bet3: ' + bet3);
					// console.log('active: ' + active);
					// console.log('account 1 balance: ' + web3.fromWei(web3.eth.getBalance(accounts[1]), 'ether').toNumber());
					// console.log('account 3 balance: ' + web3.fromWei(web3.eth.getBalance(accounts[3]), 'ether').toNumber());


					assert.equal(finalBalance, initialBalance + betPrice * 2, "Final balance must be initialBalance + betPrice");
					assert.equal(numBets, 2, "numBets should be 2");
					assert.equal(active, false, "lottery should be inactive");
				});
		});
	});
});