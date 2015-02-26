var React = require('react');
var MOCK_API = require('../utils/MockData');

var CreateStoreMixin = require('../mixins/CreateStoreMixin')

// TODO : Implement Flux pattern.

// var CourseStore = require('../stores/CourseStore');
// var BookmarkStore = require('../stores/BookmarkStore');
// var LectureStore = require('../stores/LectureStore');
// var NotificationStore = require('../stores/NotificationStore');

var BookmarkList = require('../components/BookmarkList');
var CourseHeader = require('../components/CourseHeader');
var LectureList = require('../components/LectureList');

var CoursePage = React.createClass({

  mixins: [CreateStoreMixin([/*CourseStore, BookmarkStore, LectureStore, NotificationStore*/])],

  COURSE_ID: 1,

  // // Return the courseID based on the URL props.params
  // parseCourse: function(props) {
  //   props = props || this.props;
  //   return props.params.course;
  // },

  getStateFromStores: function(props) {
    // var courseID = this.parseCourse(props),
    //     details = CourseStore.getDetails(courseID),
    //     bookmarks = BookmarkStore.get(courseID),
    //     lectures = LectureStore.get(courseID);
    //     notifications = NotificationStore.get(courseID);
    //
    return {
      bookmarks: MOCK_API.getBookmarksForCourse(this.COURSE_ID),
      details: MOCK_API.getDetailsForCourse(this.COURSE_ID),
      lectures: MOCK_API.getLecturesForCourse(this.COURSE_ID),
      notifications: MOCK_API.getNotificationsForCourse(this.COURSE_ID)
    };
  },

  // // When the component is mounted, it should call an ActionCreator to get new data
  // componentDidMount: function() {
  //   this.courseDidChange();
  // },

  // // When the page transitions to a different course, call on the ActionCreator
  // componentWillReceiveProps: function(nextProps) {
  //   if (this.parseCourse(nextProps) !== this.parseCourse(this.props)) {
  //     this.setState(this.getStateFromStores(nextProps));
  //     this.courseDidChange(nextProps);
  //   }
  // },

  // // Messages the ActionCreator to start the data flow
  // courseDidChange: function(props) {
  //   var courseID = this.parseCourse(props);
  //
  //   CourseActionCreators.requestCourseDetails(courseID);
  //   LectureActionCreators.requestLectures(courseID);
  //   NotificationActionCreators.requestNotifications(courseID);
  //   BookmarkActionCreators.requestBookmarks(courseID);
  // },

  render: function() {
    return (
      <div>
        <BookmarkList bookmarks={this.state.bookmarks}/>
        <CourseHeader details={this.state.details}/>
        <LectureList lectures={this.state.lectures} notifications={this.state.notifications}/>
      </div>
    )
  }
});

module.exports = CoursePage;
