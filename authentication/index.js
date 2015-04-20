var jwt = require('jwt-simple');
var uuid = require('node-uuid');
var redis = require('../database/redis');

// Default token ttl (in seconds)
var ttl = 60 * 60 * 3 // 3 hours
var secret = 'awesomesauce';

function createToken(cb) {
    var tokenUUID = uuid.v4();
    var token = jwt.encode(tokenUUID, secret);

    cb(token);
}

function createAndStoreToken(user, cb) {
    if(!user) return cb('Missing user object.');

    // Create the token
    createToken(function(token) {
        if(!token) return cb('Error generating token.');

        // Now store (token -> user) in Redis as (key -> value) pair
        var uuid = jwt.decode(token, secret);

        redis.setex(uuid, ttl, JSON.stringify(user), function(err, data) {
            if(err || !data) return cb('Error setting value in Redis.');
            else return cb(undefined, token);
        });
    });
}

/*
    To protect a route, simply add verify as the second parameter
    ex: router.get('/example', auth.verify, function(req, res) { ... });
*/
function verify(req, res, next) {
    var token = req.body.token;
    if(!token) return res.send(403);

    var uuid = jwt.decode(token, secret);

    redis.get(uuid, function(err, data) {
        if(err || !data) return res.send(403);
        else {
            req.user = JSON.parse(data);
            next();
        }
    });
}

function expireToken(token, cb) {
    if(!token) return cb('No token passed into function.');

    var uuid = jwt.decode(token);

    redis.del(uuid, function(err, data) {
        if(err) return cb('Error querying Redis.');
        else return cb();
    });
}

exports.createAndStoreToken = createAndStoreToken
exports.verify = verify;
exports.expireToken = expireToken;

// need to add functionality to refresh and expire tokens
