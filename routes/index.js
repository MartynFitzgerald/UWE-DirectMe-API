var express = require('express');
var router = express.Router();

var carparkController = require('../controllers/carparks');
var scrapingLocationsController = require('../controllers/scrapingLocations');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Parking Application' });
});

/* GET carparks from the db. */
router.get('/api/carparks', carparkController.carparks_get_all);

/* GET carparks from the API. */
router.get('/api/parking/carparks', carparkController.carparks_insert_all);

/* GET All Scrapings Location from the db. */
router.get('/api/scrapinglocations/', scrapingLocationsController.scraping_get_all);

/* GET Scrapings Location from the db. */
router.get('/api/scrapinglocations/:id', scrapingLocationsController.scraping_get_one);

/* INSERT Scrapings Location into the db. */
router.post('/api/scrapinglocations/', scrapingLocationsController.scraping_insert_one);

/* DELETE Scrapings Location from the db. */
router.delete('/api/scrapinglocations/:id', scrapingLocationsController.scraping_delete_one);

module.exports = router;
