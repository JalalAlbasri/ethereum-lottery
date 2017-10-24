var express = require('express');
var router = express.Router();
var blockCypher = require('../modules/blockCypher/blockCypher.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Ethreum Lottery' });
});

router.post('/blockCypherCallback', function (req, res, next) {
  blockCypher.handleBlockCypherCallback(req.body, function (error) {
    if (error) next(error);
    else
      res.sendStatus(200);
  });
});

module.exports = router;
