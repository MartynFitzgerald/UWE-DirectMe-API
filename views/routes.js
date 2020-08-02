/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 03/08/2020
|
|    File Name:  routes.js  
|  Description:  This is the file that defines all of the routes to the 
|                application.
*===========================================================================*/
var express = require('express');
var router = express.Router();
/* Importing functions from other files */
var scraping_location = require('../controllers/scrapingLocation');
var car_park = require('../controllers/carPark');
var user = require('../controllers/user');
var review = require('../controllers/review');
var externalProvider = require('../controllers/externalProvider');
var history = require('../controllers/history');
/* Creating a index page for the application */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'DirectMe - API'
  });
});
/* 
  Scraping Location
*/
/* GET All Scraping Locations from the db. */
router.get('/API/:key/SCRAPINGLOCATION/', scraping_location.get_all);
/* GET Scrapings Location from the db. */
router.get('/API/:key/SCRAPINGLOCATION/:scraping_location_id', scraping_location.get_by_id);
/* INSERT Scrapings Location into the db. */
router.post('/API/:key/SCRAPINGLOCATION/', scraping_location.insert);
/* DELETE Scrapings Location from the db. */
router.delete('/API/:key/SCRAPINGLOCATION/', scraping_location.delete_by_id);
/* 
  Car Park
*/
/* GET all car parks from the db. */
router.get('/API/:key/CARPARK/', car_park.get_all);
/* GET car parks from the db. */
router.get('/API/:key/CARPARK/:car_park_id', car_park.get_by_id);
/* GET car parks from the db by exteral provider. */
router.get('/API/:key/CARPARK/EPID/:external_provider_id', car_park.get_by_external_provider_id);
/* GET relevant car parks from the db. */
router.get('/API/:key/CARPARK/LAT/:latitude/LONG/:longitude/RADIUS/:radius', car_park.get_from_search_location);
/* INSERT car parks into the db. */
router.post('/API/:key/CARPARK/', car_park.insert);
/* UPDATE car parks in the db. */
router.put('/API/:key/CARPARK/', car_park.update_by_id);
/* DELETE car parks from the db. */
router.delete('/API/:key/CARPARK/', car_park.delete_by_id);
/* 
  User
*/
/* GET users from the db. */
router.get('/API/:key/USER/', user.get_all);
/* GET user from the db. */
router.get('/API/:key/USER/:emailAddress', user.get_by_email_address);
/* INSERT user into the db. */
router.post('/API/:key/USER/', user.insert);
/* UPDATE user in the db. */
router.put('/API/:key/USER/', user.update_by_id);
/* DELETE user from the db. */
router.delete('/API/:key/USER/', user.delete_by_id);
/* 
  Reviews
*/
/* GET reviews from the db. */
router.get('/API/:key/REVIEW/', review.get_all);
/* GET review from the db. */
router.get('/API/:key/REVIEW/:user_id', review.get_by_user_id);
/* GET review from the db. */
router.get('/API/:key/REVIEW/:car_park_id', review.get_by_car_park_id);
/* INSERT review into the db. */
router.post('/API/:key/REVIEW/', review.insert);
/* UPDATE review in the db. */
router.put('/API/:key/REVIEW/', review.update_by_id);
/* DELETE review from the db. */
router.delete('/API/:key/REVIEW/', review.delete_by_id);
/* 
  External Provider
*/
/* GET external providers from the db. */
router.get('/API/:key/EXTERNALPROVIDER/', externalProvider.get_all);
/* GET external provider from the db. */
router.get('/API/:key/EXTERNALPROVIDER/:external_provider_id', externalProvider.get_by_id);
/* GET external provider from the db. */
router.get('/API/:key/EXTERNALPROVIDER/:car_park_id', externalProvider.get_by_car_park_id);
/* INSERT external provider into the db. */
router.post('/API/:key/EXTERNALPROVIDER/', externalProvider.insert);
/* UPDATE external provider in the db. */
router.put('/API/:key/EXTERNALPROVIDER/', externalProvider.update_by_id);
/* DELETE external provider from the db. */
router.delete('/API/:key/EXTERNALPROVIDER/', externalProvider.delete_by_id);
/* 
  History
*/
/* GET historys from the db. */
router.get('/API/:key/HISTORY/', history.get_all);
/* GET history from the db. */
router.get('/API/:key/HISTORY/:user_id', history.get_by_user_id);
/* INSERT history into the db. */
router.post('/API/:key/HISTORY/', history.insert);
/* DELETE history from the db. */
router.delete('/API/:key/HISTORY/', history.delete_by_id);
module.exports = router;