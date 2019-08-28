var express = require('express');
var router = express.Router();

var carparkController = require('../controllers/carparks');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Parking Application' });
});

/* GET parking listing that is within the db. */
router.get('/parking', carparkController.carparks_get_all);

/* GET parking listing from the API. */
router.get('/parking/carparks', carparkController.carparks_insert_all);

module.exports = router;
