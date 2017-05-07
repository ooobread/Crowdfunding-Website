var express = require('express');
var router = express.Router();
var db = require('./database.js');
var url = require('url');

router.param('pid', function(req, res, next, pid) {

	req.pid = pid;
	next();	
});


router.get('/:pid', function(req,res,next){
	var sql = "select * from project,comment,user where pid = ? and pid = cpid and uid = pruid";
	var sqlParams = [req.pid];
	db.query(sql, sqlParams, function(results){
	    console.log(results[0].pid);
		res.render('project_main',{results:results});
	});
});

router.post('/result', function(req, res, next) {
	var searchtext = req.body.searchtext;
	var searchselect = req.body.searchselect;
	console.log(searchtext);
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

module.exports = router;