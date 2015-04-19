var express    = require('express');
var devlog     = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app        = express();
var port       = process.env.PORT || 3000;

app.get('/', function(req,res) 
{
    res.sendFile(__dirname + "/front_end/dist/index.html");
});

app.use(express.static(__dirname+"/front_end/dist/"));


// Route locations
var userRoutes = require('./routes/user/index');
var courseRoutes = require('./routes/course/index');
var authRoutes = require('./routes/auth/index');

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
} );


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

        console.log(err.message);
        console.log(err);

        res.send(err.message);

        /*res.render('error', {
            message: err.message,
            error: err
        });*/
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    console.log(err.message);

    res.send(err.message);
    /*res.render('error', {
        message: err.message,
        error: {}
    });*/
});

var server = app.listen(port, function() {

	server.setTimeout(3600000); //1 hour timeout

    console.log('Listening on port ' + port);
});

module.exports = app;
