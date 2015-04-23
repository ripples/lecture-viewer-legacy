var db_api = require('../../database');
var should = require('chai').should();
var assert = require('assert');

describe('Testing Lectures collection:', function() {


    var testCourse = null;
    var testUser = null;
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

    // it('add List of lectures',function(done){
    // 	db_api.course.addListOfLecturesById(testCourse._id,['Intro to Computation','web programming'], function(err, course){
    // 		assert.equal(err,null);
    //         assert.notEqual()
    // 		done();
    // 	});

    // });
	
});