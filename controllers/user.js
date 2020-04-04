/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  30/03/2019
|
|    File Name:  carparks.js  
|  Description:  This is the logic behind working out which carparks are within
|                their area they are searching for.
*===========================================================================*/
var dbController = require('./dbconnection');

exports.GetByEmailAddress = function(req, res, next) {
  var emailAddress = req.param('emailAddress');
  var sql = `SELECT * FROM user WHERE email_address='${emailAddress}'`;
  
  dbController.connection.query(sql, function (error, results, fields) {
    if (results.length > 0) {
      res.status(200).json({
        result: results
      });
    }
    else if (results.length <= 0) 
    {
      res.status(204);
    }
    else if (error)
    {
      console.error('Database connection failed: ' + error.stack);
      throw error;
    }
  });
}
