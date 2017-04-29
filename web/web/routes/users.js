var express = require('express');
var router = express.Router();
var db = require('./database.js');
var path    = require('path');

/* GET users listing. */
router.get('/checklogin', function(req, res, next) {
  var username = req.inputUserName;
  var password = req.inputPassword;
  var sql = 'select * from user where ? in (select name from user) and ? in (select pwd from user)' ;
  var sqlParams = [username, password];
  db.query(sql, sqlParams, function(results){
	  if(results == ''){
  		console.log('Not exist!!!');
  		res.alert('Not exist!');
  	}
  	else{
  		//console.log('users.js');
  		res.sendFile(path.join(__dirname, '../static_views/StartPage.html'));
 	}
  });
});

module.exports = router;
