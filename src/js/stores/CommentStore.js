/*** Please follow this format when creating new Stores ***/

var Dispatcher      = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var assign          = require('object-assign');
var EventEmitter    = require('events').EventEmitter;

var CHANGE_EVENT = "change";

// TODO : Implement Caching for previously viewed lectures' comments

/*** Place any private variables here ***/
var _comments = {};
var _currentReplyParentId = null;

/***  Place any private helper functions here ***/
var _addComment = function(comment) {
  _comments[comment.id] = comment;
}

var _updateComments = function(comments) {
  for(var i=0; i<comments.length; i++) {
    _comments[comments[i].id] = comments[i];
  }
}

var _addReply = function(reply) {
  if(_currentReplyParentId) {
    _comments[_currentReplyParentId].replies.push(reply);
    _comments[_currentReplyParentId].isReplying = false;
    _currentReplyParentId = null;
  }
}

var _beginReplyToComment = function(commentId) {
  if(_currentReplyParentId) {
    _comments[_currentReplyParentId].isReplying = false;
  }
  _comments[commentId].isReplying = true;
  _currentReplyParentId = commentId;
}

var _cancelReply = function() {
  _comments[_currentReplyParentId].isReplying = false;
  _currentReplyParentId = null;
}

// Create the Store (Extends the EventEmitter Object) TODO : Extend a BaseStore
var CommentStore = assign(new EventEmitter(), {

  // Called when the state of the Store has changed. Those Components that
  // are listening to the store will have their callbacks invoked
  emitChange: function() { this.emit(CHANGE_EVENT); },

  // Exposed to Components so that they may register a callback for requesting
  // and updated state from the Store when the store emits a change
  addChangeListener: function(callback) { this.on(CHANGE_EVENT, callback); },

  // Called by the listening Components when they are about to Unmount
  removeChangeListener: function(callback) { this.removeListener(CHANGE_EVENT, callback); },

  /***
  Publicly exposed methods often accessed by Components in their
  listener callbacks.  These methods should return local state ***/
  getCommentsForLecture: function(lectureId) {
    // TODO : Map to lectureId (uses cacheing of previously viewed lectures)
    return Object.keys(_comments).map(function(key) { return _comments[key]; });
  },

  isReplyingToComment: function(commentId) {
    return (_currentReplyParentId === commentId);
  },

  // Registers this Store with the dispatcher so that the appropriate action
  // handler is invoked when an action is dispatched
  dispatcher: Dispatcher.register(function(payload) {

    console.log(payload);

    // Retrieve the action
    var action = payload.actionType; // this is our action from handleViewAction

    // Depending on the action type, perform the necessary changes
    switch(action){

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

    // The store is now self-updated and emits the change event so that
    // the listening Components can request the updated state
    CommentStore.emitChange();

    return true;
  })
});

module.exports = CommentStore;
