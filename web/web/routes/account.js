var express = require('express');
var router = express.Router();
var db = require('./database.js');
var url = require('url');
var fs = require('fs');
var multer = require('multer');


router.use(function(req, res, next){
	//console.log(req.files);
	db.recent(req.session.user, function(results){
		req.recent = results;
		//console.log(req.recent);
	});
	next();
});


router.param('username', function(req, res, next, username) {
	// 对name进行验证或其他处理……
	//console.log('param: '+username);
	req.username = username;
	next();	
});

router.param('location', function(req, res, next, location) {
	// 对name进行验证或其他处理……
	//console.log('param: '+username);
	req.location = location;
	next();	
});

router.post('/:username/uploadfile', function(req, res, next) {
	//console.log(req.files.InputFile.type);
	var upload = multer({ dest: 'uploads/'});
	upload.single('InputFile', function(req, res){
		console.log(req.file);
		res.redirect('/account/'+req.username+'/editprofile');
	});
	
});

router.get('/:username/information', function(req, res, next) {
	//console.log(req.recent);
	//var username = req.session.username;
	var user = {
		guest: 'false',
		followed: 'false'
	}
	var sql = 'select * from follow where ? in (select fuid2 from follow where fuid1 = ?)' ;
 	var sqlParams = [req.username, req.session.user];
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results!=''){
 			console.log('guest:yes');
 			user.followed = 'true';
 		}
 	});
 	console.log('guest:'+user.guest);
	if(req.username != req.session.user){
		user.guest = 'true';
	}
	sql = 'select uid, name, hometown, interest, credit_card from user where uid = ?' ;
 	sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			res.render('startpage', {recent: req.recent,
 									 location: 'information',
 									 user: user,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 		else{
 			console.log('yes');
 			//console.log(req.recent);
 			//console.log(results[0]);
 			//console.log(req.session);
 			res.render('startpage', {recent: req.recent,
 									 location: 'information',
 				 					 user: user,
 									 information: results,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/projects', function(req, res, next) {
	//var username = req.session.username;
	var user = {
		guest: 'false',
		followed: 'false'
	}
	var sql = 'select * from follow where ? in (select fuid2 from follow where fuid1 = ?)' ;
 	var sqlParams = [req.username, req.session.user];
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results!=''){
 			console.log('guest:yes');
 			user.followed = 'true';
 		}
 	});
	if(req.username != req.session.user){
		user.guest = 'true';
	}
	sql = 'select pid, pname, description from project where pruid = ?' ;
 	sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 		    var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {recent: req.recent,
 									 location: 'projects',
 									 user: user,
 									 projects: arr,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			res.render('startpage', {recent: req.recent,
 									 location: 'projects',
 									 user: user,
 									 projects: results,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/following', function(req, res, next) {
	//var username = req.session.username;
	var user = {
		guest: 'false',
		followed: 'false'
	}
	var sql = 'select * from follow where ? in (select fuid2 from follow where fuid1 = ?)' ;
 	var sqlParams = [req.username, req.session.user];
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results!=''){
 			console.log('guest:yes');
 			user.followed = 'true';
 		}
 	});
	if(req.username != req.session.user){
		user.guest = 'true';
	}
	sql = 'select fuid2 from follow where fuid1 = ?' ;
 	sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {recent: req.recent,
 									 location: 'following',
 									 user: user,
 									 following: arr,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			res.render('startpage', {recent: req.recent,
 									 location: 'following',
 									 user: user,
 									 following: results,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/follower', function(req, res, next) {
	//var username = req.session.username;
	var user = {
		guest: 'false',
		followed: 'false'
	}
	var sql = 'select * from follow where ? in (select fuid2 from follow where fuid1 = ?)' ;
 	var sqlParams = [req.username, req.session.user];
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results!=''){
 			console.log('guest:yes');
 			user.followed = 'true';
 		}
 	});
	if(req.username != req.session.user){
		user.guest = 'true';
	}
	sql = 'select fuid1 from follow where fuid2 = ?' ;
 	sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {recent: req.recent,
 									 location: 'follower',
 									 user: user,
 									 follower: arr,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			res.render('startpage', {recent: req.recent,
 									 location: 'follower',
 									 user: user,
 									 follower: results,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/pledges', function(req, res, next) {
	//var username = req.session.username;
	var user = {
		guest: 'false',
		followed: 'false'
	}
	var sql = 'select * from follow where ? in (select fuid2 from follow where fuid1 = ?)' ;
 	var sqlParams = [req.username, req.session.user];
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results!=''){
 			console.log('guest:yes');
 			user.followed = 'true';
 		}
 	});
	if(req.username != req.session.user){
		user.guest = 'true';
	}
	sql = 'select project.pid, project.pname, project.description, donate.amount, donate.date from project, donate where project.pid = donate.dpid and donate.duid = ?' ;
 	sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		console.log(results);
 		if(results==''){
 			console.log('no');
 			var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {recent: req.recent,
 									 location: 'pledges',
 									 user: user,
 									 pledge: arr,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			res.render('startpage', {recent: req.recent,
 									 location: 'pledges',
 									 user: user,
 									 pledge: results,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/comments', function(req, res, next) {
	//var username = req.session.username;
	var user = {
		guest: 'false',
		followed: 'false'
	}
	var sql = 'select * from follow where ? in (select fuid2 from follow where fuid1 = ?)' ;
 	var sqlParams = [req.username, req.session.user];
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results!=''){
 			console.log('guest:yes');
 			user.followed = 'true';
 		}
 	});
	if(req.username != req.session.user){
		user.guest = 'true';
	}
	sql = 'select project.pid, project.pname, comment.comments, comment.date from project, comment where project.pid = comment.cpid and comment.cuid = ?' ;
 	sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {recent: req.recent,
 									 location: 'comments',
 									 user: user,
 									 comment: arr,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			console.log('comments: '+req.username);
 			res.render('startpage', {recent: req.recent,
 									 location: 'comments',
 									 user: user,
 									 comment: results,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/likes', function(req, res, next) {
	//var username = req.session.username;
	var user = {
		guest: 'false',
		followed: 'false'
	}
	var sql = 'select * from follow where ? in (select fuid2 from follow where fuid1 = ?)' ;
 	var sqlParams = [req.username, req.session.user];
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results!=''){
 			console.log('guest:yes');
 			user.followed = 'true';
 		}
 	});
	if(req.username != req.session.user){
		user.guest = 'true';
	}
	sql = 'select project.pid, project.pname, project.description from project, likes where project.pid = likes.lpid and likes.luid = ?' ;
 	sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {recent: req.recent,
 									 location: 'likes',
 									 user: user,
 									 like: arr,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			res.render('startpage', {recent: req.recent,
 									 location: 'likes',
 									 user: user,
 									 like: results,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/rates', function(req, res, next) {
	//var username = req.session.username;
	var user = {
		guest: 'false',
		followed: 'false'
	}
	var sql = 'select * from follow where ? in (select fuid2 from follow where fuid1 = ?)' ;
 	var sqlParams = [req.username, req.session.user];
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results!=''){
 			console.log('guest:yes');
 			user.followed = 'true';
 		}
 	});
	if(req.username != req.session.user){
		user.guest = 'true';
	}
	sql = 'select project.pid, project.pname, project.description, rate.score from project, rate where project.pid = rate.rpid and rate.ruid = ?' ;
 	sqlParams = [req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			var arr = [];
 			arr.push('No Results');
 			res.render('startpage', {recent: req.recent,
 									 location: 'rates',
 									 user: user,
 									 rate: arr,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			res.render('startpage', {recent: req.recent,
 									 location: 'rates',
 									 user: user,
 									 rate: results,
 									 username: req.username,
 									 myusername: req.session.user});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/editprofile', function(req, res, next) {
	console.log('editprofile');
	var user = {
		guest: 'false',
		followed: 'false'
	}
	var sql = 'select * from follow where ? in (select fuid2 from follow where fuid1 = ?)' ;
 	var sqlParams = [req.username, req.session.user];
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results!=''){
 			console.log('guest:yes');
 			user.followed = 'true';
 		}
 	});
	if(req.username != req.session.user){
		user.guest = 'true';
	}
	sql = 'select pwd, name, hometown, interest, credit_card from user where uid = ?' ;
 	sqlParams = [req.username];
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
	//console.log(req.files.InputFile.type);
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
 			password = results[0].pwd;
 			name = results[0].name;
 			hometown = results[0].hometown;
 			interest = results[0].interest;
 			credit = results[0].credit_card;
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
 			res.redirect('/account/'+req.session.user+'/information');
 		}
 	});

});

router.get('/:username/follow/:location', function(req, res, next) {
	//var username = req.session.username;
	console.log('location: '+req.location);
	var user = {
		guest: 'false',
		followed: 'true'
	}
	if(req.username != req.session.user){
		user.guest = 'true';
	}
	//console.log(req.username);
	var sql = 'insert into follow (fuid1, fuid2) values (?, ?)' ;
 	var sqlParams = [req.session.user, req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			res.redirect('/account/'+req.username+'/'+req.location);
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			res.redirect('/account/'+req.username+'/'+req.location);
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/:username/unfollow/:location', function(req, res, next) {
	//var username = req.session.username;
	console.log('location: '+req.location);
	var user = {
		guest: 'true',
		followed: 'false'
	}
	//console.log(req.username);
	var sql = 'delete from follow where fuid1=? and fuid2=?' ;
 	var sqlParams = [req.session.user, req.username];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			res.redirect('/account/'+req.username+'/'+req.location);
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			//console.log(req.session);
 			res.redirect('/account/'+req.username+'/'+req.location);
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

module.exports = router;