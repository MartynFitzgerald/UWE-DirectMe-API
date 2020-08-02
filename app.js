/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 03/08/2020
|
|    File Name:  app.js  
|  Description:  This is the file that initializes the API. 
|                
*===========================================================================*/
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Routes of all the different URLs that are possible within the API.
var indexRouter = require('./views/routes');
var app = express();
//View engine setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
//Support JSON-encoded bodies.
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Set main route of all possible URLs accepted within the API.
app.use('/', indexRouter);
//Catch 404 and forward to error handler.
app.use(function(req, res, next) {
  next(createError(404));
});
//error handler.
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;