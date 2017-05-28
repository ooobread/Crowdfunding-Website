var express = require('express');
var router  = express.Router();
var path    = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
	//console.log('index');
	//console.log(req.session.user);
	if(req.session.user){
		res.redirect('/account/'+req.session.user+'/information');
	}
	else{
		res.render('login');
	}
	
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

module.exports = router;
