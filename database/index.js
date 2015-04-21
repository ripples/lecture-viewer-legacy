var mongoose = require('mongoose');

mongoose.connect('mongodb://freddy:freddy@ds043170.mongolab.com:43170/learn_u');

exports.user = require('./users');
exports.course = require('./courses');
exports.lectures = require('./lectures');
