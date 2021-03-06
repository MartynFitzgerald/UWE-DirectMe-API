/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 03/08/2020
|
|    File Name:  history.js  
|  Description:  This is the functions that retrieve the history's information  
|                of the user's request which is then constructed and send to 
|                a crud functionality.
*===========================================================================*/
var crud = require('../models/crud');
var check = require('../models/check');
/* 
  History
*/
exports.get_all = function(req, res, next) {
  check.key(req.params.key, function(accepted) {
    if (accepted) {
      crud.call(`SELECT * FROM history`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};
exports.get_by_user_id = function(req, res, next) {
  check.key(req.params.key, function(accepted) {
    if (accepted) {
      crud.call(`SELECT * FROM history WHERE user_id="${req.param('user_id')}";`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};
exports.get_by_car_park_id = function(req, res, next) {
  check.key(req.params.key, function(accepted) {
    if (accepted) {
      crud.call(`SELECT * FROM history WHERE car_park_id="${req.param('car_park_id')}";`, req, res, next);
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
      crud.call(`INSERT IGNORE INTO history (user_id, car_park_id) VALUES ("${req.body.user_id}", "${req.body.car_park_id}");`, req, res, next);
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
      crud.call(`DELETE FROM history WHERE user_id="${req.param('user_id')}" AND car_park_id="${req.body.car_park_id}"`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};