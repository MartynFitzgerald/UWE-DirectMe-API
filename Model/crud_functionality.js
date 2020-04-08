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
var dbController = require('../controllers/dbconnection');

/* 
  Scraping Locations
*/
exports.scraping_location_get_all = function(req, res, next) {
  fetch(`SELECT * FROM scraping_location`, req, res, next);
}

exports.scraping_location_get_by_id = function(req, res, next) {
  fetch(`SELECT * FROM scraping_location WHERE scraping_location_id='${req.param('id')}'`, req, res, next);
}

exports.scraping_location_insert = function(req, res, next) {
  insert(`INSERT IGNORE INTO scraping_location (name, latitude, longitude, radius) VALUES ('${req.body.name}', '${req.body.latitude}', '${req.body.longitude}', '${req.body.radius}');`, req, res, next);
}

exports.scraping_location_delete_by_id = function(req, res, next) {
  del(`DELETE FROM scraping_location WHERE scraping_location_id='${req.param('id')}'`, req, res, next);
}

/* 
  Car Parks
*/
exports.car_park_get_from_user_location  = function(req, res, next) {
  /* 
      Find the car parks within the distance from the users Point
      https://stackoverflow.com/questions/29916341/geo-location-radius-search-using-php-and-mysql
  */
  var sql = `SELECT *, (SQRT(POW(69.1 * (latitude - '${req.query.latitude}'), 2) + POW(69.1 * ('${req.query.longitude}' - longitude) * COS(latitude / 57.3), 2)) * 1609.344) AS distance
    FROM car_park HAVING distance < '${req.query.radius}' ORDER BY distance`;

  fetch(sql, req, res, next);
}

exports.car_park_get_all = function(req, res, next) {
  fetch(`SELECT * FROM car_park`, req, res, next);
}

exports.car_park_get_by_id = function(req, res, next) {
  fetch(`SELECT * FROM car_park WHERE car_park_id='${req.param('id')}'`, req, res, next);
}

exports.car_park_insert = function(req, res, next) {
  insert(`INSERT IGNORE INTO car_park (name, address, latitude, longitude, last_updated_at, scraping_location_id, external_provider_id) VALUES ('${ req.body.name}',  '${req.body.address}', '${req.body.latitude}', '${req.body.longitude}', '${req.body.last_updated_at}', '${req.body.scraping_location_id}', '${req.body.external_provider_id}');`, req, res, next);
}

exports.car_park_delete_by_id = function(req, res, next) {
  del(`DELETE FROM car_park WHERE car_park_id='${req.param('id')}'`, req, res, next);
}

/* 
  Users
*/
exports.user_get_all = function(req, res, next) {
  fetch(`SELECT * FROM user;`, req, res, next);
}

exports.user_get_by_email_address = function(req, res, next) {
  fetch(`SELECT * FROM user WHERE email_address='${req.param('emailAddress')}';`, req, res, next);
}

exports.user_insert = function(req, res, next) {
  insert(`INSERT IGNORE INTO user (fName, lName, email_address, password, phone_number, darkmode, radius) VALUES ('${req.body.fName}', '${req.body.lName}', '${req.body.email_address}', '${req.body.password}', '${req.body.phone_number}', '0', '1500');`, req, res, next);
}

exports.user_delete_by_email_address = function(req, res, next) {
  del(`DELETE FROM user WHERE id='${req.param('emailAddress')}'`, req, res, next);
}

function fetch(sql, req, res, next) {
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

function insert(sql, req, res, next) {
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

 function del(sql, req, res, next) {
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