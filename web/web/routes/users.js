var express = require('express');
var router = express.Router();
var db = require('./database.js');
//var path    = require('path');

router.post('/checklogin', function(req, res, next) {
  var username = req.body.inputUserName;
  var password = req.body.inputPassword;
  var sql = 'select uid from user where ? in (select uid from user) and ? in (select pwd from user where uid= ? )' ;
  var sqlParams = [username, password, username];
  //console.log(req.body.inputUserName);
  //console.log(req.body.inputPassword);
  db.query(sql, sqlParams, function(results){
    console.log(results);
	  if(results == ''){
      console.log('Error!');
  		//res.locals.error = 'User Name or Password Error!';
  		res.render('Login', {message:'again'});
  	}
  	else{
      console.log('Success!');
      req.session.user = username;
      req.session.pwd = password;
      //console.log(req.session.user);
      //console.log(req.session.pwd);
  		//res.locals.success('Success!!');
  		res.render('startpage');
 	}
  });
});


module.exports = router;
