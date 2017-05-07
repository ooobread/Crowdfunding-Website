var express = require('express');
var router = express.Router();
var db = require('./database.js');
var url = require('url');

router.param('username', function(req, res, next, username) {
	// 对name进行验证或其他处理……
	console.log('param: '+username);
	req.username = username;
	next();	
});

router.get('/:username', function(req, res, next) {
	//console.log('get: '+ req.username);
	//var username = req.session.username;
	var sql = 'select uid, name, hometown, interest, credit_card from user where uid = ?' ;
 	var sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			res.render('startpage', {username: req.username,
 									 myusername: req.session.user});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			res.render('startpage', {information: results,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/projects', function(req, res, next) {
	//var username = req.session.username;
	var sql = 'select pname, description from project where pruid = ?' ;
 	var sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 		    var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {projects: arr,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			res.render('startpage', {projects: results,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/following', function(req, res, next) {
	//var username = req.session.username;
	var sql = 'select fuid2 from follow where fuid1 = ?' ;
 	var sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {following: arr,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			res.render('startpage', {following: results,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/follower', function(req, res, next) {
	//var username = req.session.username;
	var sql = 'select fuid1 from follow where fuid2 = ?' ;
 	var sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {follower: arr,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			res.render('startpage', {follower: results,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/pledges', function(req, res, next) {
	//var username = req.session.username;
	var sql = 'select project.pname, project.description from project, donate where project.pid = donate.dpid and donate.duid = ?' ;
 	var sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {pledge: arr,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			res.render('startpage', {pledge: results,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/comments', function(req, res, next) {
	//var username = req.session.username;
	var sql = 'select project.pname, comment.comments, comment.date from project, comment where project.pid = comment.cpid and comment.cuid = ?' ;
 	var sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {comment: arr,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			console.log('comments: '+req.username);
 			res.render('startpage', {comment: results,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/likes', function(req, res, next) {
	//var username = req.session.username;
	var sql = 'select project.pname, project.description from project, likes where project.pid = likes.lpid and likes.luid = ?' ;
 	var sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {like: arr,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			res.render('startpage', {like: results,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/rates', function(req, res, next) {
	//var username = req.session.username;
	var sql = 'select project.pname, project.description, rate.score from project, rate where project.pid = rate.rpid and rate.ruid = ?' ;
 	var sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {rate: arr,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			res.render('startpage', {rate: results,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/editprofile', function(req, res, next) {
	console.log('editprofile');
	var sql = 'select pwd, name, hometown, interest, credit_card from user where uid = ?' ;
 	var sqlParams = [req.username];
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('editcheck:no');
 		}
 		else{
 			console.log('editcheck:yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			res.render('editprofile', {username: req.username,
							   		   password: results[0].pwd,
							   		   name: results[0].name,
							   		   hometown: results[0].hometown,
							   		   interest: results[0].interest,
							   		   credit: results[0].credit_card});
 		}
 	});
	
});

router.post('/:username/updateprofile', function(req, res, next) {
	//console.log(req.username);
	var sql = 'select pwd, name, hometown, interest, credit_card from user where uid = ?' ;
 	var sqlParams = [req.username];
 	var password;
 	var name;
 	var hometown;
 	var interest;
 	var credit;
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('updatecheck:no');
 		}
 		else{
 			console.log('updatecheck:yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			var password = results[0].pwd;
 			var name = results[0].name;
 			var hometown = results[0].hometown;
 			var interest = results[0].interest;
 			var credit = results[0].credit_card;
 		}
 	});
 	if(password != req.body.inputPassword && req.body.inputPassword){
 		password = req.body.inputPassword;
 	}
 	if(name != req.body.inputName && req.body.inputName){
 		name = req.body.inputName;
 	}
 	if(hometown != req.body.inputHometown && req.body.inputHometown){
 		hometown = req.body.inputHometown;
 	}
 	if(interest != req.body.inputInterest && req.body.inputInterest){
 		interest = req.body.inputInterest;
 	}
 	if(credit != req.body.inputCredit && req.body.inputCredit){
 		credit = req.body.inputCredit;
 	}
	sql = 'update user set pwd=?, hometown=?, interest=?, credit_card=?, name=? where uid=?';
	sqlParams = [password, hometown, interest, credit, name, req.session.user];
	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('update:no');
 		}
 		else{
 			console.log('update:yes');
 			res.redirect('/account/'+req.session.user);
 		}
 	});

});

module.exports = router;