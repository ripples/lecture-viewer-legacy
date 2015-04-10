var React                = require('react');
var Course               = require('./Course');
var CreateStoreMixin     = require('../../mixins/CreateStoreMixin');
var CourseStore          = require('../../stores/CourseStore');
var CourseActionCreator  = require('../../actions/CourseActionCreator');

var CourseList = React.createClass({

  displayName: 'CourseList',

  propTypes: {
    onSelectCourse: React.PropTypes.func,
  },

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

  /*============================== @HANDLING ==============================*/

  handleCourseClick: function(course) {
    this.props.onSelectCourse(course);
  },

  /*============================== @RENDERING ==============================*/

  render: function() {

    var courses = this.state.courses.map(function(course, i) {
      return (
        <li key={i} onClick={this.handleCourseClick.bind(this, course)}>
          <Course course={course}/>
        </li>
      )
    }, this);

    return (
      <div className='course-list'>
        <span>Courses</span>
        <ul>
          {courses}
        </ul>
      </div>
    );
  }
});

module.exports = CourseList;
