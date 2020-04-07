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
var controller = require('../Model/crud_functionality');

/* Creating a index page for the applicaiton */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DirectMe - API' });
});

/* 
  Scraping Locations
*/
/* GET All Scraping Locations from the db. */
router.get('/API/GET/SCRAPINGLOCATIONS/', controller.scraping_location_get_all);

/* GET Scrapings Location from the db. */
router.get('/API/GET/SCRAPINGLOCATION/:id', controller.scraping_location_get_by_id);

/* INSERT Scrapings Location into the db. */
router.post('/API/INSERT/SCRAPINGLOCATION/', controller.scraping_location_insert);

/* DELETE Scrapings Location from the db. */
router.delete('/API/DEL/SCRAPINGLOCATION/:id', controller.scraping_location_delete_by_id);

/* 
  Car Parks
*/
/* GET relevant car parks from the db. */
router.get('/API/GET/CARPARK', controller.car_park_get_from_user_location);

/* GET all car parks from the db. */
router.get('/API/GET/CARPARKS/', controller.car_park_get_all);

/* GET car parks from the db. */
router.get('/API/GET/CARPARK/:id', controller.car_park_get_by_id);

/* INSERT car parks into the db. */
router.post('/API/INSERT/CARPARK/', controller.car_park_insert);

/* DELETE car parks from the db. */
router.delete('/API/DEL/CARPARK/:id', controller.car_park_delete_by_id);


/* 
  Users
*/
/* GET car parks from the db. */
router.get('/API/GET/USERS/', controller.user_get_all);

/* GET car parks from the db. */
router.get('/API/GET/USER/:emailAddress', controller.user_get_by_email_address);

/* INSERT car parks into the db. */
router.post('/API/INSERT/USER/', controller.user_insert);

/* DELETE car parks from the db. */
router.delete('/API/DEL/USER/:emailAddress', controller.user_delete_by_email_address);

module.exports = router;
