var React                 = require('react');
var CourseActionCreator   = require('../../actions/CourseActionCreator');
var moment                = require('moment');

var Course = React.createClass({

  displayName: 'Course',

  propTypes: {
    course:      React.PropTypes.shape({
      id:                   React.PropTypes.number.isRequired,
      department:           React.PropTypes.string.isRequired,
      department_shorthand: React.PropTypes.string.isRequired,
      course_name:          React.PropTypes.string.isRequired,
      course_number:        React.PropTypes.string.isRequired,
      description:          React.PropTypes.string.isRequired,
      section:              React.PropTypes.string.isRequired,
      term:                 React.PropTypes.string.isRequired,
      year:                 React.PropTypes.number.isRequired,
      instructor_id:        React.PropTypes.string.isRequired
    }).isRequired
  },

  /*============================== @HANDLING ==============================*/

  handleCourseClick: function() {
    // TODO : LINK to this Course's Context (ROUTER)
  },

  /*============================== @FORMATTING ==============================*/

  getFormattedIdentifier: function() {
    return  this.props.course.department_shorthand + '-' +
            this.props.course.course_number + ' Section ' +
            this.props.course.section;
  },

  getFormattedSemester: function() {
    return  this.props.course.term + ' ' +
            this.props.course.year;
  },

  /*============================== @RENDERING ==============================*/

  render: function() {
    return (
      <div className='course' onClick={this.handleCourseClick}>
        <h3 className='course__identifier'>{this.getFormattedIdentifier()}</h3>
        <h3 className='course__semester'>{this.getFormattedSemester()}</h3>
        <h2 className='course__name'>{this.props.course.course_name}</h2>
        <p className='course__description'>{this.props.course.description}</p>
      </div>
    );
  }
});

module.exports = Course;
