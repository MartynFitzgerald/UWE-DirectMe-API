var express = require('express');
var request = require("request");
var mysql = require('mysql');
var Complex = require('complex.js');
var router = express.Router();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'Martyn',
  password : '',
  database : 'parking_Application'
});

/* GET parking listing. */
router.get('/', function(req, res, next) {
  // Get values from the GET request and set them as varibles.
  var lat = req.query.lat;
  var lng = req.query.lng;
  var radius = req.query.radius;
  
  console.log('Radius value ' +  radius);

  connection.query('SELECT * FROM carparks', function (error, results, fields) 
  {
    if (results.length > 0) 
    {
      for (var i = 0; results.length > i; i++) 
      {
        var location = Complex(Math.sqrt((Math.pow(results[i].lat, 2) + Math.pow(parseFloat(lat), 2))) + Math.sqrt((Math.pow(results[i].lng, 2) + Math.pow(parseFloat(lng), 2))));

        console.log('Location value ' +  location);

        if (location <= radius)
        {
          console.log('Location of ' +  results[i].name + ' is inside the radius');
        }
      }
    }
    else if (results.length <= 0) 
    {
      console.log('No data');
    }
    else if (error)
    {
      throw error;
    }
  });

  /* Create The URL to the API */
  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
    "type=parking" +
    "&radius=" + radius +
    "&location=" + lat + "," + lng +
    "&key=AIzaSyBeMKzk8ZpyU2Hk_lrVmlO-Ggq1tQqtYsM"

  request({url: url, json: true}, 
    function (error, response, body) {
      if (!error && response.statusCode === 200) 
      {
        /* Defining a type of page */
        res.header("Content-Type",'application/json');
        /* Print the json response */
        res.send(JSON.stringify(body, null, 4));
      }
    }
  )

});

module.exports = router;
