var Dispatcher      = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var createStore     = require('../utils/StoreUtils');
var log             = require('../utils/Logging').store('MEDIA');

/*============================== @PRIVATE ==============================*/

var lectureMedia = {};

var updateMedia = function(course_id, lecture_id, media) {
  log('UPDATE_MEDIA', 'media', media);
  if(!lectureMedia[course_id]) {
    lectureMedia[course_id]={};
  }
  lectureMedia[course_id][lecture_id] = media;
}

/*============================== @PUBLIC ==============================*/

var MediaStore = createStore({

  getMedia: function(course_id, lecture_id)  {
    if(lectureMedia[course_id]) {
      if(lectureMedia[course_id][lecture_id]) {
        return lectureMedia[course_id][lecture_id];
      }
    }
    return null;
  }
});

/*============================== @DISPATCHING ==============================*/

MediaStore.dispatcher = Dispatcher.register(function(payload) {
  switch(payload.actionType){
    case ActionConstants.REQUEST_MEDIA:
      updateMedia(payload.course_id, payload.lecture_id, payload.media);
      break;
    defaut:
      break;
  }
  MediaStore.emitChange();
  return true;
});

module.exports = MediaStore;
