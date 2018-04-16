//Library Imports
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

//Routes
var userRouter = require('./routes/user');
var messageRouter = require('./routes/message');

//Scaffold express app
var app = express();

//Connect to MongoDB
var mongoURI = "mongodb://127.0.0.1:27017/messageboard"
mongoose.connect(mongoURI);

//Express 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//CORS HTTP headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

//Routes (Note: dont use duplicate routes for node and angular)
app.use('/user', userRouter);
app.use('/message', messageRouter);

//Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
