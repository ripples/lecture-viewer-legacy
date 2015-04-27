var db_api = require('../../database');
var should = require('chai').should();
var assert = require('assert');
/*
 *
 */
describe('Test Comment Collection', function() {
    this.timeout(20000);
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
            db_api.lecture.createLecture(testCourse, "title", "description", new Date().getDate(), "thisvideo", true, ["WhiteBoard1", "WhiteBoad2"], ["screen1", "screen2"], function(err, lecture) {
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
    /*
     * Test that a comment gets added to a lecture
     */
     var testComment = null;
    it('test that creates a comment', function(done) {
        db_api.comment.createComment(testLecture._id, testUser._id, testUser.name.first + " " +testUser.name.last,188,  "comment", new Date().getDate(), function(err, comment) {
            testComment = comment;
            console.log("COMMENT " + comment);
            console.log("ERR" + err);
            assert.equal(err, null);
            assert.notEqual(comment, null);
            assert.equal(comment.content, "comment");
            assert.equal(comment.author, testUser._id);
            assert.equal(comment.lecture, testLecture._id);
            done();
        });
    });
    /*
     * Tests that a comment is updated properly
     */
    it('updates a comment: comment_id', function(done){
    	db_api.comment.editComment(testComment._id,testLecture._id, testUser._id, "Ryan Mullens" ,277,  "lorem ipsum", new Date().getDate(), function(err, comment){
    		assert.equal(err, null);
    		assert.notEqual(comment, null);
    		assert.equal(comment.poster_name, "Ryan Mullens");
    		assert.equal(comment.time, 277);

    		done();
    	});
    });
    /*
     * Test that a comment gets retreived properly
     */
     it('retreives a comment by id: commentId', function(done){
     	db_api.lecture.getCommentsById(testLecture._id, function(err, comment){
     		assert.equal(err,null);
     		assert.notEqual(comment, null);
     		// console.log(comment);
     		done();
     	});
     });
     


});