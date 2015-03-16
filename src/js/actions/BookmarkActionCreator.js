var Dispatcher = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var API = require('../utils/MockData');

var log = function(action, data) {
  console.log('[DISPATCHING] <' + action + '> ' + JSON.stringify(data));
}

var BookmarkActionCreator = {

  beginEdit: function(bookmarkId) {
    log('EDIT_BOOKMARK_BEGIN', bookmarkId);
    Dispatcher.dispatch({actionType: ActionConstants.EDIT_BOOKMARK_BEGIN, bookmarkId: bookmarkId});
  },

  cancelEdit: function() {
    log('EDIT_BOOKMARK_CANCEL', null);
    Dispatcher.dispatch({actionType: ActionConstants.EDIT_BOOKMARK_CANCEL});
  },

  submitEdit: function(bookmarkBody, bookmarkId) {
    var bookmark = API.updateBookmark(bookmarkBody, bookmarkId);
    log('EDIT_BOOKMARK_SUBMIT', bookmark);
    Dispatcher.dispatch({actionType: ActionConstants.EDIT_BOOKMARK_SUBMIT, bookmark: bookmark});
  },

  createBookmarkForLecture: function(bookmarkBody, lectureId) {
    var bookmark = API.createBookmark(bookmarkBody, lectureId);
    log('CREATE_BOOKMARK', bookmark);
    Dispatcher.dispatch({actionType: ActionConstants.CREATE_BOOKMARK, bookmark: bookmark});
  },

  requestBookmarksForLecture: function(lectureId) {
    var bookmarks = API.getBookmarksForLecture(lectureId);
    log('REQUEST_BOOKMARKS', bookmarks);
    Dispatcher.dispatch({actionType: ActionConstants.REQUEST_BOOKMARKS, bookmarks: bookmarks});
  }

  // TODO : DELETE BOOKMARK
}

module.exports = BookmarkActionCreator;
