var express = require('express');
var router = express.Router();
var db = require('./database.js');

router.get('/post', function(req, res, next) {
 	res.render('post');
});

module.exports = router;