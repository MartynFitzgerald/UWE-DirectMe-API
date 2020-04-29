/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 23/07/2020
|
|    File Name:  user.js  
|  Description:  This is the functions that retreive the user's information
|                of the user's request which is then constructed and send to
|                a crud functionality.
*===========================================================================*/
var crud = require('./crudFunctionality');

/* 
  User
*/
exports.get_all = function(req, res, next) {
  crud.read(`SELECT * FROM user;`, req, res, next);
}

exports.get_by_email_address = function(req, res, next) {
  crud.read(`SELECT * FROM user WHERE email_address='${req.param('emailAddress')}';`, req, res, next);
}

exports.insert = function(req, res, next) {
  crud.create(`INSERT IGNORE INTO user (user_id, fName, lName, email_address, password, phone_number, darkmode, radius) VALUES ('${req.body.user_id}','${req.body.fName}', '${req.body.lName}', '${req.body.email_address}', '${req.body.password}', '${req.body.phone_number}', 0, 1500);`, req, res, next);
}

exports.update_by_id = function(req, res, next) {
  crud.update(`UPDATE user SET fName='${req.body.fName}', lName='${req.body.lName}', email_address='${req.body.email_address}', password='${req.body.password}', phone_number='${req.body.phone_number}', darkmode=${req.body.darkmode}, radius=${req.body.radius} WHERE user_id='${req.body.user_id}';`, req, res, next);
}

exports.delete_by_id = function(req, res, next) {
  crud.del(`DELETE FROM user WHERE user_id='${req.param('user_id')}'`, req, res, next);
}