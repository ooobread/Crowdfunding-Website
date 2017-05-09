var express = require('express');
var router = express.Router();
var db = require('./database.js');
var url = require('url');

router.param('pid', function(req, res, next, pid) {

  req.pid = pid;
  next();	
});



router.get('/:pid',function(req,res,next){

  var uid = req.session.user;
  
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
	var sql25 = "select AVG(score) as rates from Rate group by rpid having rpid ="+req.pid;

	db.query(sql25,function(req,results,next){
  		if(results != ""){
  			info1.rate = results[0].rates;
  	    }
  		else 
  			info1.rate = 'none';

		res.render('pledge',{info : arr,
			user :uid,
			uid: info1.uid,
			rate:info1.rate,
			des : info1.des,
			Pname:info1.Pname,
			current_amount :info1.current_amount,
			max_fund :info1.max_fund,
			pid: info1.pid,
			pstatus: info1.pstatus,
		});
	 });
});

router.post('/:pid/check', function(req,res,next){

console.log(req.pid);
    var amount= req.body.amount;
    if(amount > 0){
		sql = 'INSERT INTO DONATE VALUES(?,?,?,now(),null)';
		var uid = req.session.user;
		sqlparams = [uid,req.pid,amount]
		db.query(sql,sqlparams,function(results){});
		
		sql = 'UPDATE project set current_amount = current_amount + ? where pid = ?';
		sqlparams = [amount,req.pid];
		db.query(sql,sqlparams,function(results){});
		res.redirect('/project/' + req.pid);
	}
	});



module.exports = router;