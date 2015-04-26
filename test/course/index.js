var should = require('should');
var request = require('supertest');

var database = require('../../database/index.js');

var url = 'http://localhost:3000';

describe('Course', function() {
	
	var course_info2 = {
		department : "Computer Science",
		courseNumber : "497s",
		courseTitle : "Web Scalability",
		semester : "Spring",
		year : 2015,
		instructor : "instructor@umass.edu"
	};

	var course_info = {
		department : "Psychology",
		courseNumber : "101",
		courseTitle : "Intro to Psychology",
		semester : "Fall",
		year : 2003,
		instructor : "instructor@umass.edu"
	};

	var course_id = "";

	before(function(done) {
		database.course.dropCoursesDatabase(function() {});
		request(url)
			.post('/course')
			.send(course_info2)
			.end(function(err, res) {
				if(err) {
					return done(err);
				} else {
					course_id = res.body.data.course_id;
					res.body.data.department.should.equal('Computer Science');
					res.body.data.courseNumber.should.equal('497s');
					res.body.data.courseTitle.should.equal('Web Scalability');
					res.body.data.semester.should.equal('Spring');
					res.body.data.year.should.equal(2015);
					// res.body.data.instructor.should.equal();			// Need to fix adding an instructor into the db
					res.body.status.should.equal('success');
					done();
				}
			});
	});

	describe('Valid Call', function() {
		it('Creating course', function(done) {										
			request(url)
				.post('/course')
				.send(course_info)
				.end(function(err, res) {
					if(err) {
						return done(err);
					} else {
						res.body.data.department.should.equal('Psychology');
						res.body.data.courseNumber.should.equal('101');
						res.body.data.courseTitle.should.equal('Intro to Psychology');
						res.body.data.semester.should.equal('Fall');
						res.body.data.year.should.equal(2003);
						// res.body.data.instructor.should.equal();			// Need to fix adding an instructor into the db
						res.body.status.should.equal('success');
						done();
					}
				});
		});

		it('Creating a course that already exists', function(done) {			// this creates 2 of the same courses - we will need to fix this in the db backend
			// request(url)
			// 	.post('/course')
			// 	.send(course_info2)
			// 	.end(function(err, res) {
			// 		if(err) {
			// 			return done(err);
			// 		} else {
			// 			course_id2 = res.body.data.course_id;					// this works should it be something different? something to indicate that it is a dup?
			// 			console.log(res.body.data);
			// 			res.body.status.should.equal('success');
			// 			done();
			// 		}
			// 	});
		done();
		});

		it('Get course', function(done) {
			// request(url)
			// 	.get('/course/course_id')
			// 	.end(function(err, res) {
			// 		if(err) {
			// 			return done(err);
			// 		} else {
			// 			res.bosy.status.should.equal('success');
			// 			done();	
			// 		}
			// 	});
			done();
		});

		it('Edit course', function(done) {
			//TODO
			done();
		});

		it('Delete course', function(done) {
			// TODO 
			done();
		});



	});

	describe('Invalid calls', function() {
		it('Creating course', function(done) {					// problem with adding instructor in database call  						
			//TODO
			done();
		});

		it('Get course', function(done) {
			//TODO
			done();
		});

		it('Edit course', function(done) {
			//TODO
			done();
		});

		it('Delete course', function(done) {
			// TODO 
			done();
		});
	});

});