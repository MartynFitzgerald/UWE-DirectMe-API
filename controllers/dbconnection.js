var mysql = require('mysql');

exports.connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'Martyn',
    password : '',
    database : 'parking_Application'
  });