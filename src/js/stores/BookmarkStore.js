var Dispatcher      = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var assign          = require('object-assign');
var EventEmitter    = require('events').EventEmitter;

var CHANGE_EVENT = "change";

// TODO : Implement Caching for previously viewed lectures' bookmarks

var log = function(action, data) {
  console.log('[STORE] <' + action + '> ' + JSON.stringify(data));
}

var _bookmarks = {};
var _currentEditingBookmarkId = null;

var _addBookmark = function(bookmark) {
  log('ADD BOOKMARK', bookmark);
  _bookmarks[bookmark.id] = bookmark;
}

var _updateBookmarks = function(bookmarks) {
  log('UPDATE BOOKMARKS', bookmarks);
  for(var i=0; i<bookmarks.length; i++) {
    _bookmarks[bookmarks[i].id] = bookmarks[i];
  }
}

var _saveEditedBookmark = function(bookmark) {
  log('SAVE EDITED BOOKMARK', bookmark);

  if(_currentEditingBookmarkId) {
    _bookmarks[_currentEditingBookmarkId] = bookmark;
    console.log(JSON.stringify(_bookmarks[_currentEditingBookmarkId]));
    _bookmarks[_currentEditingBookmarkId].isEditing = false;
    _currentEditingBookmarkId = null;
  }
}

var _beginEditingBookmark = function(bookmarkId) {
  log('BEGIN EDITING BOOKMARK', bookmarkId);
  if(_currentReplyParentId) {
    _bookmarks[_currentEditingBookmarkId].isEditing = false;
  }
  _bookmarks[bookmarkId].isEditing = true;
  _currentEditingBookmarkId = bookmarkId;
}

var _cancelEditingBookmark = function() {
  log('CANCEL EDITING BOOKMARK', null);
  if(_currentEditingBookmarkId) {
    _bookmarks[_currentEditingBookmarkId].isEditing = false;
    _currentEditingBookmarkId = null;
  }
}

//  TODO : Extend a BaseStore

var BookmarkStore = assign(new EventEmitter(), {

  emitChange: function() { this.emit(CHANGE_EVENT); },

  addChangeListener: function(callback) { this.on(CHANGE_EVENT, callback); },

  removeChangeListener: function(callback) { this.removeListener(CHANGE_EVENT, callback); },

  getBookmarks: function(courseId, lectureId) {
    // TODO : Map to lectureId (uses cache of previously viewed lectures)
    return Object.keys(_bookmarks).map(function(key) { return _bookmarks[key]; });
  },

  isEditingBookmark: function(bookmarkId) {
    return (_currentEditingBookmarkId === bookmarkId);
  },

  UPDATE_BOOKMARK_BEGIN: 'UPDATE_BOOKMARK_BEGIN',
  UPDATE_BOOKMARK_CANCEL: 'UPDATE_BOOKMARK_CANCEL',
  UPDATE_BOOKMARK: 'UPDATE_BOOKMARK',
  CREATE_BOOKMARK: 'CREATE_BOOKMARK',
  REQUEST_BOOKMARKS: 'REQUEST_BOOKMARKS',

  dispatcher: Dispatcher.register(function(payload) {
    switch(payload.actionType){
      case ActionConstants.UPDATE_BOOKMARK_BEGIN:
        _beginEditingBookmark(payload.bookmarkId);
        break;
      case ActionConstants.UPDATE_BOOKMARK_CANCEL:
        _cancelEditingBookmark();
        break;
      case ActionConstants.UPDATE_BOOKMARK:
        _saveEditedBookmark(payload.bookmark);
        break;
      case ActionConstants.CREATE_BOOKMARK:
        _addBookmark(payload.bookmark);
        break;
      case ActionConstants.REQUEST_BOOKMARKS:
        _updateBookmarks(payload.bookmarks);
        break;
      defaut:
        break;
    }
    BookmarkStore.emitChange();
    return true;
  })
});

module.exports = BookmarkStore;
