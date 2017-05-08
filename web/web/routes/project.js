var express = require('express');
var router = express.Router();
var db = require('./database.js');
var url = require('url');

router.param('pid', function(req, res, next, pid) {

	req.pid = pid;
	//console.log(req.pid);
	next();	
});


router.get('/:pid', function(req,res,next){
	var sql = "select * from project left join user on uid  = pruid where pid = ? ";
	var sqlParams = [req.pid];
	var uid = req.session.user;
	var arr = [];
	var info1 = {};
	db.query(sql, sqlParams, function(results,next){
			
			
			info1.des = results[0].description;
			info1.pid= results[0].pid;
			info1.Pname= results[0].Pname;
			info1.current_amount = results[0].current_amount;
			info1.max_fund = results[0].max_fund;
			//console.log(column.comment);
			
	});
	
	var sql2 = "select * from comment left join user on uid  = cuid where cpid = ? ORDER BY date DESC";
	
	db.query(sql2,sqlParams, function(results,next){
		
		for(i =0;i<results.length;i++){	
			var column = {};
			column.comment = results[i].comments;
			column.date = results[i].date;
			column.cuid = results[i].cuid;
			arr.push(column);
			//console.log(arr[i]);
		}
		
	});
		
	var sql3 = "select * from likes where luid = " + uid + " and lpid = " + req.pid;
	console.log(sql3);
	db.query(sql3, function(req,results){
	console.log(results);
		if (results == ""){
			console.log('0');
			res.render('project_main',{info : arr,
				des : info1.des,
				Pname:info1.Pname,
				current_amount :info1.current_amount,
				max_fund :info1.max_fund,
				pid: info1.pid,
				is_like : '0'
			 });
		}
		else{
			console.log('1');
			res.render('project_main',{info : arr,
				des : info1.des,
				Pname:info1.Pname,
				current_amount :info1.current_amount,
				max_fund :info1.max_fund,
				pid: info1.pid,
				is_like : '1'
			});
		}
			
	});
	
});

router.get('/:pid/comment', function(req,res,next){
	
	var uid = req.session.user;
	var pid = req.pid;
	var com = req.query.comment;
	var sql = "INSERT INTO comment values (" + uid +", " +pid +",'" +com + "', now())";


	console.log(sql);
	db.query(sql, function(results){
		res.redirect('/project/' + req.pid);
		
	});
	
});

router.post('/result', function(req, res, next) {
	var searchtext = req.body.searchtext;
	var searchselect = req.body.searchselect;
	if (searchselect == 'name'){
		var sql = "select Pname,description,pid from project where Pname like '%" + searchtext + "%'";
	}
	else if (searchselect == 'tag'){
		var sql = "select distinct Pname,description " +
				"from project,haveTag,Tag where project.pid = hpid and htid = tid and " +
				"tname like '%" + searchtext + "%'";
	}
	else {
		var sql = "select Pname,description from project,user where name =  '" +searchtext+"' and pruid = uid";
	}
	console.log(sql);
	db.query(sql, function(err, rows){
		  if(err){
	      console.log('Error!');
	  	
	  	}
	  	else{
	      console.log('Success!');
	      res.render('search',{rows,rows});
	      
	 	}
		
	  });
});
router.get('/like/:pid',function(req,res,next){
	var uid = req.session.user;
	var pid = [req.pid];
	//console.log(p);
	//console.log(uid);
	sql = "INSERT INTO LIKES VALUES(" + uid + "," + pid + ")";
	db.query(sql, function(res,next){
		
	});
	var sql = "select * from project left join user on uid  = pruid where pid = ? ";
	var sqlParams = [req.pid];
	var uid = req.session.user;
	var arr = [];
	var info1 = {};
	db.query(sql, sqlParams, function(results,next){
			
			
			info1.des = results[0].description;
			info1.pid= results[0].pid;
			info1.Pname= results[0].Pname;
			info1.current_amount = results[0].current_amount;
			info1.max_fund = results[0].max_fund;
			//console.log(column.comment);
			
	});
	
	var sql2 = "select * from comment left join user on uid  = cuid where cpid = ? ORDER BY date DESC";
	
	db.query(sql2,sqlParams, function(results,next){
		
		for(i =0;i<results.length;i++){	
			var column = {};
			column.comment = results[i].comments;
			column.date = results[i].date;
			column.cuid = results[i].cuid;
			arr.push(column);
			//console.log(arr[i]);
		}
		
	});
		
	var sql3 = "select * from likes where luid = " + uid + " and lpid = " + req.pid;
	console.log(sql3);
	db.query(sql3, function(req,results){
	console.log(results);
		if (results == ""){
			console.log('0');
			res.render('project_main',{info : arr,
				des : info1.des,
				Pname:info1.Pname,
				current_amount :info1.current_amount,
				max_fund :info1.max_fund,
				pid: info1.pid,
				is_like : '0'
			 });
		}
		else{
			console.log('1');
			res.render('project_main',{info : arr,
				des : info1.des,
				Pname:info1.Pname,
				current_amount :info1.current_amount,
				max_fund :info1.max_fund,
				pid: info1.pid,
				is_like : '1'
			});
		}
			
	});
	
});

router.get('/dislike/:pid',function(req,res,next){
	var uid = req.session.user;
	var pid = [req.pid];
	//console.log(p);
	//console.log(uid);
	sql = "DELETE FROM LIKES WHERE luid ="  + uid+ " and lpid =  " + pid;
	db.query(sql, function(res,next){
		
	});
	var sql = "select * from project left join user on uid  = pruid where pid = ? ";
	var sqlParams = [req.pid];
	var uid = req.session.user;
	var arr = [];
	var info1 = {};
	db.query(sql, sqlParams, function(results,next){
			
			
			info1.des = results[0].description;
			info1.pid= results[0].pid;
			info1.Pname= results[0].Pname;
			info1.current_amount = results[0].current_amount;
			info1.max_fund = results[0].max_fund;
			//console.log(column.comment);
			
	});
	
	var sql2 = "select * from comment left join user on uid  = cuid where cpid = ? ORDER BY date DESC";
	
	db.query(sql2,sqlParams, function(results,next){
		
		for(i =0;i<results.length;i++){	
			var column = {};
			column.comment = results[i].comments;
			column.date = results[i].date;
			column.cuid = results[i].cuid;
			arr.push(column);
			//console.log(arr[i]);
		}
		
	});
		
	var sql3 = "select * from likes where luid = " + uid + " and lpid = " + req.pid;
	console.log(sql3);
	db.query(sql3, function(req,results){
	console.log(results);
		if (results == ""){
			console.log('0');
			res.render('project_main',{info : arr,
				des : info1.des,
				Pname:info1.Pname,
				current_amount :info1.current_amount,
				max_fund :info1.max_fund,
				pid: info1.pid,
				is_like : '0'
			 });
		}
		else{
			console.log('1');
			res.render('project_main',{info : arr,
				des : info1.des,
				Pname:info1.Pname,
				current_amount :info1.current_amount,
				max_fund :info1.max_fund,
				pid: info1.pid,
				is_like : '1'
			});
		}
			
	});
	

});



module.exports = router;