var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('judge-index', {
  	title: 'Scoring System'
  });
});

module.exports = router;
