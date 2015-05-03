var should = require('should');
var request = require('supertest');
var assert = require('assert');

var database = require('../../database/index.js');
var helper = require('../helper.js');

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

	// var course_info2 = {
	// 	department : "Computer Science",
	// 	course_number : "497s",
	// 	course_title : "Web Scalability",
	// 	semester : "Spring",
	// 	year : 2015,
	// 	instructor_email : "Joe@umass.edu"
	// };

	// var course_info3 = {
	// 	department : "Finance",
	// 	course_number : "301",
	// 	course_title : "Investment",
	// 	semester : "Spring",
	// 	year : 2007,
	// 	instructor_email : "Martin@umass.edu"
	// };

	// var empty_parameter_course_info = {
	// 	department : "",
	// 	course_number : "301",
	// 	course_title : "Investment",
	// 	semester : "Spring",
	// 	year : 2007,
	// 	instructor_email : "Test@umass.edu"
	// };

	// var missing_parameter_course_info = {
	// 	course_number : "301",
	// 	course_title : "Investment",
	// 	semester : "Spring",
	// 	year : 2007,
	// 	instructor_email : "Steve@umass.edu"
	// };

	// var course_id = "";
	// var new_course_id = "";
	// var invalid_course_id = "test";

	var course_id = "";
    var login_admin_id = "";
    var login_admin_auth = "";

	before(function(done) {
		database.course.dropCoursesDatabase(function() {
			database.user.dropUserDatabase(function() {
				helper.createAdminAndLogin(function(err, user) {
					login_admin_auth = user.token;
	                login_admin_id = user.user_id;
	                done();
				});
			});
		});
	});


	describe('Valid call', function() {
		
		it('Creating a new course', function(done) {
			request(url)
				.post('/course')
				.set('Authorization', login_admin_auth)
				.send(course_info)
				.end(function(err, res) {
					if(err) {
						return done(err);
					} else {
						res.body.status.should.equal('success');
						course_id = res.body.data.course_id;
						res.body.data.department.should.equal('Psychology');
						res.body.data.course_number.should.equal('101');
						res.body.data.course_title.should.equal('Intro to Psychology');
						res.body.data.semester.should.equal('Fall');
						res.body.data.year.should.equal(2003);
						assert.deepEqual(res.body.data.instructor_emails, ['instructor@umass.edu'])
						assert.deepEqual(res.body.data.lectures, []);
						done();
					}
				});
		});

		it('Creating a course that already exists', function(done) {
			request(url)
				.post('/course')
				.set('Authorization', login_admin_auth)
				.send(course_info)
				.end(function(err, res) {
					if(err) {
						return done(err);
					} else {
						res.body.status.should.equal('fail');
						res.body.data.message.should.equal('Psychology 101 Fall 2003 already exists.');
						done();
					}
				});
		});

		it('Get a course', function(done) {
			request(url)
				.get('/course/' + course_id)
				.set('Authorization', login_admin_auth)
				.end(function(err, res) {
					res.body.status.should.equal('success');
					res.body.data.course_id.should.equal(course_id);
					res.body.data.department.should.equal('Psychology');
					res.body.data.course_number.should.equal('101');
					res.body.data.course_title.should.equal('Intro to Psychology');
					res.body.data.semester.should.equal('Fall');
					res.body.data.year.should.equal(2003);
					assert.deepEqual(res.body.data.instructor_emails, ['instructor@umass.edu'])
					assert.deepEqual(res.body.data.lectures, []);
					done();
				});
		}); 

		it('Delete a course', function(done) {
			request(url)
				.delete('/course/' + course_id)
				.set('Authorization', login_admin_auth)
				.end(function(err, res) {
					if(err) {
						return done(err);
					} else {
						res.body.status.should.equal('success');
						res.body.data.department.should.equal('Psychology');
						res.body.data.course_number.should.equal('101');
						res.body.data.course_title.should.equal('Intro to Psychology');
						res.body.data.semester.should.equal('Fall');
						res.body.data.year.should.equal(2003);
						assert.deepEqual(res.body.data.instructor_emails, ['instructor@umass.edu'])
						res.body.data.course_id.should.equal(course_id);
						done();
					}
				});
		});



	});
});

