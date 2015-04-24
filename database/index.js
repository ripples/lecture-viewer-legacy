var mongoose = require('mongoose');

mongoose.connect('mongodb://freddy:freddy@ds043170.mongolab.com:43170/learn_u', function(err) 
{
    if (err) throw err;
});

exports.user = require('./users');
exports.course = require('./courses');
exports.lecture = require('./lectures');
exports.comment = require('./comments');
