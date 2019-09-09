var express = require('express');
var router = express.Router();

var carparkController = require('../controllers/carparks');
var scrapingLocationsController = require('../controllers/scrapingLocations');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Parking Application' });
});


/* GET relevant car parks from the db. */
router.get('/api/carpark/:latitude/:longitude/:radius', carparkController.carpark_get_relevant);

/* GET All car parks from the db. */
router.get('/api/carpark/', carparkController.carpark_get_all);

/* GET car parks from the db. */
router.get('/api/carpark/:id', carparkController.carpark_get_one);

/* INSERT car parks into the db. */
//router.post('/api/carpark/', carparkController.carpark_get_one);

/* DELETE car parks from the db. */
//router.delete('/api/carpark/:id', carparkController.carpark_get_one);


/* GET All Scrapings Location from the db. */
router.get('/api/scrapinglocation/', scrapingLocationsController.scraping_get_all);

/* GET Scrapings Location from the db. */
router.get('/api/scrapinglocation/:id', scrapingLocationsController.scraping_get_one);

/* INSERT Scrapings Location into the db. */
router.post('/api/scrapinglocation/', scrapingLocationsController.scraping_insert_one);

/* DELETE Scrapings Location from the db. */
router.delete('/api/scrapinglocation/:id', scrapingLocationsController.scraping_delete_one);

module.exports = router;
