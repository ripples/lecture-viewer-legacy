var Dispatcher      = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var assign          = require('object-assign');
var EventEmitter    = require('events').EventEmitter;

var CHANGE_EVENT = "change";

var log = function(action, data) {
  console.log('[STORE] <' + action + '> ' + JSON.stringify(data));
}

/*============================== @PRIVATE ==============================*/

var lectures = {};

var addLecture = function(course_id, lecture) {
  log('ADD LECTURE', lecture);
  if(!lectures[course_id]) {
    lectures[course_id]={};
  }
  lectures[course_id][lecture.id] = lecture;
}

var updateLectures = function(course_id, updatedLectures) {
  log('UPDATE LECTURES', updatedLectures);
  if(!lectures[course_id]) {
    lectures[course_id]={};
  }
  for(var i=0; i<updatedLectures.length; i++) {
    lectures[course_id][updatedLectures[i].id] = updatedLectures[i];
  }
}

/*============================== @PUBLIC ==============================*/

//  TODO : Extend a BaseStore
var LectureStore = assign(new EventEmitter(), {

  emitChange: function() { this.emit(CHANGE_EVENT); },

  addChangeListener: function(callback) { this.on(CHANGE_EVENT, callback); },

  removeChangeListener: function(callback) { this.removeListener(CHANGE_EVENT, callback); },

  getLectures: function(course_id) {
    if(lectures[course_id]) {
      return Object.keys(lectures[course_id]).map(function(key) {
        return lectures[course_id][key];
      });
    } else {
      return [];
    }
  },

  /*============================== @DISPATCHING ==============================*/

  dispatcher: Dispatcher.register(function(payload) {
    switch(payload.actionType){
      case ActionConstants.CREATE_LECTURE:
        addLecture(
          payload.course_id,
          payload.lecture
        );
        break;
      case ActionConstants.REQUEST_LECTURES:
        updateLectures(
          payload.course_id,
          payload.lectures
        );
        break;
      defaut:
        break;
    }
    LectureStore.emitChange();
    return true;
  })
});

module.exports = LectureStore;
