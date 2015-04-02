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
  }
}

module.exports = CourseActionCreator;
