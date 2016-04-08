var express = require('express');
var router = express.Router();

var system = require('./api/system');

router.use('/api/system', system);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
