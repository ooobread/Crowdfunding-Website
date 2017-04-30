var express = require('express');
var router  = express.Router();
var path    = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('Login');
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

module.exports = router;
