var MOCK = require('faker');

var bookmarks = {};
var commentz = {};

var COMMENT_ID = 0;
var BOOKMARK_ID = 0;

var generateCommentId = function() {
  return ++COMMENT_ID;
}

var generateBookmarkId = function() {
  return ++BOOKMARK_ID;
}

var generateComment = function(commentContent, isAnonymous) {
  var firstName;
  var lastName;
  if(isAnonymous) {
    firstName = 'ANONYMOUS',
    lastName = 'ANONYMOUS'
  } else {
    firstName = MOCK.name.firstName();
    lastName = MOCK.name.lastName();
  }
  return {
    id: generateCommentId(),
    author: {
      id: MOCK.random.number(),
      first_name: firstName,
      last_name: lastName
    },
    date_posted: new Date(),
    content: commentContent,
    time: MOCK.random.number(),
    replies: []
  }
}

var generateReply = function(replyContent) {
  return {
    id: generateCommentId(),
    author: {
      id: MOCK.random.number(),
      first_name: MOCK.name.firstName(),
      last_name: MOCK.name.lastName()
    },
    date_posted: new Date(),
    content: replyContent
  }
}

module.exports = {

  /*============================== @COMMENTS ==============================*/

  getComments: function(courseId, lectureId) {

    if(commentz[courseId] && commentz[courseId][lectureId]) {
      return Object.keys(commentz[courseId][lectureId]).map(function(key) {
        return commentz[key];
      });
    } else {
      return [];
    }
  },

  createComment: function(courseId, lectureId, commentContent, isAnonymous) {
    var comment = generateComment(commentContent, isAnonymous);
    if(!commentz[courseId]) {
      commentz[courseId]={};
      commentz[courseId][lectureId]={};
    }
    commentz[courseId][lectureId][comment.id] = comment;
    return comment;
  },

  createReply: function(courseId, lectureId, comment, replyContent) {
    var reply = generateReply(replyContent);
    if(!commentz[courseId][lectureId][comment.id].replies) {
      commentz[courseId][lectureId][comment.id].replies = [];
    }
    commentz[courseId][lectureId][comment.id].replies.push(reply);
    return commentz[courseId][lectureId][comment.id];
  }

  /*============================== @BOOKMARKS ==============================*/

  // getBookmarks: function(courseID) {
  //   return this.bookmarks.filter(function(bookmark) {
  //     return bookmark.courseID === courseID;
  //   });
  // },
  //
  // updateBookmark: function(bookmarkBody, bookmarkId) {
  //   var bookmark;
  //   for (var i = 0; i < this.bookmarks.length; i++) {
  //     if (this.bookmarks[i]['id'] == commentId) {
  //       this.bookmarks[i]['label'] = bookmarkBody;
  //       bookmark = this.bookmarks[i];
  //       break;
  //     }
  //   }
  //   console.log("Returning Updated Bookmark: " + bookmark);
  //   return bookmark;
  // },
  //
  // createBookmark: function(bookmarkBody, lectureId) {
  //   var bookmark = {
  //     id: ++this.bookmarkNumber,
  //     label: bookmarkBody,
  //     time: 500000
  //   }
  //   this.bookmarks.push(bookmark);
  //   return bookmark;
  // },
  //
  // getBookmarksForLecture: function(lectureId) {
  //   // return this.comments.filter(function(comment) {
  //   //   return comment.lectureId === lectureId;
  //   // });
  //   return this.bookmarks;
  // }

}
