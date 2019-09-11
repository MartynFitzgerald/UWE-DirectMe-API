/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  30/03/2019
|
|    File Name:  index.js  
|  Description:  This is the main file that is excuted first within this package
|                that will define all of the routes to the application.
*===========================================================================*/
var express = require('express');
var router = express.Router();

/* Importing functions from other files */
var carparkController = require('../controllers/carparks');
var scrapingLocationController = require('../controllers/scrapingLocation');

/* Creating a index page for the applicaiton */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Parking Application' });
});


/* GET car parks from the db. */
router.get('/api/carpark/:id', carparkController.GetById);

/* GET relevant car parks from the db. */
router.get('/api/carpark', carparkController.GetForUserLocation);

/* GET all car parks from the db. */
//router.get('/api/carpark/', carparkController.carpark_get_all);

/* INSERT car parks into the db. */
//router.post('/api/carpark/', carparkController.carpark_get_one);

/* DELETE car parks from the db. */
//router.delete('/api/carpark/:id', carparkController.carpark_get_one);


/* GET All Scrapings Location from the db. */
router.get('/api/scrapinglocation/', scrapingLocationController.GetAll);

/* GET Scrapings Location from the db. */
router.get('/api/scrapinglocation/:id', scrapingLocationController.GetById);

/* INSERT Scrapings Location into the db. */
router.post('/api/scrapinglocation/', scrapingLocationController.Insert);

/* DELETE Scrapings Location from the db. */
router.delete('/api/scrapinglocation/:id', scrapingLocationController.DeleteById);

module.exports = router;
