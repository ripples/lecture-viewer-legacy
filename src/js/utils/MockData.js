var MOCK = require('faker');

var bookmarks = {};
var comments = {};
var courses = {
  1: {
    id: 1,
    department: "Computer Science",
    department_shorthand: "CS",
    course_name: "Web Scalability",
    course_number: "497s",
    description: "A \"class\" about web stuff",
    section: "01",
    term: "Spring",
    year: 2015,
    instructor_id : "23ffaaccdd2330002288",
  }
};
var lectures = {
  1 : {
    1: {
        id: 1,
        ordindal: 1,
        type: "Lecture",
        title: "Lecture 4: What is the Interwebs?",
        description: "This lecture is awesome and you don't want to miss it",
        time_posted: 1337622367267,
        time_length: 3026,
        thumbnail: "http://url.to/thumbnail/here.jpg"
    },
    2: {
        id: 2,
        ordindal: 2,
        type: "Lecture",
        title: "Lecture 5: Databases",
        description: "We will talk about how to store huge amounts of data",
        time_posted: 1337623117267,
        time_length: 2026,
        thumbnail: "http://url.to/thumbnail/here.jpg"
    }
  }
}

var COURSE_ID = 1;
var LECTURE_ID = 2;
var COMMENT_ID = 0;
var BOOKMARK_ID = 0;

var generateCourseId = function() {
  return ++COURSE_ID;
}

var generateLectureId = function() {
  return ++LECTURE_ID;
}

var generateCommentId = function() {
  return ++COMMENT_ID;
}

var generateBookmarkId = function() {
  return ++BOOKMARK_ID;
}

var generateCourse = function(course) {
  newCourse = course;
  newCourse[id] = generateCourseId();
  newCourse[instructor_id] = faker.random.number();
  return newCourse;
}

var generateLecture = function(lecture) {
  newLecture = lecture;
  lecture[id] = generateLectureId();
  return newLecture;
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

  /*============================== @COURSES ==============================*/

  getCourses: function() {
    return Object.keys(courses).map(function(key) {
      return courses[key];
    });
  },

  createCourse: function(tentativeCourse) {
    var course = generateCourse(tentativeCourse);
    courses[course.id] = course;
    return course;
  },

  /*============================== @LECTURES ==============================*/

  getLectures: function(course_id) {
    if(lectures[course_id]) {
      return Object.keys(lectures[course_id]).map(function(key) {
        return lectures[course_id][key];
      });
    } else {
      return [];
    }
  },

  createLecture: function(course_id, tentativeLecture) {
    var lecture = generateLecture(tentativeCourse);
    if(!lectures[course_id]) {
      lectures[course_id]={};
    }
    lectures[course_id][lecture.id] = lecture;
    return lecture;
  },

  /*============================== @COMMENTS ==============================*/

  getComments: function(courseId, lectureId) {

    if(comments[courseId] && comments[courseId][lectureId]) {
      return Object.keys(comments[courseId][lectureId]).map(function(key) {
        return comments[key];
      });
    } else {
      return [];
    }
  },

  createComment: function(courseId, lectureId, commentContent, isAnonymous) {
    var comment = generateComment(commentContent, isAnonymous);
    if(!comments[courseId]) {
      comments[courseId]={};
      comments[courseId][lectureId]={};
    }
    comments[courseId][lectureId][comment.id] = comment;
    return comment;
  },

  createReply: function(courseId, lectureId, comment, replyContent) {
    var reply = generateReply(replyContent);
    if(!comments[courseId][lectureId][comment.id].replies) {
      comments[courseId][lectureId][comment.id].replies = [];
    }
    comments[courseId][lectureId][comment.id].replies.push(reply);
    return comments[courseId][lectureId][comment.id];
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
