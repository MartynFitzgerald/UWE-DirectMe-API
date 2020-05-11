/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 23/07/2020
|
|    File Name:  scrapingLocation.js  
|  Description:  This is the functions that retreive the scraping location's   
|                information of the user's request which is then constructed 
|                and send to a crud functionality.
*===========================================================================*/
var crud = require('../models/crudFunctionality');

/* 
  Scraping Location
*/
exports.get_all = function(req, res, next) {
  crud.read(`SELECT * FROM scraping_location`, req, res, next);
}

exports.get_by_id = function(req, res, next) {
  crud.read(`SELECT * FROM scraping_location WHERE scraping_location_id="${req.param('scraping_location_id')}"`, req, res, next);
}

exports.insert = function(req, res, next) {
  crud.create(`INSERT IGNORE INTO scraping_location (scraping_location_id, name, latitude, longitude, radius) VALUES ("${req.body.scraping_location_id}", "${req.body.name}", "${req.body.latitude}", "${req.body.longitude}", "${req.body.radius}");`, req, res, next);
}

exports.update_by_id = function(req, res, next) {
  crud.update(`UPDATE scraping_location SET name="${req.body.name}", latitude=${req.body.latitude}, longitude=${req.body.longitude}, radius=${req.body.radius} WHERE scraping_location_id="${req.body.scraping_location_id}";`, req, res, next);
}

exports.delete_by_id = function(req, res, next) {
  crud.del(`DELETE FROM scraping_location WHERE scraping_location_id="${req.body.scraping_location_id}"`, req, res, next);
}