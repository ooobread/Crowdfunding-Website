var express = require('express');
var router = express.Router();
var db = require('./database.js');
//var path    = require('path');

router.post('/checklogin', function(req, res, next) {
  //console.log(req.body.inputPassword);
  var username = req.body.inputUserName;
  var password = req.body.inputPassword;
  var sql = 'select uid from user where ? in (select uid from user) and ? in (select pwd from user where uid= ? )' ;
  var sqlparams_results = [username];
  var sqlparams_condition = [password, username];
  var sqlparams = sqlparams_results.concat(sqlparams_condition);
  db.query(sql, sqlparams, function(results){
	  if(results == ''){
      console.log('Error!');
  		res.render('login', {message:'again'});
  	}
  	else{
      console.log('Success!');
      req.session.user = username;
      req.session.pwd = password;
      res.redirect('/account/'+username);
 	}
  });
});

router.get('/register', function(req, res, next) {
  //console.log(req.body.inputPassword);
  res.render('register');
});

router.post('/createuser', function(req, res, next) {
  //console.log(req.body.inputPassword);
  console.log(req.body.inputUsername);
  var username = req.body.inputUsername;
  var password = req.body.inputPassword;
  var name = req.body.inputName;
  var hometown = req.body.inputHometown;
  var interest = req.body.inputInterest;
  var sql = 'select * from user where ? in (select uid from user)';
  var sqlparams = [username];
  db.query(sql, sqlparams, function(results){
    if(results != ''){
      console.log('Register: Error!');
      res.render('register', {error: 'error'});
    }
    else{
      var sql = 'insert into user (uid, pwd, name, hometown, interest) values (?, ?, ?, ?, ?)' ;
      var sqlparams = [username, password, name, hometown, interest];
      db.query(sql, sqlparams, function(results){
        console.log('Register: Success!');
        req.session.user = username;
        req.session.pwd = password;
        res.redirect('/account/'+username);
      });
    }
  });
});

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
