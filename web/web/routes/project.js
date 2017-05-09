var express = require('express');
var router = express.Router();
var db = require('./database.js');
var url = require('url');

router.param('pid', function(req, res, next, pid) {

	req.pid = pid;
	next();	
});

router.param('star', function(req, res, next, star) {

	req.star = star;
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
			info1.uid = results[0].uid;
			info1.pid= results[0].pid;
			info1.Pname= results[0].Pname;
			info1.current_amount = results[0].current_amount;
			info1.max_fund = results[0].max_fund;
			info1.percent = (info1.current_amount/info1.max_fund )*100 + '%';
			info1.pstatus = results[0].pstatus;
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
	var sql25 = "select AVG(score) as rates from Rate group by rpid having rpid = "+req.pid;
  	db.query(sql25,function(req,results,next){
  		if(results){
  			info1.rate = results[0].rates;
  	    }
  		else 
  			info1.rate = 'none';
  	}); 

	var sql3 = "select * from likes where luid = " + uid + " and lpid = " + req.pid;
	db.query(sql3, function(req,results){
		var is_like;
		if (results == ""){
			is_like = '1';
		}
		else{
			is_like = '0';
			}
		res.render('project_main',{info : arr,
			user :uid,
			uid: info1.uid,
			rate:info1.rate,
			des : info1.des,
			Pname:info1.Pname,
			current_amount :info1.current_amount,
			max_fund :info1.max_fund,
			pid: info1.pid,
			pstatus: info1.pstatus,
			is_like : is_like,
		    donate_percent : info1.percent
		});
	 });

});

router.get('/:pid/comment', function(req,res,next){
	var uid = req.session.user;
	var pid = req.pid;
	var com = req.query.comment;
	var sql = "INSERT INTO comment values (" + uid +", " +pid +",'" +com + "', now())";
	db.query(sql, function(results){
		res.redirect('/project/' + req.pid);
	});
});

router.post('/result', function(req, res, next) {
	var searchtext = [req.body.searchtext];
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
	//console.log(sql);
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
router.get('/like',function(req,res,next){
	var uid = [req.session.user];
	var pid = [req.pid];
	var sqlparams = uid.concat(pid);
	sql = "INSERT INTO LIKES VALUES(?,?)";
	db.query(sql,sqlparams, function(res,results){
		
	});
	res.redirect('/project/' + pid);
});

router.get('/dislike',function(req,res,next){
	var uid = [req.session.user];
	var pid = [req.pid];
	var sqlparams = uid.concat(pid);
	sql = "DELETE FROM LIKES WHERE luid =? and lpid = ? " ;
	db.query(sql,sqlparams, function(results){
		
	});
	res.redirect('/project/' + pid);
	

});

router.get('/close/:pid', function(req,res,next){
	var sql = "UPDATE project set pstatus = 'completed' where pid = ?";
	var sqlparam = [req.pid];
	db.query(sql,sqlparam,function(result){});
});

router.get('/rate/:pid/:star', function(req,res){
	var sql = "INSERT INTO rate values(?,?,?)";
	var sqlparams = [req.pid];
	var uid = [req.session.user];
	var star = [req.star];
    sqlparams = uid.concat(sqlparams);
    sqlparams = sqlparams.concat(star);
	db.query(sql,sqlparams,function(req,res,next){
		
	});
	
});


module.exports = router;