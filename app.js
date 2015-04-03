var express    = require('express');
var devlog     = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app        = express();
var port       = process.env.PORT || 3000;

// Route locations
var userRoutes = require('./routes/user/index');
var courseRoutes = require('./routes/course/index');

// Will need to eventually transition to Redis
var session = require('express-session');
var passport = require('passport');


// Tell node to interpret post data as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({ secret: 'umass497',
                  resave: true,
                  saveUninitialized: true }));

// Activate path request logging in console
app.use(devlog('dev'));

// Route to user and course
app.use('/user', userRoutes);
app.use('/course', courseRoutes);

// Error handlers

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

var server = app.listen(port, function() {

	server.setTimeout(3600000); //1 hour timeout

    console.log('Listening on port ' + port);
});

module.exports = app;
