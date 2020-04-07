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
var functions = require('./functions');

exports.get_all = function(req, res, next) {
  functions.fetch(`SELECT * FROM scraping_location`, req, res, next);
}

exports.get_by_id = function(req, res, next) {
  functions.fetch(`SELECT * FROM scraping_location WHERE scraping_location_id='${req.param('id')}'`, req, res, next);
}

exports.insert = function(req, res, next) {
  functions.insert(`INSERT IGNORE INTO scraping_location (name, latitude, longitude, radius) VALUES ('${req.body.name}', '${req.body.latitude}', '${req.body.longitude}', '${req.body.radius}');`, req, res, next);
}

exports.delete_by_id = function(req, res, next) {
  functions.delete(`DELETE FROM scraping_location WHERE scraping_location_id='${req.param('id')}'`, req, res, next);
}