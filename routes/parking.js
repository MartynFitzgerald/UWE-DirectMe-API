var express = require('express');
var request = require("request");
var router = express.Router();

/* GET parking listing. */
router.get('/', function(req, res, next) {
  var lat = req.query.lat;
  var long = req.query.long;
  var radius = req.query.radius;

  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
    "type=parking" +
    "&radius=" + radius +
    "&location=" + lat + "," + long +
    "&key=AIzaSyBeMKzk8ZpyU2Hk_lrVmlO-Ggq1tQqtYsM"

  request({url: url, json: true}, 
    function (error, response, body) {
      if (!error && response.statusCode === 200) 
      {
        // Print the json response
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(body, null, 4));
      }
    }
  )

});

module.exports = router;
