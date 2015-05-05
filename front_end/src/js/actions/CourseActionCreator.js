var Dispatcher      = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var API             = require('../utils/MockData');
var log             = require('../utils/Logging').actionCreator('COURSE');

var CourseActionCreator = {
  createCourse: function(tentativeCourse) {
    var course = API.createCourse(tentativeCourse);
    log('CREATE_COURSE', 'course', course);
    Dispatcher.dispatch({
      actionType: ActionConstants.CREATE_COURSE,
      course: course
    });
  },

  requestCourses: function() {
    var courses = API.getCourses();
    log('REQUEST_COURSES', 'courses', courses);
    Dispatcher.dispatch({
      actionType: ActionConstants.REQUEST_COURSES,
      courses: courses
    });
  },

  requestCourse: function(course_id) {
    var course = API.getCourse(course_id);
    log('REQUEST_COURSE', 'course', course);
    // Dispatcher.dispatch({
    //   actionType: ActionConstants.REQUEST_COURSE,
    //   course_id: course_id,
    //   course: course
    // });
  },

  saveCourse: function(course_id, course) {
    var course = API.saveCourse(course_id, course);
    log('SAVE_COURSE', 'course', course);
    Dispatcher.dispatch({
      actionType: ActionConstants.SAVE_COURSE,
      course_id: course_id,
      course: course
    });
  }
}

module.exports = CourseActionCreator;
