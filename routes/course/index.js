var express = require('express');
var router = express.Router();
var validator = require('validator');

//Add module routes
require('./roster').setup(router);
require('./lecture').setup(router);
require('./comment').setup(router);
require('./attachment').setup(router);

var database = require("../../database/index.js");

	//Create a course
	router.post('/', function(req,res) {
		//Check if all required parameters are present
	
		if(req.body.department, req.body.courseNumber, req.body.courseTitle, req.body.semester, req.body.year, req.body.instructor) {
			
			// Attempts to create a course record in database
			
			database.course.createCourse(req.body.department, req.body.courseNumber, req.body.courseTitle, req.body.semester, req.body.year, req.body.instructor, function(err, course) {
				
				// If no error, send back course data
				
				if(!err) {
					
					console.log(course);

					var resCourse = {};

					resCourse.department = course.department;
					resCourse.courseNumber = course.courseNumber;
					resCourse.courseTitle = course.courseTitle;
					resCourse.semester = course.semester;
					resCourse.year = course.year;
					resCourse.instructor = course.instructor;	
					resCourse.course_id = course._id;

					return res.sendSuccess(resCourse);

				} else {
					
					res.sendFail(err);
				}
			});
		
		} else {
			
			res.sendFail("Incorrect parameters");
		
		} 
});

//Get course
router.get('/:course_id', function(req,res) {
	
	//Get course info from database

	if(req.params.course_id == undefined) { 

		res.sendFail("No valid user_id parameter");

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
				resCourse.courseNumber = course.courseNumber;
				resCourse.courseTitle = course.courseTitle;
				resCourse.semester = course.semester;
				resCourse.year = course.year;
				resCourse.instructor = course.instructor;	
				resCourse.course_id = course._id;

				res.sendSuccess(resCourse);
			}
		});
	}
});

//Edit course
router.put('/:course_id', function(req,res) {
	//TODO - no update course method in db?
});

//Delete course
router.delete('/:course_id', function(req,res) {
	// database.course.deleteCourseById(req.params.course_id, function(err, course)) {
	// 	if(err) {
	// 		res.sendFail(err);
	// 	} else {
	// 		res.sendSuccess("Deleted");	
	// 	}
	// }
});

module.exports = router;
