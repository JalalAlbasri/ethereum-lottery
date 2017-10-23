var request = require('request');
var Web3 = require('web3');
var provider = new Web3.providers.HttpProvider("http://localhost:8545");
var contract = require("truffle-contract");
// var artifactor = require("truffle-artifactor");
var artifact = require("../../build/contracts/Lottery.json");
// var abi = require("../../build/contracts/Lottery.json").abi;
var Lottery;


exports.initBlockCypher = function () {
	console.log('[initBlockCypher]');
	Lottery = contract(artifact);
	Lottery.setProvider(provider);

	//see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
	Lottery.currentProvider.sendAsync = function () {
		return Lottery.currentProvider.send.apply(Lottery.currentProvider, arguments);
	};

	testContract();
	// pollBlockCypher(30000);
	// });

};

function testContract() {
	console.log('[blockCypher] testContract()');

	Lottery.deployed().then(function (instance) {
		return instance.draw.call();
	}).then(function (success) {
		// console.log('[blockCypher] testContract(), blockHash: ' + blockHash);
		console.log('[blockCypher] testContract(), success: ' + success);
	});
}

exports.handleBlockCypherCallback = function (body, callback) {
	console.log('[blockCypher] handleBlockCypherCallback(), body.height: ' + body.height);
	callback();
};


pollBlockCypher = function (rate) {
	console.log('[blockCypher] pollBlockCypher()');

	var url = "https://api.blockcypher.com/v1/eth/main";

	function poll() {
		console.log('[blockCypher] poll()]');
		request(url, function (error, response, body) {
			console.log('[blockCypher] poll()] response: ' + JSON.stringify(response));
			//Call the smart contract
			Lottery.deployed().then(function (instance) {
				console.log('[blockCypher] testContract()');
				return instance.draw.call();
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