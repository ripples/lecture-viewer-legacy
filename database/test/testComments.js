var db_api = require('../../database');
var should = require('chai').should();
var assert = require('assert');
/*
 *
 */
describe('Test Comment Collection', function() {
    this.timeout(10000);
    var testCourse = null;
    before(function(done) {
        db_api.course.dropCoursesDatabase(function() {
            db_api.course.createCourse('CS', 'CS121', 'Intro to CS', 'Fall', '2015', 'Tim', function(err, course) {
                testCourse = course;
                assert.equal(err, null);
                assert.notEqual(testCourse, null);
                assert.equal(testCourse.semester, 'Fall');
                assert.equal(testCourse.department, 'CS');
                assert.equal(testCourse.courseNumber, 'CS121');
                done();
            });
        });
    });
    var testLecture = null;
    before(function(done) {
        db_api.lecture.dropLecturesDatabase(function() {
            db_api.lecture.createLecture(testCourse, new Date().getDate(), "thisvideo", true, function(err, lecture) {
                testLecture = lecture;
                assert.equal(err, null);
                assert.notEqual(lecture, null);
                assert.equal(lecture.video, "thisvideo");
                assert.equal(lecture.visible, true);
                done();
            });
        });
    });
    var testUser = null;
    before(function(done) {
        db_api.user.dropUserDatabase(function() {
            db_api.user.createUser('test@test.com', 'password', 'first', 'last', 'role', function(err, doc) {
                testUser = doc;
                assert.equal(err, null);
                assert.notEqual(testUser, null);
                assert.equal(testUser.email, 'test@test.com');
                assert.equal(testUser.password, 'password');
                assert.equal(testUser.name.first, 'first');
                assert.equal(testUser.name.last, 'last');
                assert.equal(testUser.role, 'role');
                done();
            });
        });
    });
    it('test that creates a comment', function(done) {
        db_api.comment.createComment(testLecture._id, testUser._id, "comment", new Date().getDate(), function(err, comment) {
            assert.equal(err, null);
            assert.notEqual(comment, null);
            console.log(comment);
            assert.equal(comment.content, "comment");
            assert.equal(comment.author, testUser._id);
            assert.equal(comment.lecture, testLecture._id);
            done();
        });
    });
});