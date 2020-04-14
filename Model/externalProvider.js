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
  External Provider
*/
exports.get_all = function(req, res, next) {
  crud.read(`SELECT * FROM external_provider;`, req, res, next);
}

exports.get_by_id = function(req, res, next) {
  crud.read(`SELECT * FROM external_provider WHERE external_provider_id='${req.param('id')}';`, req, res, next);
}

exports.get_by_car_park_id = function(req, res, next) {
  crud.read(`SELECT * FROM external_provider WHERE car_park_id='${req.param('car_park_id')}';`, req, res, next);
}

exports.insert = function(req, res, next) {
  crud.create(`INSERT IGNORE INTO external_provider (name, place_id, reference, rating, user_rating_total, car_park_id) VALUES ('${req.body.name}', '${req.body.place_id}', '${req.body.reference}', '${req.body.user_rating_total}', '${req.body.car_park_id}');`, req, res, next);
}

exports.delete_by_id = function(req, res, next) {
  crud.del(`DELETE FROM external_provider WHERE external_provider_id='${req.param('id')}'`, req, res, next);
}