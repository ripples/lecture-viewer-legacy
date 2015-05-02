var should  = require('should');
var assert  = require('assert');
var request = require('supertest');

var database = require("../database/index.js");

var url = 'http://localhost:3000';

var login_student =  {
	email : "student@umass.edu",
	password : "password",
	first_name : "first",
	last_name : "last"
};

//TODO drop courses database

exports.dropUserDatabase = function(callback)
{
	database.user.dropUserDatabase(function()
    {
    	callback();
    });
}

exports.createUserAndLogin = function(callback)
{
	request(url)
    .post('/user')
    .send(login_student)
    .end(function(err, res) {

        var login_student_id = res.body.data.user_id;

        res.body.status.should.equal('success', "Failed to create test user : " + res.body.data.message);

        request(url)
		.post('/auth/login')
		.send({
			"email" : login_student.email,
			"password" : login_student.password
		})
		.end(function(err, res) {

			res.body.status.should.equal('success', "Failed to login : " + res.body.data.message);

			user = {};
			user.user_id = login_student_id;
			user.token = res.body.data.token;

			callback(undefined, user);
		});
    });
}






//COURSES
exports.dropCourseDatabase = function(callback) {
	database.course.dropCourseDatabase(function() {
		callback();
	});
}


var test_course = {
    "department" : "Computer Science",
    "course_title" : "Web Scalability",
    "course_number" : "497s",
    "semester" : "Spring",
    "year" : "2015",
    "instructor_email" : "instructor@umass.edu"
}

var test_lecture = {
    "title" : "Lecture 1: How to API",
    "description" : "For this lecture, we will just REST",
    "file" : "/home/ryan/Desktop/myarchive.zip"
}

exports.createCourse = function(callback)
{
	request(url)
    .post('/course')
    .send(test_course)
    .end(function(err, res) {

    	res.body.status.should.equal('success', "Failed to create course : " + res.body.data.message);

    	callback(err, res.body.data);
    });
}

exports.createLecture = function(course_id, callback)
{
	/*request(url)
	   .post('/course/" + course_id + "/lecture')
	   .field('title', test_lecture.title)
	   .field('description', test_lecture.description)
	   .attach('upload', test_lecture.file)
	   .end(function(err, res)
	   {
	   		console.log(res);
	   		res.body.status.should.equal('success', "Failed to create course : " + res.body.data.message);

	   		callback(err, res.body.data);
	   });*/
	
	callback(undefined,{lecture_id:"4cdfb11e1f3c000000007822"});
}