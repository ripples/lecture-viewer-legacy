var should  = require('should');
var assert  = require('assert');
var request = require('supertest');

var url = 'http://localhost:3000';
var nidreq = 2939453;

describe('Notifications', function() {
    it('/user/notification [GET]', function(done) {
        request(url)
            .get('/user/notification')
            .end(function(err, res) {
                if(err) return done(err);
                res.body.status.should.equal('success');
                res.body.data.should.have.property('notifications');
                done();
            });
    });

    it('/user/notification/:notification_id [DELETE]', function(done) {
        request(url)
            .delete('/user/notification/'+nidreq)
            .end(function(err, res) {
                if(err) return done(err);
                res.body.status.should.equal('success');
                done();
            });
    });
});
