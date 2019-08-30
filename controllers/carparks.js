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

var request = require("request");
var dbController = require('./dbconnection');

var relevantCarParks;

function requestDataFromGoogleApi(url, nextPageToken = null, callback) {
  var currentUrl = url;

  if (nextPageToken) {
    currentUrl += "&pagetoken=" + nextPageToken;
  }

  request({url: currentUrl}, function(error, response, body) {
    var data = JSON.parse(body);

    for(var i = 0; i < data.results.length; i++){
      relevantCarParks.push(data.results[i]);
    }
    var nextPageToken = data.next_page_token;
    
    if (nextPageToken != null && nextPageToken != "") {

      setTimeout(function() {
        requestDataFromGoogleApi(url, nextPageToken, callback);
      }, 2000);

    } else {
      return callback(null, relevantCarParks);
    }
  });
}

function carparks_insert_all(res, lat, lng, radius) {
  // Create The URL to the API 
  var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=parking&radius=${radius}&location=${lat},${lng}&key=AIzaSyBeMKzk8ZpyU2Hk_lrVmlO-Ggq1tQqtYsM`
  requestDataFromGoogleApi(url, null, function(error, result) {
    if (result.length > 0) { //If there are results, then...
      for(var i = 0; i < result.length; i++)
      {
        var carpark = result[i];
        //console.log("carpark", carpark)

        var id = carpark.id;
        var name = carpark.name;
        var latitude = carpark.geometry.location.lat;
        var longitude = carpark.geometry.location.lng;
        var rating = carpark.rating;
        var userRatingsTotal = carpark.user_ratings_total;
        var photos = null;

        var sql = `INSERT IGNORE INTO carparks (id, name, latitude, longitude, rating, userRatingsTotal, photos) VALUES ('${id}', '${name}', '${latitude}', '${longitude}', ${rating}, ${userRatingsTotal}, ${photos});`;

        //TODO: before returning to the user, save all new records to the database
        dbController.connection.query(sql, function(error, result, fields) {
          //console.log(result);
        });
      }
      getDataFromDb(res, lat, lng, radius);
    } else {
      console.log("none saved");
    }
  });
}

function getDataFromDb(res, lat, lng, radius) {
  /* 
      Find the car parks within the distance from the users Point
      https://stackoverflow.com/questions/29916341/geo-location-radius-search-using-php-and-mysql
  */
  var sql = `SELECT name, latitude, longitude, SQRT(
      POW(69.1 * (latitude - '${lat}'), 2) +
      POW(69.1 * ('${lng}' - longitude) * COS(latitude / 57.3), 2)) AS distance
      FROM carparks HAVING distance < '${radius}' ORDER BY distance`;
  relevantCarParks = [];

  dbController.connection.query(sql, function (error, results, fields) {
    if (results.length > 0) {
        for (var i = 0; results.length > i; i++) {
            relevantCarParks.push(results[i]);
        }
        return res.json(relevantCarParks);
    }
    else if (results.length <= 0) 
    {
        carparks_insert_all(res, lat, lng, radius);
    }
    else if (error)
    {
        throw error;
    }
  });
}

exports.carparks_get_all = function(req, res, next) {
    // Get values from the GET request and set them as varibles.
    getDataFromDb(res, req.query.latitude, req.query.longitude, req.query.radius);
}
