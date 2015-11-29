var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var credentials = require('./config/credentials.js');
var mongoose = require('mongoose');


var opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};

mongoose.connect(credentials.mongo.development.connectionString, opts);

var routes = require('./routes/index');
var users = require('./routes/users');
var web_pages = require('./routes/web_pages');

var app = express();

app.locals.site = {
    title: 'TripKOO',
    url: 'http://www.tripkoo.com',
    slogan: 'Cari Paket Wisata di Seluruh Indonesia',
    description: 'Selamat datang di tripkoo. Cari dan temukan paket wisata terbaik dan termurah ke seluruh indonesia.'
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/search', web_pages);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
