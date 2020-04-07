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

exports.fetch = function(sql, req, res, next) {
  dbController.connection.query(sql, function (error, results, fields) {
    if (error) {
      throw error;
    }
    else if (results) {
      res.status(200).json({
        result: results
      });
    }
    else if (!results) {
      res.status(200).json({
        result: "404 - Error Encountered"
      });
    }
  });
}

exports.insert = function(sql, req, res, next) {
  dbController.connection.query(sql, function (error, results, fields) {
    if (results.affectedRows > 0) {
      res.status(200).json({
        result: results
      });
    }
    else if (results.affectedRows <= 0) {
      res.status(204);
    }
    else if (error) {
      throw error;
    }
  });
}

exports.delete = function(sql, req, res, next) {
  dbController.connection.query(sql, function (error, results, fields) {
    if (results.affectedRows> 0) {
      res.status(200).json({
        result: results
      });
    }
    else if (results.affectedRows <= 0) {
      res.status(204);
    }
    else if (error){ 
      throw error;
    }
  });
}