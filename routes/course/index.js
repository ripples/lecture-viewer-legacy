var express = require('express');
var router = express.Router();
var validator = require('validator');

//Add module routes
require('./roster').setup(router);
require('./lecture').setup(router);
require('./comment').setup(router);
require('./attachment').setup(router);

var database = require("../../database/index.js");
var auth = require('../../authentication');

	//Create a course
	router.post('/', auth.verify, function(req,res) {
		//Check if all required parameters are present
	
		if(req.body.department && req.body.course_number && req.body.course_title && req.body.semester && req.body.year && req.body.instructor_email) {
			
			// Attempts to create a course record in database
			
			database.course.createCourse(req.body.department, req.body.course_number, req.body.course_title, req.body.semester, req.body.year, req.body.instructor_email, function(err, course) {
				
				// If no error, send back course data
				
				if(!err) {

					var resCourse = {};

					resCourse.department = course.department;
					resCourse.course_number = course.courseNumber;
					resCourse.course_title = course.courseTitle;
					resCourse.semester = course.semester;
					resCourse.year = course.year;
					resCourse.instructor_emails = course.instructors;	
					resCourse.course_id = course._id;
					resCourse.lectures = course.lectures;

					res.sendSuccess(resCourse);

				} else {
					
					res.sendFail(err);
				}
			});
		
		} else {
			
			res.sendFail("Incorrect parameters");
		
		} 
});

//Get course
router.get('/:course_id', auth.verify, function(req,res) {
	
	//Get course info from database

	if(req.params.course_id == undefined) { 

		res.sendFail("No valid course_id parameter");

	}
	else if(validator.isMongoId(req.params.course_id) == false) {
		
		res.sendFail("Course ID is not a valid MongoID");
	
	}
	else {
		
		database.course.getCourseById(req.params.course_id, function(err, course) {
			
			if(err) {

				res.sendFail(err);

			} else {
				
				var resCourse = {};

				resCourse.department = course.department;
				resCourse.course_number = course.courseNumber;
				resCourse.course_title = course.courseTitle;
				resCourse.semester = course.semester;
				resCourse.year = course.year;
				resCourse.instructor_emails = course.instructors;	
				resCourse.course_id = course._id;
				resCourse.lectures = course.lectures;

				res.sendSuccess(resCourse);
			}
		});
	}
});

//Edit course
router.put('/:course_id', auth.verify, function(req,res) {
	
	if(req.params.course_id == undefined) {

		res.sendFail("No valid course_id parameter");

	}
	else if(validator.isMongoId(req.params.course_id) == false) {

		res.sendFail("Course ID is not a valid MongoID");

	}
	else {
		
		if(req.body.department && req.body.course_number && req.body.course_title && req.body.semester && req.body.year && req.body.instructor_email) {
			
			database.course.updateCourse(req.params.course_id, req.body.department, req.body.course_number, req.body.course_title, req.body.semester, req.body.year, req.body.instructor_email, function(err, course) {
				
				if(err) {

					res.sendFail(err);

				} else {

					var resCourse = {};

					resCourse.department = course.department;
					resCourse.course_number = course.courseNumber;
					resCourse.course_title = course.courseTitle;
					resCourse.semester = course.semester;
					resCourse.year = course.year;
					resCourse.instructor_emails = course.instructors;	
					resCourse.course_id = course._id;

					res.sendSuccess(resCourse);

				}

			});
		
		} else {
			res.sendFail("Incorrect parameters");
		}
	}

});

//Delete course
router.delete('/:course_id', auth.verify, function(req,res) {
	
	if(req.params.course_id == undefined) {

		res.sendFail("No valid course_id parameter");

	}
	else if(validator.isMongoId(req.params.course_id) == false) {
		res.sendFail("Course ID is not a valid MongoID");
	}
	else {
		database.course.deleteCourseById(req.params.course_id, function(err, course) {
			
			if(err) {

				res.sendFail(err);

			} else {

				var resCourse = {};

				resCourse.department = course.department;
				resCourse.course_number = course.courseNumber;
				resCourse.course_title = course.courseTitle;
				resCourse.semester = course.semester;
				resCourse.year = course.year;
				resCourse.instructor_emails = course.instructors;	
				resCourse.course_id = course._id;

				res.sendSuccess(resCourse);

			}

		});
	}
});

module.exports = router;
