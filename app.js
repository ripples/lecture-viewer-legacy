var express    = require('express');
var devlog     = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app        = express();
var port       = process.env.PORT || 3000;

app.get('/', function(req,res)
{
    res.sendFile(__dirname + "/production/index.html");
});

//Allows for media files (video, images) to be accessed statically
app.use("/media",express.static(__dirname+"/media/"));
app.use(express.static(__dirname+"/production/"));

// Route locations
var userRoutes = require('./routes/user/index');
var courseRoutes = require('./routes/course/index');
var authRoutes = require('./routes/auth/index');

// Redis client
var redis = require('redis');
var redisClient = redis.createClient();
// can also use var redisClient = redis.createClient(port, host);
// to specify specific port and ip where redis server lives

var auth = require('./authentication');

// require('./mailer').sendVerificationEmail('jyanyuk@umass.edu', 'jyanyuk', function(err, res) {
//     if(!err) console.log(res);
// });

// Tell node to interpret post data as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Activate path request logging in console
app.use(devlog('dev'));

app.use('*', function( req, res, next )
{
    res.sendSuccess = function( data )
    {
         response = {
            'status': 'success',
            'data': data
        }

        res.send(response);
    }

    res.sendFail = function( message )
    {
        response = {
            'status': 'fail',
            'data': {
                'message': message
            }
        }

        res.send(response);
    }

    res.sendError = function( message )
    {
        response = {
            'status': 'error',
            'data': {
                'message': message
            }
        }

        res.send(response);
    }

    next();
});


// Route to user and course
app.use('/user', userRoutes);
app.use('/course', courseRoutes);
app.use('/auth', authRoutes);

// Error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);

        console.log(err.message + ', ' + err);
        res.send(err.message + ', ' + err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    console.log(err.message);
    res.send(err.message);
});

var server = app.listen(port, function() {

	server.setTimeout(3600000); //1 hour timeout

    console.log('Listening on port ' + port);
});

module.exports = app;
