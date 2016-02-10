var newrelic = require('newrelic');
var express = require('express');
var app = express();
env = app.get('env');
config = require('./config/'+ env +'.js');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var credentials = require('./config/credentials.js');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');
var web_pages = require('./routes/web_pages');
var details = require('./routes/details');

app.locals.site = config.site;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// redirect trailing-slash
app.use(function(req, res, next) {
    app.disable( 'x-powered-by' );
    res.setHeader( 'X-Powered-By', 'Marmot v0.2' );
    res.setHeader( 'X-Served-By', 'Asih v2.6' );
    res.setHeader( 'X-Core-Mission', 'Babantos tukang jalan-jalan' );

    if (req.path.substr(-1) == '/' && req.path.length > 1) {
        var query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
    } else {
        next();
    }
});                             

app.use('/', routes);
app.use('/users', users);
app.use('/:url(search|paket-wisata)', web_pages);
app.use('/paket-wisata/:keyword', web_pages);
app.use('/:situs/:slug', details);
// app.get('/paket-wisata/:keyword',function(req,res){
//     console.log(req.params);
//     res.send("OK");
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
app.locals.site.static_host = config.site.static_host;
var mongoConnectionString = config.mongo.connectionString;
if (app.get('env') !== 'production') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};

mongoose.connect(mongoConnectionString, opts);

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
