/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 23/07/2020
|
|    File Name:  routes.js  
|  Description:  This is the file that defines all of the routes to the 
|                application.
*===========================================================================*/
var express = require('express');
var router = express.Router();

/* Importing functions from other files */
var scraping_location = require('../model/scrapingLocation');
var car_park = require('../model/carPark');
var user = require('../model/user');
var review = require('../model/review');
var externalProvider = require('../model/externalProvider');
var history = require('../model/history');

/* Creating a index page for the applicaiton */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DirectMe - API' });
});

/* 
  Scraping Location
*/
/* GET All Scraping Locations from the db. */
router.get('/API/GET/SCRAPINGLOCATIONS/', scraping_location.get_all);

/* GET Scrapings Location from the db. */
router.get('/API/GET/SCRAPINGLOCATION/:id', scraping_location.get_by_id);

/* INSERT Scrapings Location into the db. */
router.post('/API/INSERT/SCRAPINGLOCATION/', scraping_location.insert);

/* DELETE Scrapings Location from the db. */
router.delete('/API/DEL/SCRAPINGLOCATION/:id', scraping_location.delete_by_id);

/* 
  Car Park
*/
/* GET relevant car parks from the db. */
router.get('/API/GET/CARPARK', car_park.get_from_user_location);

/* GET all car parks from the db. */
router.get('/API/GET/CARPARKS/', car_park.get_all);

/* GET car parks from the db. */
router.get('/API/GET/CARPARK/:id', car_park.get_by_id);

/* INSERT car parks into the db. */
router.post('/API/INSERT/CARPARK/', car_park.insert);

/* UPDATE car parks in the db. */
router.put('/API/UPDATE/CARPARK/', car_park.update_by_id);

/* DELETE car parks from the db. */
router.delete('/API/DEL/CARPARK/:id', car_park.delete_by_id);

/* 
  User
*/
/* GET users from the db. */
router.get('/API/GET/USERS/', user.get_all);

/* GET user from the db. */
router.get('/API/GET/USER/:emailAddress', user.get_by_email_address);

/* INSERT user into the db. */
router.post('/API/INSERT/USER/', user.insert);

/* UPDATE user in the db. */
router.put('/API/UPDATE/USER/', user.update_by_id);

/* DELETE user from the db. */
router.delete('/API/DEL/USER/:id', user.delete_by_id);

/* 
  Reviews
*/
/* GET reviews from the db. */
router.get('/API/GET/REVIEW/', review.get_all);

/* GET review from the db. */
router.get('/API/GET/REVIEW/:user_id', review.get_by_user_id);

/* GET review from the db. */
router.get('/API/GET/REVIEW/:car_park_id', review.get_by_car_park_id);

/* INSERT review into the db. */
router.post('/API/INSERT/REVIEW/', review.insert);

/* UPDATE review in the db. */
router.put('/API/UPDATE/REVIEW/', review.update_by_id);

/* DELETE review from the db. */
router.delete('/API/DEL/REVIEW/:id', review.delete_by_id);

/* 
  External Provider
*/
/* GET external providers from the db. */
router.get('/API/GET/EXTERNALPROVIDERS/', externalProvider.get_all);

/* GET external provider from the db. */
router.get('/API/GET/EXTERNALPROVIDER/:id', externalProvider.get_by_id);

/* GET external provider from the db. */
router.get('/API/GET/EXTERNALPROVIDER/:car_park_id', externalProvider.get_by_car_park_id);

/* INSERT external provider into the db. */
router.post('/API/INSERT/EXTERNALPROVIDER/', externalProvider.insert);

/* UPDATE external provider in the db. */
router.put('/API/UPDATE/EXTERNALPROVIDER/', externalProvider.update_by_id);

/* DELETE external provider from the db. */
router.delete('/API/DEL/EXTERNALPROVIDER/:id', externalProvider.delete_by_id);

/* 
  History
*/
/* GET historys from the db. */
router.get('/API/GET/HISTORY/', history.get_all);

/* GET history from the db. */
router.get('/API/GET/HISTORY/:user_id', history.get_by_user_id);

/* INSERT history into the db. */
router.post('/API/INSERT/HISTORY/', history.insert);

/* DELETE history from the db. */
router.delete('/API/DEL/HISTORY/:id', history.delete_by_id);

module.exports = router;
