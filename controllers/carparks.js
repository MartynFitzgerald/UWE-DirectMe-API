var request = require("request");
var dbController = require('../controllers/dbconnection');

var testData = [];
var relevantCarParks = [];

exports.carparks_get_all = function(req, res, next) {
    // Get values from the GET request and set them as varibles.
    var lat = req.query.lat;
    var lng = req.query.lng;
    var radius = req.query.radius;

    /* 
        Find the car parks within the distance from the users Point
        https://stackoverflow.com/questions/29916341/geo-location-radius-search-using-php-and-mysql
    */
    var sql = `SELECT name, latitude, longitude, SQRT(
        POW(69.1 * (latitude - '${lat}'), 2) +
        POW(69.1 * ('${lng}' - longitude) * COS(latitude / 57.3), 2)) AS distance
        FROM carparks HAVING distance < '${radius}' ORDER BY distance`;

    dbController.connection.query(sql, function (error, results, fields) {
        if (results.length > 0) {
            for (var i = 0; results.length > i; i++) {
                relevantCarParks.push(results[i]);
            }
            return res.json(relevantCarParks);
        }
        else if (results.length <= 0) 
        {
            return res.json('No data - Database Request Failed');
        }
        else if (error)
        {
            throw error;
        }
    });
}

function getParkingDataTwo(url, nextPageToken = null, callback) {
    var currentUrl = url;
  
    if (nextPageToken) {
      currentUrl += "&pagetoken=" + nextPageToken;
    }
    //console.log("currentUrl", currentUrl);
  
    request({url: currentUrl}, function(error, response, body) {
      var data = JSON.parse(body);
  
      testData.push(data);
  
      var nextPageToken = data.next_page_token;
      
      if (nextPageToken != null && nextPageToken != "") {
  
        setTimeout(function() {
          getParkingDataTwo(url, nextPageToken, callback);
        }, 2000);
  
      } else {
        return callback(null, testData);
      }
    });
  }

exports.carparks_insert_all = function(req, res, next) {
    // Create The URL to the API 
    //var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=parking&radius=${radius}&location=${lat},${lng}&key=AIzaSyBeMKzk8ZpyU2Hk_lrVmlO-Ggq1tQqtYsM`
    
    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=parking&radius=5000&location=51.454514,-2.587910&key=AIzaSyBeMKzk8ZpyU2Hk_lrVmlO-Ggq1tQqtYsM";
    getParkingDataTwo(url, null, function(error, result) {
      if (result[0].results.length > 0) { //If there are results, then...
        var carpark = result[0].results[0];
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
          return res.json(testData);
        });
  
      } else {
        return res.json("none saved");
      }
    });
}
  