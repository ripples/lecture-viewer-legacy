module.exports = {

  bookmarks: [
    {
      id: 1,
      label: 'Viterbi Part 1',
      courseID: 1,
      lectureID: 5,
      timestamp: '4:06'
    },
    {
      id: 2,
      label: 'Viterbi Part 2',
      courseID: 1,
      lectureID: 5,
      timestamp: '38:44'
    },
    {
      id: 3,
      label: 'LCS String',
      courseID: 1,
      lectureID: 2,
      timestamp: '13:32'
    },
  ],

  details: [
    {
      courseID: 1,
      title: 'Introduction to Computer Science',
      semester: 'Spring 2015',
      description: 'CMPSCI 121 provides an introduction in problem solving and computer programming using the programming language Java. It teaches how real-world problems can be solved computationally using the programming constructs and data abstractions of a modern programming language. Concepts and techniques covered include data types, expressions, objects, methods, top-down program design, program testing and debugging, state representation, interactive programs, data abstraction, conditionals, iteration, interfaces, inheritance, lists and arrays. No previous programming experience required.'
    },
    {
      courseID: 2,
      title: 'Artificial Intelligence',
      semester: 'Spring 2015',
      description: 'This course explores key concepts of artificial intelligence, including state-space and heuristic search techniques, game playing, knowledge representation, automated planning, reasoning under uncertainty, decision theory and machine learning. We will examine how these concepts are applied in the context of several applications.'
    },
    {
      courseID: 3,
      title: 'Web Programming',
      semester: 'Spring 2015',
      description: 'This course will also study concepts and technologies including AJAX, social networking, mashups, JavaScript libraries (e.g., jQuery), and web security. This course is hands-on and project-based; students will construct a substantial dynamic web application based on the concepts, technologies, and techniques presented during lecture. This course satisfies the IE Requirement. '
    }
  ],

  lectures: [
    {
      id: 1,
      courseID: 1,
      category: 'lecture',
      ordinal: 1,
      title: 'Working with Javascript and the DOM',
      dateReleased: Date(),
      duration: '55:37'
    },
    {
      id: 2,
      courseID: 1,
      category: 'lecture',
      ordinal: 2,
      title: 'Event Handlers and Interacting with Elements',
      dateReleased: Date(),
      duration: '50:40'
    },
    {
      id: 3,
      courseID: 1,
      category: 'tutorial',
      ordinal: 1,
      title: 'A Quick Overview of ReactJS',
      dateReleased: Date(),
      duration: '6:22'
    },
    {
      id: 4,
      courseID: 1,
      category: 'lecture',
      ordinal: 3,
      title: 'About CSS and Styling',
      dateReleased: Date(),
      duration: '46:09'
    }
  ],

  notifications: [
    {
      id: 1,
      courseID: 1,
      lectureID: 1,
      by: 'huderon@massasoit.edu',
      for: 'bread@umass.edu',
      parentCommentID: '1337',
      date: Date(),
      data: 'Yea, we should totally go pwn some Alliance n00bz after this lecture.  I\'ll see if Alan is online.'
    },
    {
      id: 2,
      courseID: 1,
      lectureID: 1,
      by: 'huderon@massasoit.edu',
      for: 'bread@umass.edu',
      parentCommentID: '1337',
      date: Date(),
      data: 'Also, I need help with that part where she talks about all of Scala. lol...'
    }
  ],

  getBookmarksForCourse: function(courseID) {
    return this.bookmarks.filter(function(bookmark) {
      return bookmark.courseID === courseID;
    });
  },

  getDetailsForCourse: function(courseID) {
    return this.details.filter(function(detail) {
      return detail.courseID === courseID;
    });
  },

  getLecturesForCourse: function(courseID) {

    var lectures = this.lectures.filter(function(lecture) {
      return lecture.courseID === courseID;
    });

    lectures.sort(function(a, b) {
      return a.date - b.date;
    });

    return lectures;
  },

  getNotificationsForCourse: function(courseID) {
    var notes = this.notifications.filter(function(notification) {
      return notification.courseID === courseID;
    });
    var response = {};
    for(var i=0; i<notes.length; i++) {
      n = notes[i];
      if(!response[n.lectureID]) {
        response[n.lectureID] = [];
      }
      response[n.lectureID].push(n);
    }
    return response;
  },


  // COMMENT MOCK DATA

  comments: [
    // {
    //   id: 1,
    //   author: {id: 1, firstName: 'Brandon', lastName: 'Read'},
    //   date: new Date(),
    //   body: 'This is the first comment for a lecture.  I hope you will reply and further explore the commenting system :)  Thanks! And good luck.',
    //   timestamp: 478,
    //   replies: [
    //     {
    //       id: 1,
    //       author: {id: 2, firstName: 'Michael', lastName: 'Scott'},
    //       date: new Date(),
    //       body: 'This is a reply!  What do you think--how does it look?  Maybe a having a few more replies will make this UI look more realistic. Just sayin\'...'
    //     }
    //   ]
    // },
    // {
    //   id: 2,
    //   author: {id: 2, firstName: 'Michael', lastName: 'Scott'},
    //   date: new Date(),
    //   body: 'Here, have another comment.  The more, the merrier. Right?',
    //   timestamp: 854,
    //   replies: []
    // }
  ],

  replyNumber: 1,
  commentNumber: 1,
  bookmarkNumber: 1,

  createReply: function(replyBody, commentId) {
    var reply = {
      id: ++this.replyNumber,
      author: {id: 3, firstName: 'Random', lastName: 'Person'},
      date: new Date(),
      body: replyBody
    }
    console.log('Created Reply: ' + reply);
    for (var i = 0; i < this.comments.length; i++) {
      if (this.comments[i]['id'] == commentId) {
        this.comments[i]['replies'].push(reply);
        break;
      }
    }
    console.log("Returning Reply: " + reply);
    return reply;
  },

  createComment: function(commentBody, lectureId, isAnonymous) {
    var comment = {
      id: ++this.commentNumber,
      author: {id: 4, firstName: 'Comment', lastName: 'Noob'},
      date: new Date(),
      body: commentBody,
      timestamp: 999,
      replies: []
    }
    this.comments.push(comment);
    return comment;
  },

  getCommentsForLecture: function(lectureId) {
    // return this.comments.filter(function(comment) {
    //   return comment.lectureId === lectureId;
    // });
    return this.comments;
  },


  // BOOKMARK MOCK DATA

  bookmarks: [],

  updateBookmark: function(bookmarkBody, bookmarkId) {
    var bookmark;
    for (var i = 0; i < this.bookmarks.length; i++) {
      if (this.bookmarks[i]['id'] == commentId) {
        this.bookmarks[i]['label'] = bookmarkBody;
        bookmark = this.bookmarks[i];
        break;
      }
    }
    console.log("Returning Updated Bookmark: " + bookmark);
    return bookmark;
  },

  createBookmark: function(bookmarkBody, lectureId) {
    var bookmark = {
      id: ++this.bookmarkNumber,
      label: bookmarkBody,
      time: 500000
    }
    this.bookmarks.push(bookmark);
    return bookmark;
  },

  getBookmarksForLecture: function(lectureId) {
    // return this.comments.filter(function(comment) {
    //   return comment.lectureId === lectureId;
    // });
    return this.bookmarks;
  }



}
