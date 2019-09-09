/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  30/03/2019
|
|    File Name:  scrapingLocations.js  
|  Description:  This is the logic behind the scraping location API which
|                includes GET ALL, GET ONE, INSERT ONE and DELETE ONE
*===========================================================================*/
var dbController = require('./dbconnection');

exports.scraping_get_all = function(req, res, next) {
  var sql = "SELECT * FROM scraping_location";

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
      throw error;
    }
  });
}

exports.scraping_get_one = function(req, res, next) {
  var id = req.param('id');
  var sql = `SELECT * FROM scraping_location WHERE id='${id}'`;
  
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
      throw error;
    }
  });
}

exports.scraping_insert_one = function(req, res, next) {
  var name = req.body.name;
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var radius = req.body.radius;

  var sql = `INSERT IGNORE INTO scraping_location (name, latitude, longitude, radius) VALUES ('${name}', '${latitude}', '${longitude}', ${radius});`;

  dbController.connection.query(sql, function (error, results, fields) {
    console.log(results);
    if (results.affectedRows > 0) {
      res.status(200).json({
        result: results
      });
    }
    else if (results.affectedRows <= 0) 
    {
      res.status(204);
    }
    else if (error)
    {
      throw error;
    }
  });
}

exports.scraping_delete_one = function(req, res, next) {
  var id = req.param('id');
  var sql = `DELETE FROM scraping_location WHERE id='${id}'`;
  
  dbController.connection.query(sql, function (error, results, fields) {
    if (results.affectedRows> 0) {
      res.status(200).json({
        result: results
      });
    }
    else if (results.affectedRows <= 0) 
    {
      res.status(204);
    }
    else if (error)
    {
      throw error;
    }
  });
}