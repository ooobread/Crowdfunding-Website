var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12321qwewq',
  database : 'project'
});
 
//connection.connect();

exports.query = function(sql, sqlparams, results){
	connection.query(sql, sqlparams, function (error, data) {
		if (error){
			throw error;
			//connection.end();
			//return;
		}
		else{
			results(data);
			//connection.end();
			//return;
		}
	});
};

exports.recent = function(username, results){
	var sql = 'select * from project.behavior where buid in (select fuid2 from follow where fuid1=?) order by bdate desc limit 10';
	var sqlParams = [username];
	connection.query(sql, sqlParams, function (error, data) {
		if (error){
			throw error;
			//connection.end();
			//return;
		}
		else{
			results(data);
			//connection.end();
			//return;
		}
	});
};


