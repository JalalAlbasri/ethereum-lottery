var request = require('request');
var Web3 = require('web3');
var provider = new Web3.providers.HttpProvider("http://localhost:8545");
var contract = require("truffle-contract");
var artifact = require("../../build/contracts/EthereumLottery.json");
var EthereumLottery;


exports.initBlockCypher = function () {
	console.log('[initBlockCypher]');
	EthereumLottery = contract(artifact);
	EthereumLottery.setProvider(provider);

	//see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
	EthereumLottery.currentProvider.sendAsync = function () {
		return EthereumLottery.currentProvider.send.apply(EthereumLottery.currentProvider, arguments);
	};

	// testContract();
	// pollBlockCypher(30000);
	// });

};

function testContract() {
	console.log('[blockCypher] testContract()');

	EthereumLottery.deployed().then(function (instance) {
		return instance.draw();
	}).then(function (success) {
		// console.log('[blockCypher] testContract(), blockHash: ' + blockHash);
		console.log('[blockCypher] testContract(), success: ' + success);
	});
}

exports.handleBlockCypherCallback = function (body, callback) {
	console.log('[blockCypher] handleBlockCypherCallback(), body.height: ' + body.height);
	callback();
};


var pollBlockCypher = function (rate) {
	console.log('[blockCypher] pollBlockCypher()');

	var url = "https://api.blockcypher.com/v1/eth/main";

	function poll() {
		console.log('[blockCypher] poll()]');
		request(url, function (error, response, body) {
			console.log('[blockCypher] poll()] response: ' + JSON.stringify(response));
			//Call the smart contract
			EthereumLottery.deployed().then(function (instance) {
				console.log('[blockCypher] testContract()');
				return instance.draw();
			}).then(function (success) {
				console.log('[blockCypher] testContract(), success: ' + success);
			});
		});

		setTimeout(poll, rate);
	}

	poll();
};

// exports.registerBlockCypherWebHook = function () {
// 	console.log('[blockCypher] registerBlockCypherWebHook()');

// 	//TODO: put token in env variables
// 	request.post({
// 		url: 'https://api.blockcypher.com/v1/eth/main/hooks?token=694d1ef5792c4931983414ba32e6000a',
// 		json: true,
// 		body: {
// 			event: 'new-block',
// 			url: 'http://ethereum-lottery.herokuapp.com/blockCypherCallback'
// 		}
// 	}, function (error, response, body) {
// 		console.log('[blockCypher] registerBlockCypherWebHook(), respose: ' + JSON.stringify(response));

// 		//call smartcontract to let it know block updated...



// 	});
// };