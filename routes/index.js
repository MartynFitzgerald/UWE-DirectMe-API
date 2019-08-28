var express = require('express');
var router = express.Router();

var carparkController = require('../controllers/carparks');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Parking Application' });
});

/* GET parking listing. */
router.get('/parking/carparks', carparkController.carparks_insert_all);

/* GET parking listing. */
router.get('/parking', carparkController.carparks_get_all);


module.exports = router;
