var abi;
//TODO: need a better way of loading the abi into the browser js
$.getJSON("/build/contracts/EthereumLottery.json", function (json) {
	// console.log("json: " + JSON.stringify(json));
	abi = json;
});

// import $ from 'jquery';
// import { default as Web3 } from 'web3';
// import { default as contract } from 'truffle-contract';

$(document).ready(function () {
	console.log('[ethereum-js]');

	if (typeof web3 !== 'undefined') {
		// Use Mist/MetaMask's provider
		window.web3 = new Web3(web3.currentProvider);
	} else {
		// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
		window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	}

	// // var account;
	var accounts;

	//test inteaction with web3
	updateAccountsTable();

	function updateAccountsTable() {
		var table = $('<table><th>Accounts</th><th>Balances</th></table>');

		web3.eth.getAccounts(function (error, _accounts) {
			accounts = _accounts;
			var balances;

			for (var i = 0; i < accounts.length; i++) {
				var row = $('<tr></tr>');
				var accountCell = $('<td id="account' + i + '"></td>').text(accounts[i]);
				var balanceCell = $('<td id="balance' + i + '"></td>');

				row.append(accountCell);
				row.append(balanceCell);
				table.append(row);
			}

			$('#accounts').append(table);

			for (var j = 0; j < accounts.length; j++) {
				updateBalance(j);
			}

		});

	}

	function updateBalance(index) {
		web3.eth.getBalance(accounts[index], function (error, balance) {
			balance = web3.fromWei(balance, 'ether');
			$('#balance' + index).text(balance);
		});
	}

	// test interaction with deployed contract
	var EthereumLottery = TruffleContract(abi);
	EthereumLottery.setProvider(web3.currentProvider);

	updateEthereumLottery();
	updateCurrentLottery();

	function updateEthereumLottery() {
		var future;
		var quota;
		var betPrice;
		var numLotteries;
		var ethereum_lottery;

		var table = $('<table></table>');

		EthereumLottery.deployed().then(function (instance) {
			ethereum_lottery = instance;
			return ethereum_lottery.currentLottery.call();
		}).then(function (currentLottery) {
			console.log('currentLottery: ' + currentLottery);
			table.append($('<tr><td>current lottery</td><td>' + currentLottery + '</td></tr>'));
			return ethereum_lottery.future.call();
		}).then(function (future) {
			table.append($('<tr><td>future</td><td>' + future + '</td></tr>'));
			return ethereum_lottery.quota.call();
		}).then(function (quota) {
			table.append($('<tr><td>quota</td><td>' + quota + '</td></tr>'));
			return ethereum_lottery.betPrice.call();
		}).then(function (betPrice) {
			table.append($('<tr><td>betPrice</td><td>' + betPrice + '</td></tr>'));

			$('#ethereum-lottery').append(table);
		});
	}

	function updateCurrentLottery() {
		var id;
		var numBets;
		var players;
		var ethereum_lottery;

		var table = $('<table></table>');

		EthereumLottery.deployed().then(function (instance) {
			ethereum_lottery = instance;
			return ethereum_lottery.currentLottery.call();
		}).then(function (currentLottery) {
			console.log('currentLottery: ' + currentLottery);
			table.append($('<tr><td>lottery id</td><td>' + currentLottery + '</td></tr>'));
			return ethereum_lottery.getNumBets.call(currentLottery.toNumber());
		}).then(function (numBets) {
			table.append($('<tr><td>num bets</td><td>' + numBets + '</td></tr>'));

			$('#current-lottery').append(table);
		});

	}

});

// window.onLoad = function () {
// 	console.log('[ethereum-js');
// };


// window.addEventListener('load', function () {
// 	// Checking if Web3 has been injected by the browser (Mist/MetaMask)
// 	if (typeof web3 !== 'undefined') {
// 		console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
// 		// Use Mist/MetaMask's provider
// 		window.web3 = new Web3(web3.currentProvider);
// 	} else {
// 		console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
// 		// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
// 		window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// 	}

// 	App.start();
// });
