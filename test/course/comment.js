var should  = require('should');
var assert  = require('assert');
var request = require('supertest');

var database = require("../../database/index.js");

var url = 'http://localhost:3000';

var helper = require('../helper.js');

describe('Comments', function() {

    this.timeout(30000);


    var user_id = "";
    var user_token = "";
    var lecture_id = "";
    var course_id = "";


    before(function(done) 
    {
    	helper.dropUserDatabase(function()
    	{
    		console.log("Create User, login");

    		helper.createUserAndLogin(function(err, user)
			{
				should.equal(err, undefined, JSON.stringify(err));

				user_id = user.user_id;
				user_token = user.token;

				//Create Course
		    	//Create Lecture in Course

		    	console.log("Create Course");

				helper.createCourse(function(err,course)
				{
					course_id = course.course_id;

					console.log("Create Lecture");
					helper.createLecture(course_id, function(err,lecture)
					{
						lecture_id = lecture.lecture_id;
						done();
					});
				});


				
			});
    	});
    });

    it("Test", function(done)
    {
    	helper.createLecture("1",function(err, res){
    		console.log(err);
    		console.log(res.body);
    		done();   
    	}); 	
    });

});