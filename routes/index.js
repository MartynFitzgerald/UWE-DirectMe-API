var express = require('express');
var router = express.Router();

var carparkController = require('../controllers/carparks');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Parking Application' });
});

/* GET carparks from the db. */
router.get('/api/carparks', carparkController.carparks_get_all);

/* GET carparks from the API. */
router.get('/api/parking/carparks', carparkController.carparks_insert_all);

/* GET All Scrapings Location from the db. */
router.get('/api/scrapinglocations/', (req, res, next) => {
  res.status(200).json({
    message: 'Scrapings Locations Get All',
    Id : req.param.id
  });
});

/* GET Scrapings Location from the db. */
router.get('/api/scrapinglocations/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Scrapings Locations Get',
    Id : req.param.id
  });
});

/* INSERT Scrapings Location into the db. */
router.post('/api/scrapinglocations/', (req, res, next) => {
  res.status(201).json({
    message: 'Scrapings Locations Inserted',
  });
});

/* DELETE Scrapings Location from the db. */
router.delete('/api/scrapinglocations/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Scrapings Locations Deleted',
    Id : req.param.id
  });
});


module.exports = router;