// invalid tests - you have to try to do all courses stuff with student_auth - should fail
// invalid tests - you have to try passing in back parameters

	// 	it('Edit course', function(done) {											
	// 		request(url)
	// 			.put('/course/' + course_id)
	// 			.send(course_info3)
	// 			.end(function(err, res) {
	// 				res.body.status.should.equal('success');
	// 				res.body.data.department.should.equal('Finance');
	// 				res.body.data.course_number.should.equal('301');
	// 				res.body.data.course_title.should.equal('Investment');
	// 				res.body.data.semester.should.equal('Spring');
	// 				res.body.data.year.should.equal(2007);
	// 				res.body.data.course_id.should.equal(course_id);
	// 				assert.deepEqual(res.body.data.instructor_emails, ['Martin@umass.edu']);
	// 				done();
	// 			});
	// 	});
	// });

	// describe('Invalid calls', function() {
	// 	it('Creating a new course with empty parameter', function(done) {									
	// 		request(url)
	// 			.post('/course')
	// 			.send(empty_parameter_course_info)
	// 			.end(function(err, res) {
	// 				if(err) {
	// 					return done(err);
	// 				} else {
	// 					res.body.status.should.equal('fail');
	// 					res.body.data.message.should.equal('Incorrect parameters');
	// 					done();
	// 				}
	// 			});
	// 	});

	// 	it('Creating a new course with missing parameter', function(done) {									
	// 		request(url)
	// 			.post('/course')
	// 			.send(missing_parameter_course_info)
	// 			.end(function(err, res) {
	// 				if(err) {
	// 					return done(err);
	// 				} else {
	// 					res.body.status.should.equal('fail');
	// 					res.body.data.message.should.equal('Incorrect parameters');
	// 					done();
	// 				}
	// 			});
	// 	});

	// 	// it('Delete course with empty course id', function(done) {
	// 	// 	request(url)
	// 	// 		.delete('/course/' + empty_course_id)
	// 	// 		.end(function(err, res) {
	// 	// 			console.log(res.body);
	// 	// 			done();
	// 	// 		});
	// 	// });

	// 	it('Delete course with invalid course id', function(done) {
	// 			request(url)
	// 			.delete('/course/' + invalid_course_id)
	// 			.end(function(err, res) {
	// 				res.body.status.should.equal('fail');
	// 				res.body.data.message.should.equal('Course ID is not a valid MongoID');
	// 				done();
	// 			});
	// 	});

	// 	it('Get course with invalid course id', function(done) {
	// 		request(url)
	// 			.get('/course/' + invalid_course_id)
	// 			.end(function(err, res) {
	// 				if(err) {
	// 					return done(err);
	// 				} else {
	// 					res.body.status.should.equal('fail');
	// 					res.body.data.message.should.equal('Course ID is not a valid MongoID');
	// 					done();
	// 				}
	// 			});
	// 	});

	// 	it('Edit course with invalid course id', function(done) {
	// 		request(url)
	// 			.put('/course/' + invalid_course_id)
	// 			.send(course_info)
	// 			.end(function(err, res) {
	// 				if(err) {
	// 					return done(err);
	// 				} else {
	// 					res.body.status.should.equal('fail');
	// 					res.body.data.message.should.equal('Course ID is not a valid MongoID');
	// 					done();
	// 				}
	// 			});
	// 	});

	// 	it('Edit course with empty parameter', function(done) {
	// 		request(url)
	// 			.put('/course/' + course_id)
	// 			.send(empty_parameter_course_info)
	// 			.end(function(err, res) {
	// 				if(err) {
	// 					return done(err);
	// 				} else {
	// 					res.body.status.should.equal('fail');
	// 					res.body.data.message.should.equal('Incorrect parameters');
	// 					done();
	// 				}
	// 			});
	// 	});

	// 	it('Edit course with missing parameters', function(done) {
	// 		request(url)
	// 			.put('/course/' + course_id)
	// 			.send(missing_parameter_course_info)
	// 			.end(function(err, res) {
	// 				if(err) {
	// 					return done(err);
	// 				} else {
	// 					res.body.status.should.equal('fail');
	// 					res.body.data.message.should.equal('Incorrect parameters');
	// 					done();
	// 				}
	// 			});
	// 	});
	// });
// });