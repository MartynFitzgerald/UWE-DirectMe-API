/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  30/03/2019
|
|    File Name:  scrapingLocation.js  
|  Description:  This is the logic behind the scraping location API which
|                includes GET ALL, GET ONE, INSERT ONE and DELETE ONE
*===========================================================================*/
var dbController = require('./dbconnection');

exports.get_all = function(req, res, next) {
  dbController.connection.query(`SELECT * FROM scraping_location`, function (error, results, fields) {
    console.log(results);
    if (results.length > 0) {
      res.status(200).json({
        result: results
      });
    }
    else if (results.length <= 0) {
      res.status(204);
    }
    else if (error) {
      throw error;
    }
  });
}

exports.get_by_id = function(req, res, next) {
  dbController.connection.query(`SELECT * FROM scraping_location WHERE scraping_location_id='${req.param('id')}'`, function (error, results, fields) {
    if (results.length > 0) {
      res.status(200).json({
        result: results
      });
    }
    else if (results.length <= 0) {
      res.status(204);
    }
    else if (error) {
      throw error;
    }
  });
}

exports.insert = function(req, res, next) {
  dbController.connection.query(`INSERT IGNORE INTO scraping_location (name, latitude, longitude, radius) VALUES ('${req.body.name}', '${req.body.latitude}', '${req.body.longitude}', ${req.body.radius});`, function (error, results, fields) {
    console.log(results);
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

exports.delete_by_id = function(req, res, next) {
  dbController.connection.query(`DELETE FROM scraping_location WHERE id='${req.param('id')}'`, function (error, results, fields) {
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