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
var functions = require('./functions');

exports.get_all = function(req, res, next) {
  functions.fetch(`SELECT * FROM user;`, req, res, next);
}

exports.get_by_email_address = function(req, res, next) {
  functions.fetch(`SELECT * FROM user WHERE email_address='${req.param('emailAddress')}';`, req, res, next);
}

exports.insert = function(req, res, next) {
  functions.insert(`INSERT IGNORE INTO user (fName, lName, email_address, password, phone_number, darkmode, radius) VALUES ('${req.body.fName}', '${req.body.lName}', '${req.body.email_address}', '${req.body.password}', '${req.body.phone_number}', '${req.body.darkmode}', '${req.body.radius}');`, req, res, next);
}

exports.delete_by_email_address = function(req, res, next) {
  functions.delete(`DELETE FROM user WHERE id='${req.param('emailAddress')}'`, req, res, next);
}
