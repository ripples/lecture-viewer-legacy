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
	// Check if all required parameters are present
	// if(req.body.department && req.body.courseNumber && req.body.courseTitle && req.body.semester && req.body.year && req.body.instructor) {
	// 	// Attempts to create new course using database methods
	// 	database.course.createCourse(req.body.department, req.body.courseNumber, req.body.courseTitle, req.body.semester, req.body.year, req.body.instructor, function(err) {
	// 		//If no error, send back course data
	// 		if(err == undefined) {
	// 			//I will need the user data to be returned to me in a user variable
	// 			res.sendSuccess("Wooo!! Course Created");
	// 		} else {
	// 			// I will need to know why it failed... Logic problem or a legit error
	// 			res.sendFail(err);
	// 		}
	// 	});
	// } else {
	// 	res.sendFail("Incorrect parameters");	
	// }
});

//Get course
router.get('/:course_id', function(req,res) {
	//Get course info from database
	// if(req.params.course_id == undefined) {
	// 	res.sendFail("No valid course_id parameter");
	// } else if(validator.isMongoId(req.params.course_id) == false) {
	// 	res.sendFail("Course ID is not a valid MongoID");
	// } else {
	// 	database.course.getCourseById(req.params.course_id, function(err, course) {
	// 		if(err) {
	// 			res.sendFail(err);	
	// 		} else {
	// 			// TODO: send back course
	// 			res.sendSuccess("Got Course");	
	// 		}
	// 	});	
	// }	
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
