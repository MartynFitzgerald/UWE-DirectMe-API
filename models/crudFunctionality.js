/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 06/08/2020
|
|    File Name:  crudFunctionality.js  
|  Description:  These are the functions that are used to comunicate with the
|                data stored in the database.
*===========================================================================*/
var dbController = require('./dbconnection');
/* 
  A function that requests certain types of data from database depending on the 
  sql string inputted declaring what table to gather the data from.
*/
exports.read = function(sql, req, res, next) {
  dbController.connection.query(sql, function(error, results, fields) {
    if (error) {
      console.log(`SQL - ${sql}`);
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
}
/* 
  A function that insert certain types of data into the database depending on the 
  sql string inputted, declaring what table to insert the data from.
*/
exports.insert = function(sql, req, res, next) {
  dbController.connection.query(sql, function(error, results, fields) {
    if (error) {
      console.log(`SQL - ${sql}`);
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
}
/* 
  A function that updates certain types of data into the database depending on the 
  sql string inputted, declaring what table to update the data from.
*/
exports.update = function(sql, req, res, next) {
  dbController.connection.query(sql, function(error, results, fields) {
    if (error) {
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
}
/* 
  A function that deletes certain types of data in the database depending on the 
  sql string inputted, declaring what table to delete the data from.
*/
exports.del = function(sql, req, res, next) {
  dbController.connection.query(sql, function(error, results, fields) {
    if (results.affectedRows > 0) {
      res.status(200).json({
        result: results
      });
    } else if (results.affectedRows <= 0) {
      res.status(204);
    } else if (error) {
      throw error;
    }
  });
}