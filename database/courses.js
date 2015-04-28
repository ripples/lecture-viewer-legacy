var Course = require('./models/course');
exports.lecture = require('./lectures');
exports.comment = require('./comments');
exports.attachment = require('./attachments');
exports.roster = require('./rosters');
/*
  Methods to work with Course database.
  For getter methods, callback should be in the form function (err, data).
  For setter methods, callback should be in the form function (err, affected_documents).
 */
/*
 Method to add a list of eligible emails to the course.
 */
exports.addListOfEmailsById = function(courseId, emailList, callback) {
    Course.findById(courseId, function(err, course) {
        if (err) {
            callback(err);
        } else if (!course) {
            callback("courseID does not exist");
        } else {
            for (var i in emailList) {
                course.emails.push(emailList[i]);
            }
            course.save(function(err) {
                if (err) callback(err);
                else callback(undefined, course);
            });
        }
    });
};
/*
 Method to add list of lectures to course.
 */
exports.addListOfLecturesById = function(courseId, lectureIdList, callback) {
    Course.findById(courseId, function(err, course) {
        if (err) {
            callback(err);
        } else if (!course) {
            callback("courseID does not exist");
        } else {
            for (var i in lectureIdList) {
                course.lectures.push(lectureIdList[i]);
            }
            course.save(function(err) {
                if (err) callback(err);
                else callback(undefined, course);
            });
        }
    });
};
/*
  Method to add a list of  users to course.
 */
exports.addListOfUsersById = function(courseId, userIdList, callback) {
    Course.findById(courseId, function(err, course) {
        if (err) {
            callback(err);
        } else if (!course) {
            callback("courseID does not exist");
        } else {
            for (var i in userIdList) {
                course.registeredUsers.push(userIdList[i]);
            }
            course.save(function(err) {
                if (err) callback(err);
                else callback(undefined, course);
            });
        }
    });
};
/*
  Method to create a course given basic info: semester, department (e.g, CMPSCI), course number(e.g, 497S).
 */
exports.createCourse = function(department, courseNumber, courseTitle, semester, year, instructor, callback) {
    Course.find({
        semester: semester,
        year: year,
        department: department,
        courseNumber: courseNumber
    }, function(err, course) {
        if (err) {
            callback(err);
        } else if (!course) {
            callback(department + " " + courseNumber + " " + semester + " " + year + " already exists.")
        } else {
            Course.create({
                department: department,
                courseNumber: courseNumber,
                courseTitle: courseTitle,
                instructors : instructor,
                semester: semester,
                year: year
            }, function(err, course) {
                // console.log(err);
                // console.log(course);
                // console.log(callback);
                callback(err, course);
            });
        }
    })
};
/*
  Method to remove all eligible emails from the course.
 */
exports.deleteAllEmailsById = function(courseId, callback) {
    Course.findById(courseId, function(err, course) {
        if (err) {
            callback(err);
        } else if (!course) {
            callback("courseID does not exist");
        } else {
            var length = course.emails.length;
            course.emails.splice(0, length);
            course.save(function(err) {
                if (err) callback(err);
                else callback(undefined, course);
            })
        }
    });
};
/*
 Method to remove all registered users from the course.
 */
exports.deleteAllLecturesById = function(courseId, callback) {
    Course.findById(courseId, function(err, course) {
        if (err) {
            callback(err);
        } else if (!course) {
            callback("courseID does not exist");
        } else {
            var length = course.lectures.length;
            course.lectures.splice(0, length);
            course.save(function(err) {
                if (err) callback(err);
                else callback(undefined, course);
            })
        }
    });
};
/*
 Method to remove all registered users from the course.
 */
exports.deleteAllUsersById = function(courseId, callback) {
    Course.findById(courseId, function(err, course) {
        if (err) {
            callback(err);
        } else if (!course) {
            callback("courseID does not exist");
        } else {
            var length = course.registeredUsers.length;
            course.registeredUsers.splice(0, length);
            course.save(function(err) {
                if (err) callback(err);
                else callback(undefined, course);
            })
        }
    });
};
/*
 * Deletes a course by id.
 */
exports.deleteCourseById = function(courseID, callback) {
    Course.findByIdAndRemove(courseID, function(err, course) {
        if (err) {
            callback(err);
        } else {
            callback(undefined, course);
        }
    });
};
/*
 * Method that will drop the database of the courses.
 * Just for testing. No need to be listed in public API.
 */
exports.dropCoursesDatabase = function(callback) {
    Course.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            //console.log("Course database dropped");
        }
        callback();
    });
};
/*
  Method to get course by courseId.
 */
exports.getCourseById = function(id, callback) {
    Course.findById(id, function(err, course) {
        if (err) {
            callback(err);
        } else if (!course) {
            callback("courseID does not exist");
        } else {
            callback(undefined, course);
        }
    });
};
/*
 Method to get all eligible user emails by courseId.
 */
exports.getEligibleEmailsById = function(id, callback) {
    Course.findById(id, function(err, course) {
        if (err) {
            callback(err);
        } else if (!course) {
            callback("courseID does not exist");
        } else {
            callback(undefined, course.emails);
        }
    });
};
/*
  Method to get all registered accounts by courseId.
 */
exports.getRegisteredUsersById = function(id, callback) {
    Course.findById(id).populate('registeredUsers').exec(function(err, course) {
        if (err) callback(err);
        else if (!course) callback('courseID does not exist.');
        else callback(undefined, course.registeredUsers);
    })
};
/*
 * Method to update course using id.
 */
exports.updateCourse = function(course_ID, newDepartment, newCourseNumber, newCourseTitle, newSemester, newYear, newInstructor, callback) {
    Course.findByIdAndUpdate(course_ID, {
        $set: {
            semester: newSemester,
            department: newDepartment,
            courseNumber: newCourseNumber,
            courseTitle: newCourseTitle,
            year: newYear,
            instructors: newInstructor
        }
    }, callback);
};
/*
 * This method gets all courses by semester
 */
exports.getAllCoursesBySemester = function(semester, callback) {
    Course.find({
        semester: semester
    }, function(err, course) {
        if (err) {
            callback(err);
        } else if (!course) {
            callback("No courses in that semester");
        } else {
            callback(undefined, course);
        }
    });
};
