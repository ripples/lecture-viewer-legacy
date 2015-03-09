var Dispatcher = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var API = require('../utils/MockData');

var CommentActionCreator = {

  beginReplyToComment: function(commentId) {
    console.log('Dispatching REPLY_BEGIN with data: ' + commentId);
    Dispatcher.dispatch({actionType: ActionConstants.REPLY_BEGIN, parentCommentId: commentId});
  },

  cancelReply: function() {
    console.log('Dispatching REPLY_CANCEL');
    Dispatcher.dispatch({actionType: ActionConstants.REPLY_CANCEL});
  },

  createReplyToComment: function(replyBody, commentId) {
    var reply = API.createReply(replyBody, commentId);
    console.log('Dispatching REPLY_SUBMIT with data: ' + reply);
    Dispatcher.dispatch({actionType: ActionConstants.REPLY_SUBMIT, reply: reply});
  },

  createCommentForLecture: function(commentBody, lectureId) {
    var comment = API.createComment(commentBody, lectureId);
    console.log('Dispatching CREATE_COMMENT with data: ' + comment);
    Dispatcher.dispatch({actionType: ActionConstants.CREATE_COMMENT, comment: comment});
  },

  requestCommentsForLecture: function(lectureId) {
    var comments = API.getCommentsForLecture(lectureId);
    console.log('Dispatching REQUEST_COMMENTS with data: ' + comments);
    Dispatcher.dispatch({actionType: ActionConstants.REQUEST_COMMENTS, comments: comments});
  }
}

module.exports = CommentActionCreator;
