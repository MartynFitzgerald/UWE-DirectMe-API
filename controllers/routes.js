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

/* 
  Car Parks
*/
/* GET relevant car parks from the db. */
router.get('/API/GET/CARPARK', carparkController.get_from_user_location);

/* GET all car parks from the db. */
router.get('/API/GET/CARPARKS/', carparkController.get_all);

/* GET car parks from the db. */
router.get('/API/GET/CARPARK/:id', carparkController.get_by_id);

/* 
  Scraping Locations
*/
/* GET All Scraping Locations from the db. */
router.get('/API/GET/SCRAPINGLOCATIONS/', scrapingLocationController.get_all);

/* GET Scrapings Location from the db. */
router.get('/API/GET/SCRAPINGLOCATIONS/:id', scrapingLocationController.get_by_id);

/* INSERT Scrapings Location into the db. */
router.post('/API/INSERT/SCRAPINGLOCATIONS/', scrapingLocationController.insert);

/* DELETE Scrapings Location from the db. */
router.delete('/API/DELETE/SCRAPINGLOCATIONS/:id', scrapingLocationController.delete_by_id);

/* 
  Users
*/
/* GET car parks from the db. */
router.get('/API/GET/USERS/', userController.get_all);

/* GET car parks from the db. */
router.get('/API/GET/USER/:emailAddress', userController.get_by_email_address);

module.exports = router;
