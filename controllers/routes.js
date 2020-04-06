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
var carparkController = require('./carpark');
var scrapingLocationController = require('./scrapingLocation');
var userController = require('./user');

/* Creating a index page for the applicaiton */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Parking Application' });
});

/* GET relevant car parks from the db. */
router.get('/API/GET/CARPARK', carparkController.GetForUserLocation);

/* GET all car parks from the db. */
router.get('/API/GET/CARPARKS/', carparkController.carpark_get_all);

/* GET car parks from the db. */
router.get('/API/GET/CARPARK/:id', carparkController.GetById);

/* GET All Scrapings Location from the db. */
router.get('/API/GET/SCRAPINGLOCATIONS/', scrapingLocationController.GetAll);

/* GET Scrapings Location from the db. */
router.get('/API/GET/SCRAPINGLOCATIONS/:id', scrapingLocationController.GetById);

/* INSERT Scrapings Location into the db. */
router.post('/API/INSERT/SCRAPINGLOCATIONS/', scrapingLocationController.Insert);

/* DELETE Scrapings Location from the db. */
router.delete('/API/DELETE/SCRAPINGLOCATIONS/:id', scrapingLocationController.DeleteById);

/* GET car parks from the db. */
router.get('/API/GET/USERS/', userController.GetAll);

/* GET car parks from the db. */
router.get('/API/GET/USER/:emailAddress', userController.GetByEmailAddress);

module.exports = router;
