var mysql = require('mysql');
var connection;

if(process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: '1123581321w',
    database: 'burger_db'
  });
};

connection.connect(function(err){
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    } else {
    console.log('connected as id ' + connection.threadId);
};
});
module.exports = connection;
