var Dispatcher      = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var createStore     = require('../utils/StoreUtils');
var log             = require('../utils/Logging').store('LECTURE');

/*============================== @PRIVATE ==============================*/

var lectures = {};

var addLecture = function(course_id, lecture) {
  log('ADD_LECTURE', 'lecture', lecture);
  if(!lectures[course_id]) {
    lectures[course_id]={};
  }
  lectures[course_id][lecture.id] = lecture;
}

var updateLectures = function(course_id, updatedLectures) {
  log('UPDATE_LECTURES', 'updatedLectures', updatedLectures);
  if(!lectures[course_id]) {
    lectures[course_id]={};
  }
  for(var i=0; i<updatedLectures.length; i++) {
    lectures[course_id][updatedLectures[i].id] = updatedLectures[i];
  }
}

var updateLecture = function(course_id, lecture) {
  log('UPDATE_LECTURE', 'lecture', lecture);
  if(!lectures[course_id]) {
    lectures[course_id]={};
  }
  lectures[course_id][lecture.id] = lecture;
}

var saveLecture = function(course_id, updatedLecture) {
  log('SAVE_LECTURE', 'updatedLecture', updatedLecture);
  if(!lectures[course_id]) {
    lectures[course_id]={};
  }
  lectures[course_id][updatedLecture.id] = updatedLecture;
}

/*============================== @PUBLIC ==============================*/

var LectureStore = createStore({

  getLectures: function(course_id) {
    if(lectures[course_id]) {
      return Object.keys(lectures[course_id]).map(function(key) {
        return lectures[course_id][key];
      });
    } else {
      return [];
    }
  },

  getLecture: function(course_id, lecture_id) {
    if(lectures[course_id]) {
      if(lectures[course_id][lecture_id]) {
        return lectures[course_id][lecture_id];
      }
    }
    return null;
  }
});

/*============================== @DISPATCHING ==============================*/

LectureStore.dispatcher = Dispatcher.register(function(payload) {
  switch(payload.actionType){
    case ActionConstants.CREATE_LECTURE:
      addLecture(payload.course_id, payload.lecture);
      break;
    case ActionConstants.REQUEST_LECTURES:
      updateLectures(payload.course_id, payload.lectures);
      break;
    case ActionConstants.REQUEST_LECTURE:
      updateLecture(payload.course_id, payload.lecture);
      break;
    case ActionConstants.UPDATE_LECTURE:
      saveLecture(payload.course_id, payload.lecture);
      break;
    defaut:
      break;
  }
  LectureStore.emitChange();
  return true;
});

module.exports = LectureStore;
