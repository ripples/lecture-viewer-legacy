var db_api = require('../../database');
var should = require('chai').should();
var assert = require('assert');
describe('Testing Lectures collection:', function() {
    this.timeout(1000000);
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
              console.log("esto");
            db_api.lecture.createLecture(testCourse, new Date().getDate(), "thisvideo", true, function(err, lecture) {
                testLecture = lecture;
                assert.equal(err, null);
                assert.notEqual(lecture, null);
                done();
            });
        });
    });
    it('add List of lectures', function(done) {
        db_api.course.addListOfLecturesById(testCourse._id, {}, function(err, lecture) {
            console.log(lecture);
            assert.equal(err, null);
            assert.notEqual(lecture, null);
            done();
        });
    });
    // it('add comment to lecture: lectureID', function(done) {
    //     db_api.lecture.addCommentToLecture();
    // });
});