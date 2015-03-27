var Dispatcher      = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var API             = require('../utils/MockData');

var log = function(action, data) {
  console.log('[DISPATCHING] <' + action + '> ' + JSON.stringify(data));
}

var CommentActionCreator = {
  createReply: function(courseId, lectureId, comment, replyContent) {
    var comment = API.createReply(courseId, lectureId, comment, replyContent);
    log('CREATE_REPLY', comment);
    Dispatcher.dispatch({
      actionType: ActionConstants.CREATE_REPLY,
      courseId: courseId,
      lectureId: lectureId,
      updatedComment: comment
    });
  },

  createComment: function(courseId, lectureId, commentContent, isAnonymous) {
    var comment = API.createComment(courseId, lectureId, commentContent, isAnonymous);
    log('CREATE_COMMENT', comment);
    Dispatcher.dispatch({
      actionType: ActionConstants.CREATE_COMMENT,
      courseId: courseId,
      lectureId: lectureId,
      comment: comment
    });
  },

  requestComments: function(courseId, lectureId) {
    var comments = API.getComments(lectureId);
    log('REQUEST_COMMENTS', comments);
    Dispatcher.dispatch({
      actionType: ActionConstants.REQUEST_COMMENTS,
      courseId: courseId,
      lectureId: lectureId,
      comments: comments
    });
  }
}

module.exports = CommentActionCreator;
