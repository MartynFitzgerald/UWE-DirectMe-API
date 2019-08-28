var request = require("request");
var dbController = require('./dbconnection');

exports.scraping_get_all = function(req, res, next) {
  res.status(200).json({
    message: 'Scrapings Locations Get All',
    Id : req.param.id
  });
}

exports.scraping_get_one = function(req, res, next) {
  res.status(200).json({
    message: 'Scrapings Locations Get',
    Id : req.param.id
  });
}

exports.scraping_insert_one = function(req, res, next) {
  res.status(201).json({
    message: 'Scrapings Locations Inserted',
  });
}

exports.scraping_delete_one = function(req, res, next) {
  res.status(200).json({
    message: 'Scrapings Locations Deleted',
    Id : req.param.id
  });
}