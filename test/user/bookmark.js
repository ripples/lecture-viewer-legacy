// var should  = require('should');
// var assert  = require('assert');
// var request = require('supertest');

// var helper = require('../helper.js');

// var url = 'http://localhost:3000';
// var bidreq = 493025;
// var lidreq = 763562;
// var cidreq = 629459;

// describe('Bookmarks', function() {

//     var test_bookmark = 
//     {
//         'course_id': 'dfaa1e1f3c23000000007855',
//         'lecture_id': 'aaaa1e1f3c23000000001111',
//         'label': 'Bookmark',
//         'time': '123894532'
//     };

//     var test_update_bookmark = 
//     {
//         'label': 'New Bookmark'
//     };


//     this.timeout(20000);


//     var user_id = "";
//     var user_token = "";
//     var lecture_id = "";
//     var course_id = "";

//     var bookmark_id = "";


//     before(function(done)
//     {
//         //TODO drop courses database

//         helper.dropUserDatabase(function()
//         {
//             helper.createUserAndLogin(function(err, user)
//             {
//                 should.equal(err, undefined, JSON.stringify(err));

//                 user_id = user.user_id;
//                 user_token = user.token;

//                 helper.createCourse(function(err,course)
//                 {
//                     course_id = course.course_id;

//                     helper.createLecture(course_id, function(err,lecture)
//                     {
//                         lecture_id = lecture.lecture_id;
//                         done();
//                     });
//                 }); 
//             });
//         });
//     });

//     describe('Valid calls', function()
//     {
//         it('Create bookmark', function(done) {
//         request(url)
//             .post('/user/bookmark')
//             .send(test_bookmark)
//             .end(function(err, res) {
//                 res.body.status.should.equal('success', res.body.data.message);

//                 res.body.data.should.have.property('bookmark_id');
//                 res.body.data.course_id.should.equal(test_bookmark.course_id);
//                 res.body.data.lecture_id.should.equal(test_bookmark.lecture_id);
//                 res.body.data.time.should.equal(test_bookmark.time);
//                 res.body.data.label.should.equal(test_bookmark.label);

//                 bookmark_id = res.body.data.bookmark_id;

//                 done();
//             });
//         });

//         it('Get bookmark from lecture', function(done) {
//         request(url)
//             .get('/user/bookmark/course/' + course_id + "/lecture/" + lecture_id)
//             .end(function(err, res) {

//                 res.body.status.should.equal('success', res.body.data.message);

//                 console.log(res.body);

//                 res.body.data.bookmarks[0].bookmark_id.should.equal(bookmark_id);
//                 res.body.data.bookmarks[0].label.should.equal(test_bookmark.label);
//                 res.body.data.bookmarks[0].time.should.equal(test_bookmark.time);

//                 done();
//             });
//         });


//         it('Get bookmark from course', function(done) {
//             request(url)
//                 .get('/user/bookmark/course/' + course_id)
//                 .end(function(err, res) {

//                     res.body.status.should.equal('success', res.body.data.message);

//                     console.log(res.body);

//                     res.body.data.bookmarks[0].bookmark_id.should.equal(bookmark_id);
//                     res.body.data.bookmarks[0].lecture_id.should.equal(lecture_id);
//                     res.body.data.bookmarks[0].label.should.equal(test_bookmark.label);
//                     res.body.data.bookmarks[0].time.should.equal(test_bookmark.time);

//                     done();
//             });
//         });

//         it('Edit bookmark', function(done) {
//         request(url)
//             .put('/user/bookmark/' + bookmark_id)
//             .send(test_update_bookmark)
//             .end(function(err, res) {

//                 res.body.status.should.equal('success', res.body.data.message);

//                 console.log(res.body);

//                 res.body.data.bookmarks[0].bookmark_id.should.equal(bookmark_id);
//                 res.body.data.bookmarks[0].label.should.equal(test_update_bookmark.label);
//                 res.body.data.bookmarks[0].time.should.equal(test_bookmark.time);
                
//                 request(url)
//                     .get('/user/bookmark/course/' + course_id + "/lecture/" + lecture_id)
//                     .end(function(err, res) {

//                         res.body.status.should.equal('success', res.body.data.message);

//                         console.log(res.body);

//                         res.body.data.bookmarks[0].bookmark_id.should.equal(bookmark_id);
//                         res.body.data.bookmarks[0].label.should.equal(test_update_bookmark.label);
//                         res.body.data.bookmarks[0].time.should.equal(test_bookmark.time);
                        
//                         done();
//                     });
                
//             });
//         });

//         it('Delete bookmark', function(done) {
//         request(url)
//             .delete('/user/bookmark/' + bookmark_id)
//             .end(function(err, res) {

//                 res.body.status.should.equal('success', res.body.data.message);

//                 console.log(res.body);

//                 res.body.data.bookmarks[0].bookmark_id.should.equal(bookmark_id);
//                 res.body.data.bookmarks[0].label.should.equal(test_update_bookmark.label);
//                 res.body.data.bookmarks[0].time.should.equal(test_bookmark.time);
                

//                 request(url)
//                     .get('/user/bookmark/course/' + course_id + "/lecture/" + lecture_id)
//                     .end(function(err, res) {

//                         res.body.status.should.equal('success', res.body.data.message);

//                         console.log(res.body);

//                         res.body.data.bookmarks.length.should.equal(0, "The bookmark was never deleted");
                        
//                         done();
//                     });
//             });
//         });
//     });

//     it('/user/bookmark/:course_id/lecture/:lecture_id [GET]', function(done) {
//         request(url)
//             .get('/user/bookmark/'+cidreq+'/lecture/'+lidreq)
//             .end(function(err, res) {
//                 if(err) return done(err);
//                 res.body.status.should.equal('success', res.body.data.message);
//                 res.body.data.should.have.property('bookmarks');
//                 done();
//             });
//     });

//     it('/user/bookmark/:bookmark_id [DELETE]', function(done) {
//         request(url)
//             .delete('/user/bookmark/'+bidreq)
//             .end(function(err, res) {
//                 if(err) return done(err);
//                 res.body.status.should.equal('success');
//                 done();
//             });
//     });

//     it('/user/bookmark/course/:course_id [GET]', function(done) {
//         request(url)
//             .get('/user/bookmark/course/'+cidreq)
//             .end(function(err, res) {
//                 if(err) return done(err);
//                 res.body.status.should.equal('success');
//                 done();
//             });
//     });

//     it('/user/bookmark/:bookmark_id [PUT]', function(done) {
//         request(url)
//             .put('/user/bookmark/'+bidreq)
//             .send({'label': 'edited label'})
//             .end(function(err, res) {
//                 if(err) return done(err);
//                 res.body.status.should.equal('success');
//                 done();
//             });
//     });
// });
