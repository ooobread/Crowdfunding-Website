var express = require('express');
var router = express.Router();
var db = require('./database.js');
var path    = require('path');

router.get('/checklogin', function(req, res, next) {
  var username = req.inputUserName;
  var password = req.inputPassword;
  var sql = 'select uid from user where ? in (select name from user) and ? in (select pwd from user where name= ? )' ;
  var sqlParams = [username, password, username];
  db.query(sql, sqlParams, function(results){
    console.log(results);
	  if(results == ''){
  		res.locals.error('User Name or Password Error!');
  		res.render('Login');
  	}
  	else{
  		res.locals.success('Success!!')
  		res.sendFile(path.join(__dirname, '../static_views/StartPage.html'));
 	}
  });
});

module.exports = router;
