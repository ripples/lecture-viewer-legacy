var Dispatcher      = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var API             = require('../utils/MockData');
var log             = require('../utils/Logging').actionCreator('LECTURE');

var LectureActionCreator = {
  createLecture: function(course_id, tentativeLecture) {
    var lecture = API.createLecture(course_id, tentativeLecture);
    log('CREATE_LECTURE', 'lecture', lecture);
    Dispatcher.dispatch({
      actionType: ActionConstants.CREATE_LECTURE,
      course_id: course_id,
      lecture: lecture
    });
  },

  requestLectures: function(course_id) {
    var lectures = API.getLectures(course_id);
    log('REQUEST_LECTURES', 'lectures', lectures);
    Dispatcher.dispatch({
      actionType: ActionConstants.REQUEST_LECTURES,
      course_id: course_id,
      lectures: lectures
    });
  },

  requestLecture: function(course_id, lecture_id) {
    var lecture = API.getLecture(course_id, lecture_id);
    log('REQUEST_LECTURE', 'lecture', lecture);
    Dispatcher.dispatch({
      actionType: ActionConstants.REQUEST_LECTURE,
      course_id: course_id,
      lecture_id: lecture_id,
      lecture: lecture
    });
  },

  requestMedia: function(course_id, lecture_id) {
    var media = API.getLectureMedia(course_id, lecture_id);
    log('REQUEST_MEDIA', 'media', media);
    Dispatcher.dispatch({
      actionType: ActionConstants.REQUEST_MEDIA,
      course_id: course_id,
      lecture_id: lecture_id,
      media: media
    });
  },

  saveLecture: function(course_id, lecture_id, lecture) {
    var updatedLecture = API.saveLecture(course_id, lecture_id, lecture);
    log('UPDATE_LECTURE', 'updatedLecture', updatedLecture);
    Dispatcher.dispatch({
      actionType: ActionConstants.UPDATE_LECTURE,
      course_id: course_id,
      lecture: updatedLecture
    });
  }
}

module.exports = LectureActionCreator;
