var should = require('should');
var request = require('supertest');

var database = require('../../database/index.js');
var helper = require('../helper.js');

var url = 'http://localhost:3000';

describe('Roster', function() {

	var login_instructor_auth = "";
	var login_instructor_id = "";

	before(function(done) {
		// create course
		// add to roster

		database.course.dropCoursesDatabase(function() {
			database.user.dropUserDatabase(function() {
				helper.createInstructorAndLogin(function(err, user) {
					login_instructor_auth = user.token;
	                login_instructor_id = user.user_id;
	                done();
				});
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