/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 06/08/2020
|
|    File Name:  scrapingLocation.js  
|  Description:  This is the functions that retrieve the scraping location's   
|                information of the user's request which is then constructed 
|                and send to a crud functionality.
*===========================================================================*/
var crud = require('../models/crud');
var check = require('../models/check');
/* 
  Scraping Location
*/
exports.get_all = async function(req, res, next) {
  check.key(req.params.key, function(accepted) {
    if (accepted) {
      crud.call(`SELECT * FROM scraping_location`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};
exports.get_by_id = function(req, res, next) {
  check.key(req.params.key, function(accepted) {
    if (accepted) {
      crud.call(`SELECT * FROM scraping_location WHERE scraping_location_id="${req.param('scraping_location_id')}"`, req, res, next);
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
      crud.call(`INSERT IGNORE INTO scraping_location (scraping_location_id, name, latitude, longitude, radius) VALUES ("${req.body.scraping_location_id}", "${req.body.name}", "${req.body.latitude}", "${req.body.longitude}", "${req.body.radius}");`, req, res, next);
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
      crud.call(`UPDATE scraping_location SET name="${req.body.name}", latitude=${req.body.latitude}, longitude=${req.body.longitude}, radius=${req.body.radius} WHERE scraping_location_id="${req.body.scraping_location_id}";`, req, res, next);
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
      crud.call(`DELETE FROM scraping_location WHERE scraping_location_id="${req.body.scraping_location_id}"`, req, res, next);
    } else {
      res.status(200).json({
        result: "An Error Has Occurred. Possibly, You Have Exceeded Amount Of Requests Or Invalid API Key"
      });
    }
  });
};