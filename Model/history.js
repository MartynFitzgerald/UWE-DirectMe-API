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
|  Description:  This is the functions that retreive the history's information  
|                of the user's request which is then constructed and send to 
|                a crud functionality.
*===========================================================================*/
var crud = require('./crudFunctionality');

/* 
  History
*/
exports.get_all = function(req, res, next) {
  crud.read(`SELECT * FROM history`, req, res, next);
}

exports.get_by_user_id = function(req, res, next) {
  crud.read(`SELECT * FROM history WHERE user_id="${req.param('user_id')}";`, req, res, next);
}

exports.get_by_car_park_id = function(req, res, next) {
  crud.read(`SELECT * FROM history WHERE car_park_id="${req.param('car_park_id')}";`, req, res, next);
}

exports.insert = function(req, res, next) {
  crud.create(`INSERT IGNORE INTO history (user_id, car_park_id) VALUES ("${req.body.user_id}", "${req.body.car_park_id}");`, req, res, next);
}

exports.delete_by_id = function(req, res, next) {
  crud.del(`DELETE FROM history WHERE user_id="${req.param('user_id')}" AND car_park_id="${req.body.car_park_id}"`, req, res, next);
}