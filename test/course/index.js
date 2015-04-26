var should = require('should');
var request = require('supertest');

var database = require('../../database/index.js');

var url = 'http://localhost:3000';

describe('Course', function() {
	
	var course_info = {
		department : "Computer Science",
		courseNumber : "497s",
		courseTitle : "Web Scalability",
		semester : "Spring",
		year : "2015",
		instructor : "instructor@umass.edu"
	};


	before(function(done) {
		database.course.dropCoursesDatabase(function() {
			done();
		});
	});

	describe('Valid Call', function() {
		it('Creating course', function(done) {					// problem with adding instructor in database call  						
			request(url)
				.post('/course')
				.send(course_info)
				.end(function(err, res) {
					res.body.status.should.equal('success');
					done();
				});
		});

		// it('Get course', function(done) {
		// 	request(url)
		// 		.get('/course/#');
		// 		.end(function(err, res) {
		// 			done();
		// 		});
		// });

	});

	// describe('Invalid calls', function() {
		
	// });

});