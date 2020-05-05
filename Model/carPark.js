/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 23/07/2020
|
|    File Name:  carparks.js  
|  Description:  This is the functions that retreive the car park's information
|                of the user's request which is then constructed and send to
|                a crud functionality.
*===========================================================================*/
var crud = require('./crudFunctionality');

/* 
  Car Park
*/
exports.get_from_user_location  = function(req, res, next) {
  /* 
      Find the car parks within the distance from the users point
      https://stackoverflow.com/questions/29916341/geo-location-radius-search-using-php-and-mysql
  */
  var sql = `SELECT *, (SQRT(POW(69.1 * (latitude - "${req.param('latitude')}"), 2) + POW(69.1 * ("${req.param('longitude')}" - longitude) * COS(latitude / 57.3), 2)) * 1609.344) AS distance
    FROM car_park HAVING distance < "${req.param('radius')}" ORDER BY distance`;

  crud.read(sql, req, res, next);
}

exports.get_all = function(req, res, next) {
  crud.read(`SELECT * FROM car_park`, req, res, next);
}

exports.get_by_id = function(req, res, next) {
  crud.read(`SELECT * FROM car_park WHERE car_park_id="${req.param('car_park_id')}"`, req, res, next);
}

exports.get_by_external_provider_id = function(req, res, next) {
  crud.read(`SELECT * FROM car_park WHERE external_provider_id="${req.param('external_provider_id')}"`, req, res, next);
}

exports.insert = function(req, res, next) {
  crud.create(`INSERT IGNORE INTO car_park (car_park_id, name, address, latitude, longitude, last_updated_at, scraping_location_id, external_provider_id) VALUES ("${req.body.car_park_id}", "${ req.body.name}",  "${req.body.address}", "${req.body.latitude}", "${req.body.longitude}", "${req.body.last_updated_at}", "${req.body.scraping_location_id}", "${req.body.external_provider_id}");`, req, res, next);
}

exports.update_by_id = function(req, res, next) {
  crud.update(`UPDATE car_park SET name="${req.body.name}", address="${req.body.address}", latitude=${req.body.latitude}, longitude=${req.body.longitude},  last_updated_at="${req.body.last_updated_at}", scraping_location_id=${req.body.scraping_location_id}, external_provider_id="${req.body.external_provider_id}" WHERE car_park_id=${req.body.car_park_id};`, req, res, next);
}


exports.delete_by_id = function(req, res, next) {
  crud.del(`DELETE FROM car_park WHERE car_park_id="${req.body.car_park_id}"`, req, res, next);
}