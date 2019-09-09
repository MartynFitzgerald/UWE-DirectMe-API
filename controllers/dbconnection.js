/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  30/03/2019
|
|    File Name:  dbconnection.js  
|  Description:  This is the logic behind the MySQL database connection which
|                includes the login details for the database
*===========================================================================*/
var mysql = require('mysql');

exports.connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'parking'
  });