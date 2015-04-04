var Dispatcher      = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var API             = require('../utils/MockData');
var log             = require('../utils/Logging').actionCreator('BOOKMARK');

var BookmarkActionCreator = {

  createBookmark: function(courseId, lectureId, content, time) {
    var bookmark = API.create_bookmark(courseId, lectureId, content, time);
    log('CREATE_BOOKMARK', 'bookmark', bookmark);
    Dispatcher.dispatch({
      actionType: ActionConstants.CREATE_BOOKMARK,
      courseId: courseId,
      lectureId: lectureId,
      bookmark: bookmark
    });
  },

  saveBookmark: function(courseId, lectureId, bookmarkId, content, time) {
    var bookmark = API.edit_bookmark(courseId, lectureId, bookmarkId, content, time);
    log('SAVE_BOOKMARK', 'updated bookmark', bookmark);
    Dispatcher.dispatch({
      actionType: ActionConstants.UPDATE_BOOKMARK,
      courseId: courseId,
      lectureId: lectureId,
      bookmark: bookmark
    });
  },

  deleteBookmark: function(courseId, lectureId, bookmarkId) {
    API.delete_bookmark(courseId, lectureId, bookmarkId);
    log('DELETE_BOOKMARK', 'deleted (no data)', null);
    Dispatcher.dispatch({
      actionType: ActionConstants.DELETE_BOOKMARK,
      courseId: courseId,
      lectureId: lectureId,
      bookmarkId: bookmarkId
    });
  },

  requestBookmarks: function(courseId, lectureId) {
    var bookmarks = API.lecture_bookmarks(courseId, lectureId);
    log('REQUEST_BOOKMARKS', 'bookmarks', bookmarks);
    Dispatcher.dispatch({
      actionType: ActionConstants.REQUEST_COMMENTS,
      courseId: courseId,
      lectureId: lectureId,
      bookmarks: bookmarks
    });
  }
}

module.exports = BookmarkActionCreator;
