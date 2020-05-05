/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 23/07/2020
|
|    File Name:  review.js  
|  Description:  This is the functions that retreive the review's information
|                of the user's request which is then constructed and send to
|                a crud functionality.
*===========================================================================*/
var crud = require('./crudFunctionality');

/* 
  Review
*/
exports.get_all = function(req, res, next) {
  crud.read(`SELECT * FROM review;`, req, res, next);
}

exports.get_by_user_id = function(req, res, next) {
  crud.read(`SELECT * FROM review WHERE user_id="${req.param('user_id')}";`, req, res, next);
}

exports.get_by_car_park_id = function(req, res, next) {
  crud.read(`SELECT * FROM review WHERE car_park_id="${req.param('car_park_id')}";`, req, res, next);
}

exports.insert = function(req, res, next) {
  crud.create(`INSERT IGNORE INTO review (review_id, description, rating, car_park_id, user_id) VALUES ("${req.body.review_id}", "${req.body.description}", "${req.body.rating}", "${req.body.car_park_id}", "${req.body.user_id}");`, req, res, next);
}

exports.update_by_id = function(req, res, next) {
  crud.update(`UPDATE review SET description="${req.body.description}", rating=${req.body.rating}, car_park_id=${req.body.car_park_id}, user_id=${req.body.user_id} WHERE review_id="${req.body.review_id}";`, req, res, next);
}

exports.delete_by_id = function(req, res, next) {
  crud.del(`DELETE FROM review WHERE review_id="${req.body.review_id}"`, req, res, next);
}