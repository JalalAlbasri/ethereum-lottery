var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('blockCypherCallback', function (req, res, next) {
  console.log('[/blockCypherCallback] req.body: ' + JSON.stringify(req.body));
  res.sendStatus(200);
});

module.exports = router;
