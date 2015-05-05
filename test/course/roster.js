var should = require('should');
var request = require('supertest');

var database = require('../../database/index.js');

var url = 'http://localhost:3000';

describe('Roster', function() {

	before(function(done) {
		// create course
		// add to roster

		database.course.dropCoursesDatabase(function() {
			database.user.dropUserDatabase(function() {

				done();
			});
		});
	});

	describe('Valid Calls', function() {
		

		it('Get roster from course (empty roster)', function(done) {
			done();
		});

		it('Get roster from course (non empty roster)', function(done) {
			// request(url)
			// 	.get()
			// 	.end(function(err, res) {

			// 	});
			done();
		});

		it('Delete user from course roster', function(done) {

			done();
		});
	
	});

	describe('Invalid Calls', function() {
		//TODO
	});

});