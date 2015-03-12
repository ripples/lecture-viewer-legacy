var Dispatcher = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var API = require('../utils/MockData');

var log = function(action, data) {
  console.log('[DISPATCHING] <' + action + '> ' + JSON.stringify(data));
}

var CommentActionCreator = {

  beginReplyToComment: function(commentId) {
    log('REPLY_BEGIN', commentId);
    Dispatcher.dispatch({actionType: ActionConstants.REPLY_BEGIN, parentCommentId: commentId});
  },

  cancelReply: function() {
    log('REPLY_CANCEL', null);
    Dispatcher.dispatch({actionType: ActionConstants.REPLY_CANCEL});
  },

  createReplyToComment: function(replyBody, commentId) {
    var reply = API.createReply(replyBody, commentId);
    log('REPLY_SUBMIT', reply);
    Dispatcher.dispatch({actionType: ActionConstants.REPLY_SUBMIT, reply: reply});
  },

  createCommentForLecture: function(commentBody, lectureId, isAnonymous) {
    var comment = API.createComment(commentBody, lectureId, isAnonymous);
    log('CREATE_COMMENT', comment);
    Dispatcher.dispatch({actionType: ActionConstants.CREATE_COMMENT, comment: comment});
  },

  requestCommentsForLecture: function(lectureId) {
    var comments = API.getCommentsForLecture(lectureId);
    log('REQUEST_COMMENTS', comments);
    Dispatcher.dispatch({actionType: ActionConstants.REQUEST_COMMENTS, comments: comments});
  }
}

module.exports = CommentActionCreator;
