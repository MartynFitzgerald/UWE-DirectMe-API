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
var functions = require('./functions');

exports.get_from_user_location  = function(req, res, next) {
  /* 
      Find the car parks within the distance from the users Point
      https://stackoverflow.com/questions/29916341/geo-location-radius-search-using-php-and-mysql
  */
  var sql = `SELECT *, (SQRT(POW(69.1 * (latitude - '${req.query.latitude}'), 2) + POW(69.1 * ('${req.query.longitude}' - longitude) * COS(latitude / 57.3), 2)) * 1609.344) AS distance
    FROM car_park HAVING distance < '${req.query.radius}' ORDER BY distance`;

  functions.fetch(sql, req, res, next);
}

exports.get_all = function(req, res, next) {
  functions.fetch(`SELECT * FROM car_park`, req, res, next);
}

exports.get_by_id = function(req, res, next) {
  functions.fetch(`SELECT * FROM car_park WHERE car_park_id='${req.param('id')}'`, req, res, next);
}

exports.insert = function(req, res, next) {
  functions.insert(`INSERT IGNORE INTO car_park (name, address, latitude, longitude, last_updated_at, scraping_location_id, external_provider_id) VALUES ('${ req.body.name}',  '${req.body.address}', '${req.body.latitude}', '${req.body.longitude}', '${req.body.last_updated_at}', '${req.body.scraping_location_id}', '${req.body.external_provider_id}');`, req, res, next);
}

exports.delete_by_id = function(req, res, next) {
  functions.delete(`DELETE FROM car_park WHERE car_park_id='${req.param('id')}'`, req, res, next);
}