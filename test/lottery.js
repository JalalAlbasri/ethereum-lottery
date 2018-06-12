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

		EthereumLottery.new().then(function (instance) { //with constructor
			ethereum_lottery = instance;
			contractInitialBalance = web3.fromWei(web3.eth.getBalance(ethereum_lottery.address), 'ether').toNumber();
			account1InitialBalance = web3.fromWei(web3.eth.getBalance(accounts[1]), 'ether').toNumber();

			ethereum_lottery.betPrice.call().then(function (_betPrice) {
				betPrice = _betPrice;
			}).then(function () {
				return ethereum_lottery.placeBet(111, { from: accounts[1], value: betPrice });
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
				assert.equal(bet, 111, "player[0] bet should be 123");
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

		EthereumLottery.new().then(function (instance) { //with constructor
			ethereum_lottery = instance;
			contractInitialBalance = web3.fromWei(web3.eth.getBalance(ethereum_lottery.address), 'ether').toNumber();
			account1InitialBalance = web3.fromWei(web3.eth.getBalance(accounts[1]), 'ether').toNumber();
			account2InitialBalance = web3.fromWei(web3.eth.getBalance(accounts[2]), 'ether').toNumber();

			ethereum_lottery.betPrice.call().then(function (_betPrice) {
				betPrice = _betPrice;
			}).then(function () {
				return ethereum_lottery.placeBet(111, { from: accounts[1], value: betPrice });
			}).then(function () {
				return ethereum_lottery.getPlayerAddress.call(0, 0);
			}).then(function (_playerAddress1) {
				playerAddress1 = _playerAddress1;
				return ethereum_lottery.getPlayerBet.call(0, 0);
			}).then(function (_bet1) {
				bet1 = _bet1;
				return ethereum_lottery.placeBet(222, { from: accounts[2], value: betPrice });
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
				assert.equal(bet1, 111, "player[0] bet should be 123");
				assert.equal(bet2, 222, "player[1] bet should be 123");
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

		EthereumLottery.new().then(function (instance) { //with constructor
			ethereum_lottery = instance;
			contractInitialBalance = web3.fromWei(web3.eth.getBalance(ethereum_lottery.address), 'ether').toNumber();
			account3InitialBalance = web3.fromWei(web3.eth.getBalance(accounts[3]), 'ether').toNumber();

			ethereum_lottery.betPrice.call().then(function (_betPrice) {
				betPrice = _betPrice;
			}).then(function () {
				return ethereum_lottery.placeBet(111, { from: accounts[1], value: betPrice });
			}).then(function () {
				return ethereum_lottery.placeBet(222, { from: accounts[2], value: betPrice });
			}).then(function () {
				return ethereum_lottery.placeBet(333, { from: accounts[3], value: betPrice });
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

	it("should place 2 bets, one bet wins and gets the payout, the other gets nothing", function (done) {
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
		var draw;
		var payoutsLength;

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
				return ethereum_lottery.placeBet(222, { from: accounts[2], value: betPrice });
			}).then(function () {
				return ethereum_lottery.getPlayerAddress.call(0, 1);
			}).then(function (_playerAddress2) {
				playerAddress2 = _playerAddress2;
				return ethereum_lottery.getPlayerBet.call(0, 1);
			}).then(function (_bet2) {
				bet2 = _bet2;
				return ethereum_lottery.draw();
			}).then(function () {
				return ethereum_lottery.getDraw.call(0);
			}).then(function (_draw) {
				draw = _draw;
				return ethereum_lottery.getPayoutsLength.call(0);
			}).then(function (_payoutsLength) {
				payoutsLength = _payoutsLength;
				return ethereum_lottery.getNumBets.call(0);
			}).then(function (_numBets) {
				numBets = _numBets;

				// console.log('account 1: ' + accounts[1]);
				// console.log('player 1 address: ' + playerAddress1);
				// console.log('player 1 bet: ' + bet1);

				contractFinalBalance = web3.fromWei(web3.eth.getBalance(ethereum_lottery.address), 'ether').toNumber();
				account1FinalBalance = web3.fromWei(web3.eth.getBalance(accounts[1]), 'ether').toNumber();
				account2FinalBalance = web3.fromWei(web3.eth.getBalance(accounts[2]), 'ether').toNumber();

				// console.log('contract initial balance: ' + contractInitialBalance);
				// console.log('contract final balance: ' + contractFinalBalance);
				// console.log('account 1 initial balance: ' + account1InitialBalance);
				// console.log('account 1 final balance: ' + account1FinalBalance);
				// console.log('numBets: ' + numBets);

				// console.log('draw: ' + draw);
				// console.log('payoutsLength: ' + payoutsLength);

				contractBalanceDifference = contractFinalBalance - contractInitialBalance;
				account1BalanceDifference = Math.round(account1FinalBalance - account1InitialBalance);
				account2BalanceDifference = Math.round(account2FinalBalance - account2InitialBalance);

				// console.log('contract balance differnce: ' + contractBalanceDifference);
				// console.log('account 1 balance difference: ' + account1BalanceDifference);
				// console.log('account 2 balance difference: ' + account2BalanceDifference);

				assert.equal(numBets, 2, "numBets should be 2");
				assert.equal(playerAddress1, accounts[1], "player[0] should be accounts[1]");
				assert.equal(playerAddress2, accounts[2], "player[1] should be accounts[2]");
				assert.equal(bet1, 123, "player[0] bet should be 123");
        assert.equal(bet2, 222, "player[1] bet should be 222");
				assert.equal(contractBalanceDifference, 0, "contract balance should be 0 ether");
				assert.equal(account1BalanceDifference, 1, "account 1 balance should have increased by 1 ether");
				assert.equal(account2BalanceDifference, -1, "account 2 balance should have decreased by 1 ether");
				assert.equal(draw, 123, "the draw should be 123");
				assert.equal(payoutsLength, 1, "there should be one payout");
				done();
			});
		});
	});

	it("should place 2 bets, both bets lose and both accounts get refunded", function (done) {
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
		var draw;
		var payoutsLength;

		EthereumLottery.new().then(function (instance) { //with constructor
			ethereum_lottery = instance;
			contractInitialBalance = web3.fromWei(web3.eth.getBalance(ethereum_lottery.address), 'ether').toNumber();
			account1InitialBalance = web3.fromWei(web3.eth.getBalance(accounts[1]), 'ether').toNumber();
			account2InitialBalance = web3.fromWei(web3.eth.getBalance(accounts[2]), 'ether').toNumber();

			ethereum_lottery.betPrice.call().then(function (_betPrice) {
				betPrice = _betPrice;
			}).then(function () {
				return ethereum_lottery.placeBet(111, { from: accounts[1], value: betPrice });
			}).then(function () {
				return ethereum_lottery.getPlayerAddress.call(0, 0);
			}).then(function (_playerAddress1) {
				playerAddress1 = _playerAddress1;
				return ethereum_lottery.getPlayerBet.call(0, 0);
			}).then(function (_bet1) {
				bet1 = _bet1;
				return ethereum_lottery.placeBet(222, { from: accounts[2], value: betPrice });
			}).then(function () {
				return ethereum_lottery.getPlayerAddress.call(0, 1);
			}).then(function (_playerAddress2) {
				playerAddress2 = _playerAddress2;
				return ethereum_lottery.getPlayerBet.call(0, 1);
			}).then(function (_bet2) {
				bet2 = _bet2;
				return ethereum_lottery.draw();
			}).then(function () {
				return ethereum_lottery.getDraw.call(0);
			}).then(function (_draw) {
				draw = _draw;
				return ethereum_lottery.getPayoutsLength.call(0);
			}).then(function (_payoutsLength) {
				payoutsLength = _payoutsLength;
				return ethereum_lottery.getNumBets.call(0);
			}).then(function (_numBets) {
				numBets = _numBets;

				// console.log('account 1: ' + accounts[1]);
				// console.log('player 1 address: ' + playerAddress1);
				// console.log('player 1 bet: ' + bet1);

				contractFinalBalance = web3.fromWei(web3.eth.getBalance(ethereum_lottery.address), 'ether').toNumber();
				account1FinalBalance = web3.fromWei(web3.eth.getBalance(accounts[1]), 'ether').toNumber();
				account2FinalBalance = web3.fromWei(web3.eth.getBalance(accounts[2]), 'ether').toNumber();

				// console.log('contract initial balance: ' + contractInitialBalance);
				// console.log('contract final balance: ' + contractFinalBalance);
				// console.log('account 1 initial balance: ' + account1InitialBalance);
				// console.log('account 1 final balance: ' + account1FinalBalance);
				// console.log('numBets: ' + numBets);

				// console.log('draw: ' + draw);
				// console.log('payoutsLength: ' + payoutsLength);

				contractBalanceDifference = contractFinalBalance - contractInitialBalance;
				account1BalanceDifference = Math.round(account1FinalBalance - account1InitialBalance);
				account2BalanceDifference = Math.round(account2FinalBalance - account2InitialBalance);

				// console.log('contract balance differnce: ' + contractBalanceDifference);
				// console.log('account 1 balance difference: ' + account1BalanceDifference);
				// console.log('account 2 balance difference: ' + account2BalanceDifference);

				assert.equal(numBets, 2, "numBets should be 2");
				assert.equal(playerAddress1, accounts[1], "player[0] should be accounts[1]");
				assert.equal(playerAddress2, accounts[2], "player[1] should be accounts[2]");
				assert.equal(bet1, 111, "player[0] bet should be 123");
				assert.equal(bet2, 222, "player[1] bet should be 123");
				assert.equal(contractBalanceDifference, 0, "contract balance should be 0 ether");
				assert.equal(account1BalanceDifference, 0, "account 1 balance should have been refunded");
				assert.equal(account2BalanceDifference, 0, "account 2 balance should have been refunded");
				assert.equal(draw, 123, "the draw should be 123");
				assert.equal(payoutsLength, 0, "there should be no payouts");
				done();
			});
		});
	});

});