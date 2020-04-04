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

exports.GetById = function(req, res, next) {
  var id = req.param('id');
  var sql = `SELECT * FROM car_park WHERE id='${id}'`;
  
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

exports.GetForUserLocation  = function(req, res, next) {
//:latitude/:longitude/:radius

  var latitude = req.query.latitude;
  var longitude = req.query.longitude;
  var radius = req.query.radius;
  /* 
      Find the car parks within the distance from the users Point
      https://stackoverflow.com/questions/29916341/geo-location-radius-search-using-php-and-mysql
  */
  var sql = `SELECT *, (SQRT(
    POW(69.1 * (latitude - '${latitude}'), 2) +
    POW(69.1 * ('${longitude}' - longitude) * COS(latitude / 57.3), 2)) * 1609.344) AS distance
    FROM car_park HAVING distance < '${radius}' ORDER BY distance`;

  dbController.connection.query(sql, function (error, results, fields) {
    if (error)
    {
      console.error('Database connection failed: ' + error.stack);
      throw error;
    }
    if (results.length > 0) {
      res.status(200).json({
        result: results
      });
    }
    else if (results.length <= 0) 
    {
      res.status(204);
    }
  });
}

exports.carpark_get_all = function(req, res, next) {
  var sql = "SELECT * FROM car_park";

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


/*
exports.scraping_insert_one = function(req, res, next) {
  var name = req.body.name;
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var radius = req.body.radius;

  var sql = `INSERT IGNORE INTO scrapinglocations (name, latitude, longitude, radius) VALUES ('${name}', '${latitude}', '${longitude}', ${radius});`;

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
  var sql = `DELETE FROM scrapinglocations WHERE id='${id}'`;
  
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
*/