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

exports.logbehavior = function(username, behavior, project, results){
	var sql = 'insert into behavior (buid, behave, bpid, bdate) values (?, ?, ?, now())';
	var sqlParams = [username, behavior, project];
	query(sql, salParams, function (data){
		results(data);
	});
};

