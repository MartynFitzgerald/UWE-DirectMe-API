/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 03/08/2020
|
|    File Name:  user.js  
|  Description:  This is the functions that retrieve the user's information
|                of the user's request which is then constructed and send to
|                a crud functionality.
*===========================================================================*/
var crud = require('../models/crud');
var check = require('../models/check');
/* 
  User
*/
exports.get_all = function(req, res, next) {
  check.key(req.params.key, function(accepted) {
    if (accepted) {
      crud.call(`SELECT * FROM user;`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};
exports.get_by_email_address = function(req, res, next) {
  check.key(req.params.key, function(accepted) {
    if (accepted) {
      crud.call(`SELECT * FROM user WHERE email_address="${req.param('emailAddress')}";`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};
exports.insert = function(req, res, next) {
  check.key(req.params.key, function(accepted) {
    if (accepted) {
      crud.call(`INSERT IGNORE INTO user (user_id, fName, lName, email_address, password, phone_number, darkmode, radius, profile_picture, scheme) VALUES ("${req.body.user_id}","${req.body.fName}", "${req.body.lName}", "${req.body.email_address}", "${req.body.password}", "${req.body.phone_number}", "${req.body.darkmode}", "${req.body.radius}", "${req.body.profile_picture}", "${req.body.scheme}");`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};
exports.update_by_id = function(req, res, next) {
  check.key(req.params.key, function(accepted) {
    if (accepted) {
      crud.call(`UPDATE user SET fName="${req.body.fName}", lName="${req.body.lName}", email_address="${req.body.email_address}", password="${req.body.password}", phone_number="${req.body.phone_number}", darkmode=${req.body.darkmode}, radius=${req.body.radius}, profile_picture="${req.body.profile_picture}", scheme="${req.body.scheme}" WHERE user_id="${req.body.user_id}";`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};
exports.delete_by_id = function(req, res, next) {
  check.key(req.params.key, function(accepted) {
    if (accepted) {
      crud.call(`DELETE FROM user WHERE user_id="${req.body.user_id}"`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};