var should  = require('should');
var assert  = require('assert');
var request = require('supertest');

var url = 'http://localhost:3000';
var bidreq = 493025;
var lidreq = 763562;
var cidreq = 629459;

describe('Bookmarks', function() {

    //Mock Data
    var mock_createbookmark = {
        'course_id': 'fij98342h2934hrfjsdk',
        'lecture_id': '89dfa9sd8fq89',
        'label': 'New Bookmark',
        'time': '123894532'
    };

    it('/user/bookmark [POST]', function(done) {
        request(url)
            .post('/user/bookmark')
            .send(mock_createbookmark)
            .end(function(err, res) {
                res.body.status.should.equal('success');
                res.body.data.should.have.property('bookmark_id');
                done();
            });
    });

    it('/user/bookmark/:course_id/lecture/:lecture_id [GET]', function(done) {
        request(url)
            .get('/user/bookmark/'+cidreq+'/lecture/'+lidreq)
            .end(function(err, res) {
                if(err) return done(err);
                res.body.status.should.equal('success');
                res.body.data.should.have.property('bookmarks');
                done();
            });
    });

    it('/user/bookmark/:bookmark_id [DELETE]', function(done) {
        request(url)
            .delete('/user/bookmark/'+bidreq)
            .end(function(err, res) {
                if(err) return done(err);
                res.body.status.should.equal('success');
                done();
            });
    });

    it('/user/bookmark/course/:course_id [GET]', function(done) {
        request(url)
            .get('/user/bookmark/course/'+cidreq)
            .end(function(err, res) {
                if(err) return done(err);
                res.body.status.should.equal('success');
                done();
            });
    });

    it('/user/bookmark/:bookmark_id [PUT]', function(done) {
        request(url)
            .put('/user/bookmark/'+bidreq)
            .send({'label': 'edited label'})
            .end(function(err, res) {
                if(err) return done(err);
                res.body.status.should.equal('success');
                done();
            });
    });
});
