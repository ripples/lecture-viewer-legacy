var db_api = require('../index.js');
var should = require('chai').should();
var assert = require('assert');

describe('Testing Courses collection:', function() {
	/*
	 * Preconditions.
	 */
	 var testCourse = null;
	 var testUser   = null;
	 before(function(done){
	 	db_api.courses.dropCoursesDatabase(function(){
	 		db_api.courses.createCourse('Fall','Sociology','SOC101', function(err,course) {
	 		  testCourse = course;
	 		  assert.equal(err,null);
	 		  assert.notEqual(testCourse, null);
	 		  assert.equal(testCourse.semester, 'Fall');
	 		  assert.equal(testCourse.department,'Sociology');
	 		  assert.equal(testCourse.courseNumber, 'SOC101');
	 		  done();
	 		});
	 	});
	 });
	 //required for a test user.
	 before(function(done){
	 	db_api.users.dropUserDatabase(function(){
		 	db_api.users.createUser('test20@test.com', 'password', 'username', 'role', function(err,usr){
		 		testUser = usr;
		        assert.equal(err, null);
		        assert.notEqual(testUser, null);
		        assert.equal(testUser.email, 'test20@test.com');
		        assert.equal(testUser.password, 'password');
		        assert.equal(testUser.username, 'username');
		        assert.equal(testUser.role, 'role');
		        done();
			});		 		
	 	});
	 });


	 /*
	  * Post-condition
	  */
	  after(function(done){
	  	db_api.courses.deleteCourseById(testCourse._id,function(err,count){
		   	 		assert.equal(err,null);
		   	 		assert.notEqual(count,null);
		   	 		count._id.should.eql(testCourse._id);
		   	 		done();
		   	 	});
	  });

	  /*
	   * Tests the createCourse method creates a course properly.
	   */
	   var newCourse = null;//for deletion.
	   it('creates a new course: semester, department ourseNumber',function(done){
		    db_api.courses.createCourse('Spring','Psychology','PS101',function(err,course){
	 		  newCourse = course;
	 		  assert.equal(err,null);
	 		  assert.notEqual(course, null);
	 		  assert.equal(course.semester, 'Spring');
	 		  assert.equal(course.department,'Psychology');
	 		  assert.equal(course.courseNumber, 'PS101');
	 		  done();
		 	});
		}); 	

	   /*
	    * Tests that getCourseById returns the right course.
	    */
	    it('retrieves a course by ID: CourseID', function(done){
	    	db_api.courses.getCourseById(testCourse._id, function(err, course){
	    		assert.equal(err,null);
	    		assert.notEqual(course, null);
	    		assert.equal(course.courseNumber,testCourse.courseNumber);
	    		assert.equal(course.department,testCourse.department);
	    		assert.equal(course.semester,testCourse.semester);
	    		done();
	    	});
	    });

	    /*
	     * Test that the email list is added properly to the course.
	     */
	     var Emails = ["test@test.com","test2@test.com","test3@test.com"];
	     it('add list of emails to a course by ID: courseID, listofemails', function(done){
	     	db_api.courses.addListOfEmailsById(testCourse._id,Emails,function(err,course){
	     		assert.equal(err,null);
	     		assert.notEqual(course,null);
	     		course.emails[0].should.eql("test@test.com");
	     		course.emails[1].should.eql("test2@test.com");
	     		course.emails[2].should.eql("test3@test.com");
	     		done();
	     	});
	     });

	     /*
	      * Tests that the course retreived by course id is correct.
	      */
	      it('retrieves course by Id: courseID',function(done){
	      	db_api.courses.getCourseById(testCourse._id, function(err,course){
	      		assert.equal(err, null);
	      		assert.notEqual(course,null);
	      		assert.equal(course.courseNumber, 'SOC101');
	      		assert.equal(course.semester, 'Fall');
	      		assert.equal(course.department,'Sociology');
	      		course._id.should.eql(testCourse._id);
	      		done();
	      	});
	      });
	
		  /*
		   * Test that the the functions adds a list of users properly.
		   */
		   it('adds list of users by Id: courseID', function(done){
		   	db_api.courses.addListOfUsersById(testCourse._id, [testUser], function(err, course){
		   		assert.equal(err, null);
		   		assert.notEqual(course, null);
		   		assert.equal(course.registeredUsers[0], testUser._id);
		   		done();
		   	});
		   });

		  /*
		   * Test that the function gets user properly.
		   */
		   it('gets registered users by course id: courseID', function(done){
		   	db_api.courses.getRegisteredUsersById(testCourse._id, function(err, course){
		   		assert.equal(err, null);
		   		assert.notEqual(course, null);
		   		course[0]._id.should.eql(testUser._id);
		   		done();
		   	});
		   });

		   //addListOfLecturesById
		   // it('adds list of lectures by id:', function(done){
		   // 	db_api.courses.addListOfLecturesById(testCourse._id, [testCourse], function(err, course){

		   // 	});
		   // });

	      /*
		   * Tests that the users emails returned are correct.
		   */
		   it('retrieves user emails by courseID: courseID',function(done){
		   	db_api.courses.getEligibleEmailsById(testCourse._id,function(err,user){
		   		assert.equal(err, null);
		   		assert.notEqual(user, null);
		   		user[0].should.eql("test@test.com");
		   		user[1].should.eql("test2@test.com");
		   		user[2].should.eql("test3@test.com");
		   		done();
		   	});
		   });

		   /*
		    * Tests that all the emails are deleted
		    */

		   it('deletes all emails of a course: courseID', function(done){
		   	db_api.courses.deleteAllEmailsById(testCourse._id, function(err,course){
		   		assert.equal(err, null);
		   		assert.notEqual(course, null);
		   		course.emails.length.should.eql(0);//empty array
		   		done();
		   	});
		   });

			
			/*
			 * Tests that all the lectures are deleted properly.
			 */
			 it('deletes all lectures by id: courseID', function(done){
			 	db_api.courses.deleteAllLecturesById(testCourse._id, function(err, course){
			 		assert.equal(err, null);
			 		assert.notEqual(course, null);
			 		course.lectures.length.should.eql(0);
			 		done();
			 	});
			 });

			 /*
			  * Test that all the users of a course a deleted properly.
			  */
			 it('deletes all the users by id: courseID', function(done){
			 	db_api.courses.deleteAllUsersById(testCourse._id, function(err, course){
			 		assert.equal(err, null);
			 		assert.notEqual(course, null);
			 		course.registeredUsers.length.should.eql(0);
			 		done();
			 	});
			 });

		   	/*
		   	 * Test that deleteCourseById deletes the course properly.
		   	 */
		   	 it('deletes a course by ID: courseID',function(done){
		   	 	db_api.courses.deleteCourseById(newCourse._id,function(err,count){
		   	 		assert.equal(err,null);
		   	 		assert.notEqual(count,null);
		   	 		count._id.should.eql(newCourse._id);
		   	 		done();
		   	 	});
		   	 });


		  
});

