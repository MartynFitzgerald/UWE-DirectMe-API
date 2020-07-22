/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 06/08/2020
|
|    File Name:  review.js  
|  Description:  This is the functions that retrieve the review's information
|                of the user's request which is then constructed and send to
|                a crud functionality.
*===========================================================================*/
var crud = require('../models/crud');
var check = require('../models/check');
/* 
  Review
*/
exports.get_all = function(req, res, next) {
  check.key(req.params.key, function(accepted){
    if(accepted){
      crud.read(`SELECT * FROM review;`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};
exports.get_by_user_id = function(req, res, next) {
  check.key(req.params.key, function(accepted){
    if(accepted){
      crud.read(`SELECT * FROM review WHERE user_id="${req.param('user_id')}";`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};
exports.get_by_car_park_id = function(req, res, next) {
  check.key(req.params.key, function(accepted){
    if(accepted){
      crud.read(`SELECT * FROM review WHERE car_park_id="${req.param('car_park_id')}";`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};
exports.insert = function(req, res, next) {
  check.key(req.params.key, function(accepted){
    if(accepted){
      crud.insert(`INSERT IGNORE INTO review (review_id, description, rating, car_park_id, user_id) VALUES ("${req.body.review_id}", "${req.body.description}", "${req.body.rating}", "${req.body.car_park_id}", "${req.body.user_id}");`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};
exports.update_by_id = function(req, res, next) {
  check.key(req.params.key, function(accepted){
    if(accepted){
      crud.update(`UPDATE review SET description="${req.body.description}", rating=${req.body.rating}, car_park_id=${req.body.car_park_id}, user_id=${req.body.user_id} WHERE review_id="${req.body.review_id}";`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};
exports.delete_by_id = function(req, res, next) {
  check.key(req.params.key, function(accepted){
    if(accepted){
      crud.del(`DELETE FROM review WHERE review_id="${req.body.review_id}"`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};