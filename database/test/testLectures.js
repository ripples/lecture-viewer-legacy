var db_api = require('../../database');
var should = require('chai').should();
var assert = require('assert');
describe('Testing Lectures collection:', function() {
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
    var testUser = null;
    before(function(done) {
        db_api.user.dropUserDatabase(function() {
            db_api.user.createUser('test@test.com', 'password', 'John', 'Doe', 1, function(err, doc) {
                testUser = doc;
                assert.equal(err, null);
                assert.notEqual(testUser, null);
                assert.equal(testUser.email, 'test@test.com');
                assert.equal(testUser.password, 'password');
                assert.equal(testUser.name.first, 'John');
                assert.equal(testUser.name.last, 'Doe');
                assert.equal(testUser.role, 1);
                done();
            });
        });
    });
    var testLecture = null;
    before(function(done) {
        db_api.lecture.dropLecturesDatabase(function() {
            db_api.lecture.createLecture(testCourse, "title", "description", new Date().getDate(), "thisvideo", true, [{
                url: "WhiteBoard1",
                time: "1"
            }], [{
                url: "screen1",
                time: "2"
            }], function(err, lecture) {
                testLecture = lecture;
                assert.equal(err, null);
                assert.notEqual(lecture, null);
                assert.equal(lecture.video, "thisvideo");
                assert.equal(lecture.title, "title");
                assert.equal(lecture.description, "description");
                assert.equal(lecture.visible, true);
                assert.equal(lecture.whiteboardImages[0].url, "WhiteBoard1");
                assert.equal(lecture.whiteboardImages[0].time, "1");
                assert.equal(lecture.screenImages[0].url, "screen1");
                assert.equal(lecture.screenImages[0].time, "2");
                done();
            });
        });
    });
    /*
     * Tests that a lecture is added properly
     */
    it('add List of lectures', function(done) {
        db_api.course.addListOfLecturesById(testCourse._id, {}, function(err, lecture) {
            assert.equal(err, null);
            assert.notEqual(lecture, null);
            ///TODO
            done();
        });
    });
    /*
     * Tests that a lecture is retreived properly
     */
    it('retreives lecture by id', function(done) {
        db_api.lecture.getLectureById(testLecture._id, function(err, lecture) {
            assert.equal(err, null);
            assert.notEqual(lecture, null);
            lecture._id.should.eql(testLecture._id);
            done();
        });
    });
    /*
     * Test that a comment gets added to a lecture
     */
    var testComment = null;
    it('test that creates a comment', function(done) {
        var firstandlast = testUser.name.first + " " + testUser.name.last;
        db_api.comment.createComment(testLecture._id, testUser._id, firstandlast, 188, "Lorem Ipsum dolor sit amet, consectetur adipiscing", new Date().getDate(), function(err, comment) {
            testComment = comment;
            assert.equal(err, null);
            assert.notEqual(comment, null);
            assert.equal(comment.content, "Lorem Ipsum dolor sit amet, consectetur adipiscing");
            assert.equal(comment.author, testUser._id);
            assert.equal(comment.lecture, testLecture._id);
            done();
        });
    });
    /*
     * Tests that an array of comments is being retreived properly
     */
    it('get comments from lecture', function(done) {
        db_api.lecture.getCommentsById(testLecture._id, function(err, comments) {
            assert.equal(err, null);
            assert.notEqual(comments, null);
            comments[0].lecture.should.eql(testLecture._id);
            done();
        });
    });
    /*
     * Tests that a lecture is updated
     */
    it('updates a lecture: lectureID', function(done) {
        db_api.lecture.updateLectureByID(testLecture._id, "new title", "new description", false, function(err, lecture) {
            assert.equal(err, null);
            assert.notEqual(lecture, null);
            assert.equal(lecture.video, "thisvideo");
            assert.equal(lecture.title, "new title");
            assert.equal(lecture.description, "new description");
            done();
        });
    });
    /*
     * test that a comment is being deleted properly
     */
    it('deletes a comment using id', function(done) {
        db_api.comment.deleteComment(testLecture._id, testComment, function(err, lecture) {
            assert.equal(err, null);
            assert.notEqual(lecture, null);
            assert.equal(lecture.comments.length, 0);
            done();
        });
    });
    /*
     * Test that a single lecture is delete by its id.
     */
    it('deletes lecture by ID', function(done) {
        db_api.lecture.deleteLectureByID(testLecture._id, function(err, lecture) {
            assert.equal(err, null);
            assert.notEqual(lecture, null);
            testLecture._id.should.eql(lecture._id);
            done();
        });
    });
});