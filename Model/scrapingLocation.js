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
var crud = require('./crud_functionality');

/* 
  Scraping Location
*/
exports.get_all = function(req, res, next) {
  crud.read(`SELECT * FROM scraping_location`, req, res, next);
}

exports.get_by_id = function(req, res, next) {
  crud.read(`SELECT * FROM scraping_location WHERE scraping_location_id='${req.param('id')}'`, req, res, next);
}

exports.insert = function(req, res, next) {
  crud.create(`INSERT IGNORE INTO scraping_location (name, latitude, longitude, radius) VALUES ('${req.body.name}', '${req.body.latitude}', '${req.body.longitude}', '${req.body.radius}');`, req, res, next);
}

exports.delete_by_id = function(req, res, next) {
  crud.del(`DELETE FROM scraping_location WHERE scraping_location_id='${req.param('id')}'`, req, res, next);
}