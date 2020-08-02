/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 03/08/2020
|
|    File Name:  crud.js  
|  Description:  These are the functions that are used to communicate with the
|                data stored in the database.
*===========================================================================*/
var dbController = require('./dbconnection');
/* 
  A function that requests certain types of data from database depending on the 
  sql string inputted declaring what table to gather the data from.
*/
exports.call = function(sql, req, res, next) {
  dbController.connection.query(sql, function(error, results, fields) {
    if (error) {
      console.error(`SQL - ${sql}`);
      throw error;
    } else if (results) {
      res.status(200).json({
        result: results
      });
    } else if (!results) {
      res.status(200).json({
        result: "404 - Error Encountered"
      });
    }
  });
};