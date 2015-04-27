var should = require('should');
var request = require('supertest');

var database = require('../../database/index.js');

var url = 'http://localhost:3000';

describe('Course', function() {

	var course_info = {
		department : "Psychology",
		course_number : "101",
		course_title : "Intro to Psychology",
		semester : "Fall",
		year : 2003,
		instructor_email : "instructor@umass.edu"
	};

	var course_info2 = {
		department : "Computer Science",
		course_number : "497s",
		course_title : "Web Scalability",
		semester : "Spring",
		year : 2015,
		instructor_email : "instructor@umass.edu"
	};

	var course_info3 = {
		department : "Finance",
		course_number : "301",
		course_title : "Investment",
		semester : "Spring",
		year : 2007,
		instructor_email : "instructor@umass.edu"
	};

	var empty_parameter_course_info = {
		department : "",
		course_number : "301",
		course_title : "Investment",
		semester : "Spring",
		year : 2007,
		instructor_email : "instructor@umass.edu"
	};

	var missing_parameter_course_info = {
		course_number : "301",
		course_title : "Investment",
		semester : "Spring",
		year : 2007,
		instructor_email : "instructor@umass.edu"
	};

	var course_id = "";
	var new_course_id = "";
	var invalid_course_id = "test";

	before(function(done) {
		database.course.dropCoursesDatabase(function() {});
		request(url)
			.post('/course')
			.send(course_info2)
			.end(function(err, res) {
				if(err) {
					return done(err);
				} else {
					res.body.status.should.equal('success');
					course_id = res.body.data.course_id;
					res.body.data.department.should.equal('Computer Science');
					res.body.data.course_number.should.equal('497s');
					res.body.data.course_title.should.equal('Web Scalability');
					res.body.data.semester.should.equal('Spring');
					res.body.data.year.should.equal(2015);
					// res.body.data.lectures.to.have.length(0);							// Need to fix lectures selection in schema
					// res.body.data.instructor_email.should.equal();						// Need to fix adding an instructor into the db
					done();
				}
			});
	});

	describe('Valid Call', function() {
		it('Creating new course', function(done) {										
			request(url)
				.post('/course')
				.send(course_info)
				.end(function(err, res) {
					if(err) {
						return done(err);
					} else {
						new_course_id = res.body.data.course_id;
						res.body.status.should.equal('success');
						res.body.data.department.should.equal('Psychology');
						res.body.data.course_number.should.equal('101');
						res.body.data.course_title.should.equal('Intro to Psychology');
						res.body.data.semester.should.equal('Fall');
						res.body.data.year.should.equal(2003);
						// res.body.data.lectures.to.have.length(0);						// Need to fix lectures selection in schema
						// res.body.data.instructor_email.should.equal();					// Need to fix adding an instructor into the db
						done();
					}
				});
		});

		it('Creating a course that already exists', function(done) {						// NEEDS WORK
			request(url)
				.post('/course')
				.send(course_info2)
				.end(function(err, res) {
					if(err) {
						return done(err);
					} else {
						res.body.status.should.equal('success');
						res.body.data.department.should.equal('Computer Science');
						res.body.data.course_number.should.equal('497s');
						res.body.data.course_title.should.equal('Web Scalability');
						res.body.data.semester.should.equal('Spring');
						res.body.data.year.should.equal(2015);
						// res.body.data.lectures.to.have.length(0);						// Need to fix lectures selection in schema
						// res.body.data.course_id.should.equal(course_id);					// this creates 2 of the same courses - eed to fix this in the db 
						// res.body.data.instructor_email.should.equal();					// Need to fix adding an instructor into the db
						done();
					}
				});
		});

		it('Delete course', function(done) {
			request(url)
				.delete('/course/' + new_course_id)
				.end(function(err, res) {
					res.body.status.should.equal('success');
					res.body.data.department.should.equal('Psychology');
					res.body.data.course_number.should.equal('101');
					res.body.data.course_title.should.equal('Intro to Psychology');
					res.body.data.semester.should.equal('Fall');
					res.body.data.year.should.equal(2003);					
					res.body.data.course_id.should.equal(new_course_id);
					// res.body.data.lectures.to.have.length(0);						// Need to fix lectures selection in schema
					// res.body.data.instructor.should.equal();							// Need to fix adding an instructor into the db
					done();
				});
		});

		it('Get course', function(done) {
			request(url)
				.get('/course/' + course_id)
				.end(function(err, res) {
					if(err) {
						return done(err);
					} else {
						res.body.status.should.equal('success');
						res.body.data.department.should.equal('Computer Science');
						res.body.data.course_number.should.equal('497s');
						res.body.data.course_title.should.equal('Web Scalability');
						res.body.data.semester.should.equal('Spring');
						res.body.data.year.should.equal(2015);
						res.body.data.course_id.should.equal(course_id);
						// res.body.data.lectures.to.have.length(0);						// Need to fix lectures selection in schema
						// res.body.data.instructor.should.equal();							// Need to fix adding an instructor into the db
						done();
					}
				});
		});

		// it('Edit course', function(done) {												// think there is something wrong with the db call
		// 	request(url)
		// 		.put('/course/' + course_id)
		// 		.send(course_info3)
		// 		.end(function(err, res) {
		// 			res.body.status.should.equal('success');
		// 			res.body.data.department.should.equal('Finance');
		// 			res.body.data.course_number.should.equal('301');
		// 			res.body.data.course_title.should.equal('Investment');
		// 			res.body.data.semester.should.equal('Spring');
		// 			res.body.data.year.should.equal(2007);
		// 			res.body.data.course_id.should.equal(course_id);
		// 			// res.body.data.instructor.should.equal();								// Need to fix adding an instructor into the db
		// 			done();
		// 		});
		// });
	});

	describe('Invalid calls', function() {
		it('Creating a new course with empty parameter', function(done) {									
			request(url)
				.post('/course')
				.send(empty_parameter_course_info)
				.end(function(err, res) {
					if(err) {
						return done(err);
					} else {
						res.body.status.should.equal('fail');
						res.body.data.message.should.equal('Incorrect parameters');
						done();
					}
				});
		});

		it('Creating a new course with missing parameter', function(done) {									
			request(url)
				.post('/course')
				.send(missing_parameter_course_info)
				.end(function(err, res) {
					if(err) {
						return done(err);
					} else {
						res.body.status.should.equal('fail');
						res.body.data.message.should.equal('Incorrect parameters');
						done();
					}
				});
		});

		// it('Delete course with empty course id', function(done) {
		// 	request(url)
		// 		.delete('/course/' + empty_course_id)
		// 		.end(function(err, res) {
		// 			console.log(res.body);
		// 			done();
		// 		});
		// });

		it('Delete course with invalid course id', function(done) {
				request(url)
				.delete('/course/' + invalid_course_id)
				.end(function(err, res) {
					res.body.status.should.equal('fail');
					res.body.data.message.should.equal('Course ID is not a valid MongoID');
					done();
				});
		});

		it('Get course with invalid course id', function(done) {
			request(url)
				.get('/course/' + invalid_course_id)
				.end(function(err, res) {
					if(err) {
						return done(err);
					} else {
						res.body.status.should.equal('fail');
						res.body.data.message.should.equal('Course ID is not a valid MongoID');
						done();
					}
				});
		});

		it('Edit course with invalid course id', function(done) {
			request(url)
				.put('/course/' + invalid_course_id)
				.send(course_info)
				.end(function(err, res) {
					if(err) {
						return done(err);
					} else {
						res.body.status.should.equal('fail');
						res.body.data.message.should.equal('Course ID is not a valid MongoID');
						done();
					}
				});
		});

		it('Edit course with empty parameter', function(done) {
			request(url)
				.put('/course/' + course_id)
				.send(empty_parameter_course_info)
				.end(function(err, res) {
					if(err) {
						return done(err);
					} else {
						res.body.status.should.equal('fail');
						res.body.data.message.should.equal('Incorrect parameters');
						done();
					}
				});
		});

		it('Edit course with missing parameters', function(done) {
			request(url)
				.put('/course/' + course_id)
				.send(missing_parameter_course_info)
				.end(function(err, res) {
					if(err) {
						return done(err);
					} else {
						res.body.status.should.equal('fail');
						res.body.data.message.should.equal('Incorrect parameters');
						done();
					}
				});
		});
	});
});