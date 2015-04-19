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
        redis.set(jwt.decode(token, secret), user);
        cb(undefined, token);
    });
}

exports.createAndStoreToken = createAndStoreToken;

// need to add functionality to refresh and expire tokens
