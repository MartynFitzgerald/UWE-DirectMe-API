/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 06/08/2020
|
|    File Name:  externalProvider.js  
|  Description:  This is the functions that retrieve the external provider's   
|                information of the user's request which is then constructed 
|                and send to a crud functionality.
*===========================================================================*/
var crud = require('../models/crudFunctionality');
/* 
  External Provider
*/
exports.get_all = function(req, res, next) {
  crud.read(`SELECT * FROM external_provider;`, req, res, next);
}
exports.get_by_id = function(req, res, next) {
  crud.read(`SELECT * FROM external_provider WHERE external_provider_id="${req.param('external_provider_id')}";`, req, res, next);
}
exports.get_by_car_park_id = function(req, res, next) {
  crud.read(`SELECT * FROM external_provider WHERE car_park_id="${req.param('car_park_id')}";`, req, res, next);
}
exports.insert = function(req, res, next) {
  crud.insert(`INSERT IGNORE INTO external_provider (external_provider_id, name, place_id, reference, rating, user_ratings_total) VALUES ("${req.body.external_provider_id}","${req.body.name}", "${req.body.place_id}", "${req.body.reference}", "${req.body.rating}", "${req.body.user_ratings_total}");`, req, res, next);
}
exports.update_by_id = function(req, res, next) {
  crud.update(`UPDATE external_provider SET name="${req.body.name}", place_id="${req.body.place_id}", reference="${req.body.reference}", rating=${req.body.rating}, user_rating_total=${req.body.user_rating_total} WHERE external_provider_id="${req.body.external_provider_id}";`, req, res, next);
}
exports.delete_by_id = function(req, res, next) {
  crud.del(`DELETE FROM external_provider WHERE external_provider_id="${req.body.external_provider_id}"`, req, res, next);
}