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
    description: "Learn about making some super cool scalable solutions.",
    section: "01",
    term: "Spring",
    year: 2015,
    instructor_id : "Tim Richards",
  },
  2: {
    id: 2,
    department: "Computer Science",
    department_shorthand: "CS",
    course_name: "Web Programming",
    course_number: "326",
    description: "Work with Javascript and HTML to make some dope ass projects!",
    section: "01",
    term: "Spring",
    year: 2015,
    instructor_id : "Tim Richards",
  }
};
var lectures = {
  1 : {
    1: {
        information: {
          id: 1,
          ordindal: 1,
          type: "Lecture",
          title: "General Relativity and the Theory of Everything",
          description: "We take a look at why love can transcend time and space, or some other baloney that they made Anne Hathaway say in Interstellar.",
          time_posted: 1337622367267,
          time_length: 3026,
          thumbnail: "http://url.to/thumbnail/here.jpg"
        },
        media: {
          video: {
            base_url: "http://www.quirksmode.org/html5/videos/big_buck_bunny",
            formats: ["mp4", "webm"],
            duration: 60
          },
          screen: [
            {
              url: "https://scontent-iad.xx.fbcdn.net/hphotos-xta1/v/t1.0-9/11150410_943285072372143_9220849240201776569_n.jpg?oh=5374097ca9ce7ce5d8eed02cd8c8a57b&oe=55A63DEE",
              start: 0,
              end: 4
            },
            {
              url: "https://scontent-iad.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10653643_941128312587819_6618157849953172249_n.jpg?oh=2cfcbb81b5851b737e6bb52aca277b67&oe=55D6257A",
              start: 4,
              end: 7
            },
            {
              url: "https://scontent-iad.xx.fbcdn.net/hphotos-xat1/v/t1.0-9/11150407_939986632701987_4326895521829241253_n.jpg?oh=0270d3729ec5623ed5f25568649622db&oe=55A1BA70",
              start: 7,
              end: 8
            },
            {
              url: "https://scontent-iad.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/11070752_935634323137218_5062687498452874427_n.jpg?oh=89c028dcdc4b901b77b72f191df73b45&oe=55A704BE",
              start: 8,
              end: 15
            }
          ],
          whiteboard: [
            {
              url: "https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xfp1/v/t1.0-9/11071125_930846836949300_5582287845287168253_n.jpg?oh=de46e81ba35292354541294618fb997a&oe=55D194E6&__gda__=1440004207_485dce7d75b4d263e747f71d488b8688",
              start: 0,
              end: 2
            },
            {
              url: "https://scontent-iad.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/11002627_916105365090114_6599599830018967340_n.jpg?oh=d1877e95a2a4c9c1cae4c37a836ab57e&oe=55DDCB2C",
              start: 2,
              end: 9
            },
            {
              url: "https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xpa1/v/t1.0-9/10968358_908167752550542_7700181038088746539_n.jpg?oh=bbb78b57fe17147d5632b77391af5e1e&oe=55D7AB60&__gda__=1440533464_36284a17e9a4ade70f16c2767ae9cae4",
              start: 9,
              end: 13
            },
            {
              url: "https://scontent-iad.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/10978699_906387589395225_5341510052769738691_n.jpg?oh=56908eaee1b9f43703e6064fe6affea7&oe=55D30E14",
              start: 13,
              end: 15
            },
          ]
        }
    },
    2: {
        information: {
          id: 2,
          ordindal: 2,
          type: "Lecture",
          title: "Physical Lilypads and Lily Evans",
          description: "Harry Potter was a fine lad. Today we take a look at his mother's history, and Aunt Petunia's secret.",
          time_posted: 1337623117267,
          time_length: 2033,
          thumbnail: "http://url.to/thumbnail/here.jpg"
        }
    },
    3: {
        information: {
          id: 3,
          ordindal: 3,
          type: "Lecture",
          title: "Boring People and the Sun",
          description: "We discuss ways in which we could send boring people into the sun, because hey, why not?",
          time_posted: 1337623117267,
          time_length: 4145,
          thumbnail: "http://url.to/thumbnail/here.jpg"
        }
    },
    4: {
        information: {
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
        return lectures[course_id][key].information;
      });
    } else {
      return [];
    }
  },

  getLecture: function(course_id, lecture_id) {
    if(lectures[course_id]) {
      if(lectures[course_id][lecture_id]) {
        return lectures[course_id][lecture_id].information;
      }
    }
    return null;
  },

  getLectureMedia: function(course_id, lecture_id) {
    if(lectures[course_id]) {
      if(lectures[course_id][lecture_id]) {
        return lectures[course_id][lecture_id].media;
      }
    }
    return null;
  },

  createLecture: function(course_id, tentativeLecture) {
    var lecture = generateLecture(tentativeCourse);
    if(!lectures[course_id]) {
      lectures[course_id]={};
    }
    lectures[course_id][lecture.id].information = lecture;
    return lecture;
  },

  saveLecture: function(course_id, lecture_id, lecture) {
    if(!lectures[course_id]) {
      lectures[course_id]={};
    }
    lectures[course_id][lecture_id].information = lecture;
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
