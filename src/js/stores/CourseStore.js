var Dispatcher      = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var assign          = require('object-assign');
var EventEmitter    = require('events').EventEmitter;

var CHANGE_EVENT = "change";

var log = function(action, data) {
  console.log('[STORE] <' + action + '> ' + JSON.stringify(data));
}

/*============================== @PRIVATE ==============================*/

var courses = {};

var addCourse = function(course) {
  log('ADD COURSE', course);
  courses[course.id] = course;
}

var updateCourses = function(updatedCourses) {
  log('UPDATE COURSES', updatedCourses);
  for(var i=0; i<updatedCourses.length; i++) {
    courses[updatedCourses[i].id] = updatedCourses[i];
  }
}

/*============================== @PUBLIC ==============================*/

//  TODO : Extend a BaseStore
var CourseStore = assign(new EventEmitter(), {

  emitChange: function() { this.emit(CHANGE_EVENT); },

  addChangeListener: function(callback) { this.on(CHANGE_EVENT, callback); },

  removeChangeListener: function(callback) { this.removeListener(CHANGE_EVENT, callback); },

  getCourses: function() {
    return Object.keys(courses).map(function(key) {
      return courses[key];
    });
  },

  /*============================== @DISPATCHING ==============================*/

  dispatcher: Dispatcher.register(function(payload) {
    switch(payload.actionType){
      case ActionConstants.CREATE_COURSE:
        addCourse(
          payload.course
        );
        break;
      case ActionConstants.REQUEST_COURSES:
        updateCourses(
          payload.courses
        );
        break;
      defaut:
        break;
    }
    CourseStore.emitChange();
    return true;
  })
});

module.exports = CourseStore;
