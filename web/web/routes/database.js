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

