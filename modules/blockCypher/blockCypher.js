var request = require('request');

exports.handleBlockCypherCallback = function (body, callback) {
	console.log('[blockCypher] handleBlockCypherCallback(), body: ' + body.height);
	callback();
};

exports.registerBlockCypherWebHook = function () {
	console.log('[blockCypher] registerBlockCypherWebHook()');

	//TODO: put token in env variables
	request.post({
		url: 'https://api.blockcypher.com/v1/eth/main/hooks?token=694d1ef5792c4931983414ba32e6000a',
		json: true,
		body: {
			event: 'new-block',
			url: 'http://ethereum-lottery.herokuapp.com/blockCypherCallback'
		}
	}, function (error, response, body) {
		console.log('[blockCypher] registerBlockCypherWebHook(), respose: ' + JSON.stringify(response));

		//call smartcontract to let it know block updated...



	});
};