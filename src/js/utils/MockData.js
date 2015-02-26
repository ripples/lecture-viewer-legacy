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
  }

}
