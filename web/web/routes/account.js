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
	var sql = 'select username, name, hometown, interests, credit_card from user where username = ?' ;
 	var sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			res.render('startpage', {username: req.username});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			var arr = [];
 			for(var i = 0; i < results.length; i++){
 				var column = {};
 				column.username = results[i].username;
 				column.name = results[i].name;
 				column.hometown = results[i].hometown;
 				column.interests = results[i].interests;
 				if(req.username == req.session.user){
 					column.credit = results[i].credit_card;
 				}
 				arr.push(column);
 				//console.log(arr);
 			}
 			//console.log(req.session);
 			res.render('startpage', {information: arr,
 									 username: req.username});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/projects', function(req, res, next) {
	//var username = req.session.username;
	var sql = 'select name, description from project where username = ?' ;
 	var sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 		    var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {projects: arr,
 									 username: req.username});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			var arr = [];
 			for(var i = 0; i < results.length; i++){
 				var column = {};
 				column.name = results[i].name;
 				column.description = results[i].description;
 				arr.push(column);
 				//console.log(arr);
 			}
 			//console.log(req.session);
 			res.render('startpage', {projects: arr,
 									 username: req.username});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/following', function(req, res, next) {
	//var username = req.session.username;
	var sql = 'select uid2 from follow where uid1 = ?' ;
 	var sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {following: arr,
 									 username: req.username});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			var arr = [];
 			for(var i = 0; i < results.length; i++){
 				var column = {};
 				column.name = results[i].uid2;
 				arr.push(column);
 				//console.log(arr);
 			}
 			//console.log(req.session);
 			res.render('startpage', {following: arr,
 									 username: req.username});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/follower', function(req, res, next) {
	//var username = req.session.username;
	var sql = 'select uid1 from follow where uid2 = ?' ;
 	var sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {follower: arr,
 									 username: req.username});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			var arr = [];
 			for(var i = 0; i < results.length; i++){
 				var column = {};
 				column.name = results[i].uid1;
 				arr.push(column);
 				//console.log(arr);
 			}
 			//console.log(req.session);
 			res.render('startpage', {follower: arr,
 									 username: req.username});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/pledges', function(req, res, next) {
	//var username = req.session.username;
	var sql = 'select project.name, project.description from project, donate where project.pid = donate.pid and donate.username = ?' ;
 	var sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {pledge: arr,
 									 username: req.username});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			var arr = [];
 			for(var i = 0; i < results.length; i++){
 				var column = {};
 				column.name = results[i].name;
 				column.description = results[i].description;
 				arr.push(column);
 				//console.log(arr);
 			}
 			//console.log(req.session);
 			res.render('startpage', {pledge: arr,
 									 username: req.username});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/comments', function(req, res, next) {
	//var username = req.session.username;
	var sql = 'select project.name, comment.comments, comment.date from project, comment where project.pid = comment.pid and comment.username = ?' ;
 	var sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {comment: arr,
 									 username: req.username});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			var arr = [];
 			for(var i = 0; i < results.length; i++){
 				var column = {};
 				column.pname = results[i].name;
 				column.comment = results[i].comments;
 				column.date = results[i].date;
 				arr.push(column);
 				//console.log(arr);
 			}
 			//console.log(req.session);
 			console.log('comments: '+req.username);
 			res.render('startpage', {comment: arr,
 									 username: req.username});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/likes', function(req, res, next) {
	//var username = req.session.username;
	var sql = 'select project.name, project.description from project, likes where project.pid = likes.pid and likes.username = ?' ;
 	var sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {like: arr,
 									 username: req.username});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			var arr = [];
 			for(var i = 0; i < results.length; i++){
 				var column = {};
 				column.pname = results[i].name;
 				column.description = results[i].description;
 				arr.push(column);
 				//console.log(arr);
 			}
 			//console.log(req.session);
 			res.render('startpage', {like: arr,
 									 username: req.username});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/rates', function(req, res, next) {
	//var username = req.session.username;
	var sql = 'select project.name, project.description, rate.score from project, rate where project.pid = rate.pid and rate.username = ?' ;
 	var sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {rate: arr,
 									 username: req.username});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			var arr = [];
 			for(var i = 0; i < results.length; i++){
 				var column = {};
 				column.pname = results[i].name;
 				column.description = results[i].description;
 				column.score = results[i].score;
 				arr.push(column);
 				//console.log(arr);
 			}
 			//console.log(req.session);
 			res.render('startpage', {rate: arr,
 									 username: req.username});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

module.exports = router;