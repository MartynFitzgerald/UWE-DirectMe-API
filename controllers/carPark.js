/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 06/08/2020
|
|    File Name:  carParks.js  
|  Description:  This is the functions that retrieve the car park's information
|                of the user's request which is then constructed and send to
|                a crud functionality.
*===========================================================================*/
var crud = require('../models/crud');
var check = require('../models/check');
/* 
  Car Park
*/
exports.get_from_search_location = function(req, res, next) {
  //Find the car parks within the distance from the users point https://stackoverflow.com/questions/29916341/geo-location-radius-search-using-php-and-mysql
  var sql = `SELECT car_park.car_park_id, 
            car_park.name, 
            car_park.address, 
            car_park.latitude, 
            car_park.longitude, 
            car_park.last_updated_at, 
            car_park.scraping_location_id, 
            external_provider.rating as external_rating, 
            external_provider.user_ratings_total as external_amount_of_ratings, 
            ROUND(AVG(review.rating)) as internal_rating,
            COUNT(review.rating) as internal_amount_of_ratings,
            (SQRT(POW(69.1 * (car_park.latitude - "${req.param('latitude')}"), 2) + POW(69.1 * ("${req.param('longitude')}" - car_park.longitude) * COS(car_park.latitude / 57.3), 2)) * 1609.344) AS distance
            FROM car_park 
            INNER JOIN external_provider ON car_park.external_provider_id = external_provider.external_provider_id
            LEFT JOIN review ON car_park.car_park_id = review.car_park_id
            GROUP BY car_park_id
            HAVING distance < "${req.param('radius')}"
            ORDER BY distance
            LIMIT 15`;
  check.key(req.params.key, function(accepted){
    if(accepted){
      crud.read(sql, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};
exports.get_all = function(req, res, next) {
  check.key(req.params.key, function(accepted){
    if(accepted){
      crud.read(`SELECT * FROM car_park`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};
exports.get_by_id = function(req, res, next) {
  check.key(req.params.key, function(accepted){
    if(accepted){
      crud.read(`SELECT * FROM car_park WHERE car_park_id="${req.param('car_park_id')}"`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};
exports.get_by_external_provider_id = function(req, res, next) {
  check.key(req.params.key, function(accepted){
    if(accepted){
      crud.read(`SELECT * FROM car_park WHERE external_provider_id="${req.param('external_provider_id')}"`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};
exports.insert = function(req, res, next) {
  check.key(req.params.key, function(accepted){
    if(accepted){
      crud.insert(`INSERT IGNORE INTO car_park (car_park_id, name, address, latitude, longitude, last_updated_at, scraping_location_id, external_provider_id) VALUES ("${req.body.car_park_id}", "${ req.body.name}",  "${req.body.address}", "${req.body.latitude}", "${req.body.longitude}", "${req.body.last_updated_at}", "${req.body.scraping_location_id}", "${req.body.external_provider_id}");`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};
exports.update_by_id = function(req, res, next) {
  check.key(req.params.key, function(accepted){
    if(accepted){
      crud.update(`UPDATE car_park SET name="${req.body.name}", address="${req.body.address}", latitude=${req.body.latitude}, longitude=${req.body.longitude},  last_updated_at="${req.body.last_updated_at}", scraping_location_id=${req.body.scraping_location_id}, external_provider_id="${req.body.external_provider_id}" WHERE car_park_id=${req.body.car_park_id};`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};
exports.delete_by_id = function(req, res, next) {
  check.key(req.params.key, function(accepted){
    if(accepted){
      crud.del(`DELETE FROM car_park WHERE car_park_id="${req.body.car_park_id}"`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};