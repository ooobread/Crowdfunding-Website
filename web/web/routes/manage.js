var express = require('express');
var router = express.Router();
var db = require('./database.js');

router.get('/projects', function(req, res, next) {
	var sql = 'select name from project where uid = ?' ;
 	var sqlParams = [req.session.user];
 	db.query(sql, sqlParams, function(results){
 		console.log(results);
 		if(results==''){
 			console.log('no');
 			res.render('startpage');
 		}
 		else{
 			console.log('yes');
 			console.log(results);
 			res.render('startpage', {pname: results});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

module.exports = router;