var express = require('express');
var router = express.Router();
var db = require('./database.js');
var url = require('url');

router.param('username', function(req, res, next, username) {
	// 对name进行验证或其他处理……
	//console.log('param: '+username);
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

module.exports = router;