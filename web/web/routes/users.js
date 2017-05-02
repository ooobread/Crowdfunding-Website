var express = require('express');
var router = express.Router();
var db = require('./database.js');
//var path    = require('path');

router.post('/checklogin', function(req, res, next) {
  //console.log(req.body.inputPassword);
  var username = req.body.inputUserName;
  var password = req.body.inputPassword;
  var sql = 'select username from user where ? in (select username from user) and ? in (select pwd from user where username= ? )' ;
  var sqlparams_results = [username];
  var sqlparams_condition = [password, username];
  var sqlparams = sqlparams_results.concat(sqlparams_condition);
  //console.log(req.body.inputUserName);
  //console.log(req.body.inputPassword);
  db.query(sql, sqlparams, function(results){
	  if(results == ''){
      console.log('Error!');
  		//res.locals.error = 'User Name or Password Error!';
  		res.render('Login', {message:'again'});
  	}
  	else{
      console.log('Success!');
      //console.log(username);
      req.session.user = username;
      req.session.pwd = password;
      //console.log(results[0].uid);
      //console.log(req.session.user);
      //console.log(req.session.pwd);
  		//res.locals.success('Success!!');
  		res.render('startpage');
 	}
  });
});


module.exports = router;
