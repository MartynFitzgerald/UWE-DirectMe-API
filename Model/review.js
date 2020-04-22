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
  Review
*/
exports.get_all = function(req, res, next) {
  crud.read(`SELECT * FROM review;`, req, res, next);
}

exports.get_by_user_id = function(req, res, next) {
  crud.read(`SELECT * FROM review WHERE user_id='${req.param('user_id')}';`, req, res, next);
}

exports.get_by_car_park_id = function(req, res, next) {
  crud.read(`SELECT * FROM review WHERE car_park_id='${req.param('car_park_id')}';`, req, res, next);
}

exports.insert = function(req, res, next) {
  crud.create(`INSERT IGNORE INTO review (description, rating, car_park_id, user_id) VALUES ('${req.body.description}', '${req.body.rating}', '${req.body.car_park_id}', '${req.body.user_id}');`, req, res, next);
}

exports.update_by_id = function(req, res, next) {
  crud.update(`UPDATE review SET description='${req.body.description}', rating=${req.body.rating}, car_park_id=${req.body.car_park_id}, user_id=${req.body.user_id} WHERE review_id='${req.body.id}';`, req, res, next);
}

exports.delete_by_id = function(req, res, next) {
  crud.del(`DELETE FROM review WHERE review_id='${req.param('id')}'`, req, res, next);
}