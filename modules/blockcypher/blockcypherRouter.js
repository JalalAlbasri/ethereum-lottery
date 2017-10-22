var express = require('express');
var router = express.Router();
var blockcypherHandler = require('./blockcypherHandler');

router.get('/', function (req, res, next) {
	console.log('/blockcypher');
	res.sendStatus(200);
});

router.post('/', function (req, res, next) {
	blockcypherHandler.handleCallback(req, function (err) {
		if (err) next(err);
		else res.sendStatus(200);
	});
});

module.exports = router;