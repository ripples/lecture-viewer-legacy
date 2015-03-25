var React                = require('react');
var Course               = require('./Course');
var CreateStoreMixin     = require('../../mixins/CreateStoreMixin');
var CourseStore          = require('../../stores/CourseStore');
var CourseActionCreator  = require('../../actions/CourseActionCreator');

var CourseList = React.createClass({

  displayName: 'CourseList',

  mixins: [CreateStoreMixin([CourseStore])],

  /*============================== @LIFECYCLE ==============================*/

  componentDidMount: function() {
    this.contextDidChange(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState(this.getStateFromStores(nextProps));
    this.contextDidChange(nextProps);
  },

  getStateFromStores: function(props) {
    var courses = CourseStore.getCourses();
    return { courses: courses };
  },

  contextDidChange: function(props) {
    CourseActionCreator.requestCourses();
  },

  /*============================== @RENDERING ==============================*/

  render: function() {

    var courses = this.state.courses.map(function(course, i) {
      return (
        <li key={i}>
          <Course course={course}/>
        </li>
      )
    });

    return (
      <div className='course-list'>
        <ul>
          {courses}
        </ul>
      </div>
    );
  }
});

module.exports = CourseList;
