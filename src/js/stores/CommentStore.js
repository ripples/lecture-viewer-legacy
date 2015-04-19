var Dispatcher      = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var createStore     = require('../utils/StoreUtils');
var log             = require('../utils/Logging').store('COMMENT');
/*============================== @PRIVATE ==============================*/

var comments = {};

var addComment = function(courseId, lectureId, comment) {
  log('ADD_COMMENT', 'comment', comment);
  if(!comments[courseId]) {
    comments[courseId]={};
    comments[courseId][lectureId]={};
  }
  comments[courseId][lectureId][comment.id] = comment;
}

var addReply = function(courseId, lectureId, updatedComment) {
  log('ADD_REPLY', 'updatedComment', updatedComment);
  comments[courseId][lectureId][updatedComment.id] = updatedComment;
}

var updateComments = function(courseId, lectureId, comments) {
  log('UPDATE_COMMENTS', 'comments', comments);
  if(comments) {
    for(var i=0; i<comments.length; i++) {
      comments[courseId][lectureId][comments[i].id] = comments[i];
    }
  }
}

/*============================== @PUBLIC ==============================*/

var CommentStore = createStore({

  getComments: function(courseId, lectureId) {
    if(comments[courseId] && comments[courseId][lectureId]) {
      return Object.keys(comments[courseId][lectureId]).map(function(key) {
        return comments[courseId][lectureId][key];
      });
    } else {
      return [];
    }
  }
});

/*============================== @DISPATCHING ==============================*/

CommentStore.dispatcher = Dispatcher.register(function(payload) {
  switch(payload.actionType){
    case ActionConstants.CREATE_REPLY:
      addReply(payload.courseId, payload.lectureId, payload.updatedComment);
      break;
    case ActionConstants.CREATE_COMMENT:
      addComment(payload.courseId, payload.lectureId, payload.comment);
      break;
    case ActionConstants.REQUEST_COMMENTS:
      updateComments(payload.courseId, payload.lectureId, payload.comments);
      break;
    defaut:
      break;
  }
  CommentStore.emitChange();
  return true;
});

module.exports = CommentStore;
