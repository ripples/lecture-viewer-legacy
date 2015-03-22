var Dispatcher      = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var assign          = require('object-assign');
var EventEmitter    = require('events').EventEmitter;

var CHANGE_EVENT = "change";

var log = function(action, data) {
  console.log('[STORE] <' + action + '> ' + JSON.stringify(data));
}

/*============================== @PRIVATE ==============================*/

var comments = {};

var addComment = function(courseId, lectureId, comment) {
  log('ADD COMMENT', comment);
  if(!comments[courseId]) {
    comments[courseId]={};
    comments[courseId][lectureId]={};
  }
  comments[courseId][lectureId][comment.id] = comment;
}

var addReply = function(courseId, lectureId, updatedComment) {
  log('ADD REPLY', updatedComment);
  comments[courseId][lectureId][updatedComment.id] = updatedComment;
}

var updateComments = function(courseId, lectureId, comments) {
  log('UPDATE COMMENTS', comments);
  for(var i=0; i<comments.length; i++) {
    comments[courseId][lectureId][comments[i].id] = comments[i];
  }
}

/*============================== @PUBLIC ==============================*/

//  TODO : Extend a BaseStore
var CommentStore = assign(new EventEmitter(), {

  emitChange: function() { this.emit(CHANGE_EVENT); },

  addChangeListener: function(callback) { this.on(CHANGE_EVENT, callback); },

  removeChangeListener: function(callback) { this.removeListener(CHANGE_EVENT, callback); },

  getComments: function(courseId, lectureId) {
    if(comments[courseId] && comments[courseId][lectureId]) {
      return Object.keys(comments[courseId][lectureId]).map(function(key) {
        return comments[courseId][lectureId][key];
      });
    } else {
      return [];
    }
  },

  /*============================== @DISPATCHING ==============================*/

  dispatcher: Dispatcher.register(function(payload) {
    switch(payload.actionType){
      case ActionConstants.REPLY_SUBMIT:
        addReply(
          payload.courseId,
          payload.lectureId,
          payload.updatedComment
        );
        break;
      case ActionConstants.CREATE_COMMENT:
        addComment(
          payload.courseId,
          payload.lectureId,
          payload.comment
        );
        break;
      case ActionConstants.REQUEST_COMMENTS:
        updateComments(
          payload.courseId,
          payload.lectureId,
          payload.comments
        );
        break;
      defaut:
        break;
    }
    CommentStore.emitChange();
    return true;
  })
});

module.exports = CommentStore;
