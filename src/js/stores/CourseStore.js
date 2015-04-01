var Dispatcher      = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var createStore     = require('../utils/StoreUtils');
var log             = require('../utils/Logging').store('COURSE');

/*============================== @PRIVATE ==============================*/

var courses = {};

var addCourse = function(course) {
  log('ADD_COURSE', 'course', course);
  courses[course.id] = course;
}

var updateCourses = function(updatedCourses) {
  log('UPDATE_COURSES', 'updatedCourses', updatedCourses);
  for(var i=0; i<updatedCourses.length; i++) {
    courses[updatedCourses[i].id] = updatedCourses[i];
  }
}

/*============================== @PUBLIC ==============================*/

var CourseStore = createStore({
  getCourses: function() {
    return Object.keys(courses).map(function(key) {
      return courses[key];
    });
  }
});

/*============================== @DISPATCHING ==============================*/

CourseStore.dispatcher = Dispatcher.register(function(payload) {
  switch(payload.actionType){
    case ActionConstants.CREATE_COURSE:
      addCourse(payload.course);
      break;
    case ActionConstants.REQUEST_COURSES:
      updateCourses(payload.courses);
      break;
    defaut:
      break;
  }
  CourseStore.emitChange();
  return true;
});

module.exports = CourseStore;
