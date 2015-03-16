var Dispatcher      = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var assign          = require('object-assign');
var EventEmitter    = require('events').EventEmitter;

var CHANGE_EVENT = "change";

// TODO : Implement Caching for previously viewed lectures' comments

var log = function(action, data) {
  console.log('[STORE] <' + action + '> ' + JSON.stringify(data));
}

var _comments = {};
var _currentReplyParentId = null;

var _addComment = function(comment) {
  log('ADD COMMENT', comment);
  _comments[comment.id] = comment;
}

var _updateComments = function(comments) {
  log('UPDATE COMMENTS', comments);
  for(var i=0; i<comments.length; i++) {
    _comments[comments[i].id] = comments[i];
  }
}

var _addReply = function(reply) {
  log('ADD REPLY', reply);

  // TODO : BUG BUG BUG BUG BUG : This SHOULD be uncommented to add replies.
  // Strangely enough, the comment is being added to the _comments array
  // without calling any of the code below, and twice if we uncomment it.
  // WTFFFFFFFFFF...

  if(_currentReplyParentId) {
    // _comments[_currentReplyParentId].replies.push(reply);
    // console.log(JSON.stringify(_comments[_currentReplyParentId].replies));
    _comments[_currentReplyParentId].isReplying = false;
    _currentReplyParentId = null;
  }
}

var _beginReplyToComment = function(commentId) {
  log('BEGIN REPLY', commentId);
  if(_currentReplyParentId) {
    _comments[_currentReplyParentId].isReplying = false;
  }
  _comments[commentId].isReplying = true;
  _currentReplyParentId = commentId;
}

var _cancelReply = function() {
  log('CANCEL REPLY', null);
  if(_currentReplyParentId) {
    _comments[_currentReplyParentId].isReplying = false;
    _currentReplyParentId = null;
  }
}

//  TODO : Extend a BaseStore

var CommentStore = assign(new EventEmitter(), {

  emitChange: function() { this.emit(CHANGE_EVENT); },

  addChangeListener: function(callback) { this.on(CHANGE_EVENT, callback); },

  removeChangeListener: function(callback) { this.removeListener(CHANGE_EVENT, callback); },

  getCommentsForLecture: function(lectureId) {
    // TODO : Map to lectureId (uses cache of previously viewed lectures)
    return Object.keys(_comments).map(function(key) { return _comments[key]; });
  },

  isReplyingToComment: function(commentId) {
    return (_currentReplyParentId === commentId);
  },

  dispatcher: Dispatcher.register(function(payload) {
    switch(payload.actionType){
      case ActionConstants.REPLY_BEGIN:
        _beginReplyToComment(payload.parentCommentId);
        break;
      case ActionConstants.REPLY_CANCEL:
        _cancelReply();
        break;
      case ActionConstants.REPLY_SUBMIT:
        _addReply(payload.reply);
        break;
      case ActionConstants.CREATE_COMMENT:
        _addComment(payload.comment);
        break;
      case ActionConstants.REQUEST_COMMENTS:
        _updateComments(payload.comments);
        break;
      defaut:
        break;
    }
    CommentStore.emitChange();
    return true;
  })
});

module.exports = CommentStore;
