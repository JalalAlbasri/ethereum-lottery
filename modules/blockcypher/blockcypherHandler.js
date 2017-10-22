exports.handleCallback = function (req, callback) {
	console.log('[blockcypherHandler] handleCallback, req.body: ' + JSON.stringify(req.body));
	callback();
};

