var should  = require('should');
var assert  = require('assert');
var request = require('supertest');

var bcrypt = require('bcrypt-nodejs');

var database = require("../database/index.js");

var url = 'http://localhost:3000';

var login_student =  {
	email : "student@umass.edu",
	password : "password",
	first_name : "first",
	last_name : "last"
};

var login_student_token = "";
var login_student_id = "";

var login_admin =  {
        email : "admin@umass.edu",
        password : "password",
        first_name : "first",
        last_name : "last"
    };

var login_admin_auth = "";
var login_admin_id = "";


var login_instructor = {
	email : "instructor@umass.edu",
	password : "password", 
	first_name : "first",
	last_name : "last"
}

var login_instructor_auth = "";
var login_instructor_id = "";


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

        login_student_id = res.body.data.user_id;

        res.body.status.should.equal('success', "Failed to create test user : " + res.body.data.message);

        request(url)
		.post('/auth/login')
		.send({
			"email" : login_student.email,
			"password" : login_student.password
		})
		.end(function(err, res) {

			if(err)
				return callback(err);

			res.body.status.should.equal('success', "Failed to login : " + res.body.data.message);

			user = {};
			user.user_id = login_student_id;
			user.token = res.body.data.token;

			login_student_token = user.token;

			callback(undefined, user);
		});
    });
}

exports.createInstructorAndLogin = function(callback)
{
	if(!login_instructor_auth)
	{
		bcrypt.hash(login_admin.password, null, null, function(err, hashedPassword) {
	                
	        database.user.createUser(login_instructor.email,hashedPassword,login_instructor.first_name,login_instructor.last_name, "instructor", function(err, user)
	        {
	            if(err)
	                return callback(err);

	            login_instructor_id = user._id;

	            request(url)
	                .post('/auth/login')
	                .send({
	                    "email" : login_instructor.email,
	                    "password" : login_instructor.password
	                })
	                .end(function(err, res) {

	                    if(err)
	                    	return callback(err);

	                    login_instructor_auth = res.body.data.token;
	                    
	                    user = {};
						user.user_id = login_instructor_id;
						user.token = res.body.data.token;

						callback(undefined, user);
	                });
	        });
	    });
	 }else{
		user = {};
		user.user_id = login_instructor_id;
		user.token = login_instructor_auth;

		callback(undefined, user);
	 }  
}

exports.createAdminAndLogin = function(callback)
{
	if(!login_admin_auth)
	{
		bcrypt.hash(login_admin.password, null, null, function(err, hashedPassword) {
	                
	        database.user.createUser(login_admin.email,hashedPassword,login_admin.first_name,login_admin.last_name, "admin", function(err, user)
	        {
	            if(err)
	                return callback(err);

	            login_admin_id = user._id;

	            request(url)
	                .post('/auth/login')
	                .send({
	                    "email" : login_admin.email,
	                    "password" : login_admin.password
	                })
	                .end(function(err, res) {

	                    if(err)
	                    	return callback(err);

	                    login_admin_auth = res.body.data.token;
	                    
	                    user = {};
						user.user_id = login_admin_id;
						user.token = res.body.data.token;

						callback(undefined, user);
	                });
	        });
	    });
	 }else{
		user = {};
		user.user_id = login_admin_id;
		user.token = login_admin_auth;

		callback(undefined, user);
	 }  
}






//COURSES
exports.dropCourseDatabase = function(callback) {
	database.course.dropCoursesDatabase(function() {
		callback();
	});
}

exports.dropLectureDatabase = function(callback) {
	database.lecture.dropLecturesDatabase(function(err){
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

var test_man_lecture = {
	"title" : "Lecture 1: How to API",
	"description" : "For the first lecture, we will REST",
	"manual" : "true",
	"upload" : __dirname + "/course/testUploadFiles/video.mp4"
};

var test_auto_lecture = {
	"start_time" : "1421938500",
	"upload" : __dirname + "/course/testUploadFiles/good_sample.zip"
};

exports.createCourse = function(callback)
{
	if(login_admin_auth)
	{
		request(url)
	    .post('/course')
	    .set('Authorization', login_admin_auth)
	    .send(test_course)
	    .end(function(err, res) {

	    	res.body.status.should.equal('success', "Failed to create course : " + res.body.data.message);

	    	callback(err, res.body.data);
	    });
	}
	else{
		exports.createAdminAndLogin(function(err, user)
		{
			if(err)
				return callback(err);

			exports.createCourse(callback);
		});
	}
}

exports.createLecture = function(course_id, callback)
{
	request(url)
	   .post('/course/' + course_id + '/lecture')
	   .field('start_time',test_auto_lecture.start_time)
	   .attach('upload', test_auto_lecture.upload)
	   .end(function(err, res)
	   {
	   		if(err)
	   			return callback(err);
	   		
	   		res.body.status.should.equal('success', "Failed to create test lecture : " + JSON.stringify(res.body.data.message));
	   		
	   		callback(undefined, res.body.data);
	   });
	
}