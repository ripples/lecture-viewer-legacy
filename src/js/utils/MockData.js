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
  },
  2: {
    id: 2,
    department: "Computer Science",
    department_shorthand: "CS",
    course_name: "Web Programming",
    course_number: "326",
    description: "Intro to web stuff",
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
        title: "General Relativity and the Theory of Everything",
        description: "We take a look at why love can transcend time and space, or some other baloney that they made Anne Hathaway say in Interstellar.",
        time_posted: 1337622367267,
        time_length: 3026,
        thumbnail: "http://url.to/thumbnail/here.jpg"
    },
    2: {
        id: 2,
        ordindal: 2,
        type: "Lecture",
        title: "Physical Lilypads and Lily Evans",
        description: "Harry Potter was a fine lad. Today we take a look at his mother's history, and Aunt Petunia's secret.",
        time_posted: 1337623117267,
        time_length: 2033,
        thumbnail: "http://url.to/thumbnail/here.jpg"
    },
    3: {
        id: 3,
        ordindal: 3,
        type: "Lecture",
        title: "Boring People and the Sun",
        description: "We discuss ways in which we could send boring people into the sun, because hey, why not?",
        time_posted: 1337623117267,
        time_length: 4145,
        thumbnail: "http://url.to/thumbnail/here.jpg"
    },
    4: {
        id: 4,
        ordindal: 1,
        type: "Tutorial",
        title: "Learning Angular the Hard Way",
        description: "We take a look at one of the most disgusting frameworks available, and how you too can make shitty products.",
        time_posted: 1337623117267,
        time_length: 1000,
        thumbnail: "http://url.to/thumbnail/here.jpg"
    }
  }
}

var COURSE_ID = 1;
var LECTURE_ID = 4;
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
    time: 407,
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

var generateBookmark = function(content, time) {
  return {
    id: generateBookmarkId(),
    content: content,
    time: time
  }
}

var API = {

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

  getLecture: function(course_id, lecture_id) {
    if(lectures[course_id]) {
      if(lectures[course_id][lecture_id]) {
        return lectures[course_id][lecture_id];
      }
    }
    return null;
  },

  createLecture: function(course_id, tentativeLecture) {
    var lecture = generateLecture(tentativeCourse);
    if(!lectures[course_id]) {
      lectures[course_id]={};
    }
    lectures[course_id][lecture.id] = lecture;
    return lecture;
  },

  saveLecture: function(course_id, lecture_id, lecture) {
    if(!lectures[course_id]) {
      lectures[course_id]={};
    }
    lectures[course_id][lecture_id] = lecture;
    return lecture;
  },

  /*============================== @COMMENTS ==============================*/

  get_comments: function(courseId, lectureId) {

    if(comments[courseId] && comments[courseId][lectureId]) {
      return Object.keys(comments[courseId][lectureId]).map(function(key) {
        return comments[key];
      });
    } else {
      return [];
    }
  },

  post_comment: function(courseId, lectureId, commentContent, isAnonymous) {
    var comment = generateComment(commentContent, isAnonymous);
    if(!comments[courseId]) {
      comments[courseId]={};
      comments[courseId][lectureId]={};
    }
    comments[courseId][lectureId][comment.id] = comment;
    return comment;
  },

  reply_comment: function(courseId, lectureId, comment, replyContent) {
    var reply = generateReply(replyContent);
    if(!comments[courseId][lectureId][comment.id].replies) {
      comments[courseId][lectureId][comment.id].replies = [];
    }
    comments[courseId][lectureId][comment.id].replies.push(reply);
    return comments[courseId][lectureId][comment.id];
  },

  /*============================== @BOOKMARKS ==============================*/

  create_bookmark: function(courseId, lectureId, content, time) {
    var bookmark = generateBookmark(content, time);
    if(!bookmarks[courseId]) {
      bookmarks[courseId]={};
      bookmarks[courseId][lectureId]={};
    }
    bookmarks[courseId][lectureId][bookmark.id] = bookmark;
    return bookmark;
  },

  edit_bookmark: function(courseId, lectureId, bookmarkId, content, time) {
    var bookmark = generateBookmark(content, time);
    bookmark.id = bookmarkId;
    bookmarks[courseId][lectureId][bookmarkId] = bookmark;
    return bookmark;
  },

  delete_bookmark: function(courseId, lectureId, bookmarkId) {
    delete bookmarks[courseId][lectureId][bookmarkId];
  },

  lecture_bookmark: function(courseId, lectureId) {
    if(bookmarks[courseId] && bookmarks[courseId][lectureId]) {
      return Object.keys(bookmarks[courseId][lectureId]).map(function(key) {
        return bookmarks[key];
      });
    } else {
      return [];
    }
  }

}

module.exports = API;
