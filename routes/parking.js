var express = require('express');
var request = require("request");
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'Martyn',
  password : '',
  database : 'parking_Application'
});
/* 
  For more information about this function's calculations
  Source : https://www.movable-type.co.uk/scripts/latlong.html
*/
function getDistanceFromLocationInMetres(lat1,lon1,lat2,lon2) {
  var earthsRadius = 6371;
  // Using degreeTorRadians function to get convert degrees to radians
  var dLat = degreeTorRadians(lat2-lat1);
  var dLon = degreeTorRadians(lon2-lon1); 

  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(degreeTorRadians(lat1)) * Math.cos(degreeTorRadians(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var distance = (earthsRadius * c) * 1000; // Distance in Metres
  //var distance = R * c; // Distance in Km
  return Math.round(distance);
}
/*
  Note : This function changes angles to radians to pass to trigonometric functions!
  Radians is the SI unit for measuring angles. Basically a slice of the whole circle.
*/
function degreeTorRadians(degree) 
{
  return degree * (Math.PI/180);
}

function getParkingData(radius,lat,lng)  
{
  /* Create The URL to the API */
  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
    "type=parking" +
    "&radius=" + radius +
    "&location=" + lat + "," + lng +
    "&key=AIzaSyBeMKzk8ZpyU2Hk_lrVmlO-Ggq1tQqtYsM"


    //https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=parking&radius=5000&location=51.454514,2.587910&key=AIzaSyBeMKzk8ZpyU2Hk_lrVmlO-Ggq1tQqtYsM

    /*doCall(url, function(response){
      if (response.status == "OK")
      {
        console.log(response);
        
        while (response.next_page_token != undefined) 
        {
          //url =+ "&" + next_page_token;
          //doCall(url, function(response){data = response;})
        }
      }
      else
      {+
        response = "ERROR";
      }
      
    })*/
}

var testData = [];

function getParkingDataTwo(url, nextPageToken = null, callback) {

  console.log("getParkingDataTwo called");

  var currentUrl = url;

  if (nextPageToken) {
    currentUrl += "&pagetoken=" + nextPageToken;
  }

  console.log("currentUrl", currentUrl);

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

//Call URL to Google's API 
/*function doCall(url, callback) 
{
  request(
    {
      url: url, 
      json: true
    }, 
    function (error, response, data) 
    {                          
      if (response.status == "OK")
      {
        return callback data;
      }
      else
      {
        
        console.log('error:', error); // Print the error if one occurred
      }
    }
  );
}*/

router.get('/carparks', function(req, res, next) {

  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=parking&radius=5000&location=51.454514,-2.587910&key=AIzaSyBeMKzk8ZpyU2Hk_lrVmlO-Ggq1tQqtYsM";
  getParkingDataTwo(url, null, function(error, result) {

    //console.log(result[0].results);

    if (result[0].results.length > 0) {
      var carpark = result[0].results[0];

      console.log("carpark", carpark)

      var id = "xyz";
      var name = carpark.name;
      var latitude = carpark.geometry.location.lat;
      var longitude = carpark.geometry.location.lng;
      var rating = null;
      var userRatingsTotal = null;
      var photos = null;

      var sql = `INSERT IGNORE INTO carparks (id, name, lat, lng, rating, userRatingsTotal, photos) VALUES ('${id}', '${name}', '${latitude}', '${longitude}', ${rating}, ${userRatingsTotal}, ${photos});`;

      console.log("sql", sql);

      //TODO: before returning to the user, save all new records to the database
      connection.query(sql, function(error, result, fields) {
        console.log(result);

        return res.json(result);
        //return res.json(result);
      });

    } else {
      return res.json("none saved");
    }
  });

});

/* GET parking listing. */
router.get('/', function(req, res, next) {
  // Get values from the GET request and set them as varibles.
  var lat = req.query.lat;
  var lng = req.query.lng;
  var radius = req.query.radius;
  var counter = 0;
  
  var relevantCarParks = [];

  console.log('Radius value ' +  radius);

  connection.query('SELECT * FROM carparks', function (error, results, fields) 
  {
    if (results.length > 0) 
    {
      for (var i = 0; results.length > i; i++) 
      {
        var distanceFromCarPark = getDistanceFromLocationInMetres(results[i].lat, results[i].lng, lat, lng);

        if (distanceFromCarPark <= radius) {
          //push car park into results array
          relevantCarParks.push(results[i]);
        }

        //if (location <= radius) {
          //grab the data
        //}


        /*if ((!(location > radius)) && (location <= radius))
        {
          counter++;
          console.log('Location of ' +  results[i].name + ' is inside the radius. Distance: ' + location);
        }*/
      }

      return res.json(relevantCarParks);
      
      //console.log("counter", counter);

      // If there are more than 20 items within the db then...
      // 20 may be assigned by the user
      /*if (counter < 20)
      {
        //Display Data
      }
      else
      {
        //Grab data
        //getParkingData(radius,lat,lng);
      }*/


    }
    /*else if (results.length <= 0) 
    {
      console.log('No data - Database Request Failed');
    }
    else if (error)
    {
      throw error;
    }*/
  });
  
  /* Defining a type of page */
  //res.header("Content-Type",'application/json');
  /* Print the json response */
  //res.send(JSON.stringify(getParkingData(radius,lat,lng), null, 4));

});

module.exports = router;
