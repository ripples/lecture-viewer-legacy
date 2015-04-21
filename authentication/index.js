var jwt = require('jwt-simple');
var uuid = require('node-uuid');

var redis = require('../database/redis');
var database = require('../database');

// Will load in all necessary constant variables
var config = require('../config');

var ttl = config.TOKEN_TTL;
var secret = config.TOKEN_SECRET;

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
        var tokenUUID = jwt.decode(token, secret);

        redis.setex(tokenUUID, ttl, JSON.stringify(user), function(err, data) {
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
    var token = req.headers.authorization || req.body.token;
    if(!token) return res.sendFail("No authorization supplied");

    var tokenUUID = jwt.decode(token, secret);

    redis.get(tokenUUID, function(err, data) {
        if(err || !data) return res.sendFail(err);
        else {
            req.user = JSON.parse(data);
            next();
        }
    });
}

function expireToken(token, cb) {
    if(!token) return cb('No token passed into function.');

    var tokenUUID = jwt.decode(token);

    redis.del(tokenUUID, function(err, data) {
        if(err) return cb('Error querying Redis.');
        else return cb();
    });
}

function refreshToken(token, cb) {
    if(!token) return cb('No token passed into function.');

    var tokenUUID = jwt.decode(token);

    redis.expire(tokenUUID, ttl, function(err, data) {
        if(err) return cb('Error querying Redis.');
        else return cb();
    });
}

function createVerificationID(userID, cb) {

    cb(undefined, 'testing');
}

exports.createAndStoreToken = createAndStoreToken
exports.verify = verify;
exports.expireToken = expireToken;
exports.refreshToken = refreshToken;
exports.createVerificationID = createVerificationID;
exports.secret = secret;
