var Dispatcher      = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var createStore     = require('../utils/StoreUtils');
var log             = require('../utils/Logging').store('BOOKMARK');
/*============================== @PRIVATE ==============================*/

var bookmarks = {};

var addBookmark = function(courseId, lectureId, bookmark) {
  log('ADD_BOOKMARK', 'bookmark', bookmark);
  if(!bookmarks[courseId]) {
    bookmarks[courseId]={};
    bookmarks[courseId][lectureId]={};
  }
  bookmarks[courseId][lectureId][bookmark.id] = bookmark;
}

var saveBookmark = function(courseId, lectureId, updatedBookmark) {
  log('SAVE_BOOKMARK', 'updatedBookmark', updatedBookmark);
  bookmarks[courseId][lectureId][updatedBookmark.id] = updatedBookmark;
}

var deleteBookmark = function(courseId, lectureId, bookmarkId) {
  delete bookmarks[courseId][lectureId][bookmarkId];
}

var updateBookmarks = function(courseId, lectureId, bookmarks) {
  log('UPDATE_BOOKMARKS', 'bookmarks', bookmarks);
  for(var i=0; i<bookmarks.length; i++) {
    bookmarks[courseId][lectureId][bookmarks[i].id] = bookmarks[i];
  }
}

/*============================== @PUBLIC ==============================*/

var BookmarkStore = createStore({

  getBookmarks: function(courseId, lectureId) {
    if(bookmarks[courseId] && bookmarks[courseId][lectureId]) {
      return Object.keys(bookmarks[courseId][lectureId]).map(function(key) {
        return bookmarks[courseId][lectureId][key];
      });
    } else {
      return [];
    }
  }
});

/*============================== @DISPATCHING ==============================*/

BookmarkStore.dispatcher = Dispatcher.register(function(payload) {
  switch(payload.actionType){
    case ActionConstants.CREATE_BOOKMARK:
      addBookmark(payload.courseId, payload.lectureId, payload.bookmark);
      break;
    case ActionConstants.REQUEST_BOOKMARKS:
      updateBookmarks(payload.courseId, payload.lectureId, payload.bookmarks);
      break;
    case ActionConstants.UPDATE_BOOKMARK:
      saveBookmark(payload.courseId, payload.lectureId, payload.bookmark);
      break;
    case ActionConstants.DELETE_BOOKMARK:
      deleteBookmark(payload.courseId, payload.lectureId, payload.bookmarkId);
      break;
    defaut:
      break;
  }
  BookmarkStore.emitChange();
  return true;
});

module.exports = BookmarkStore;
