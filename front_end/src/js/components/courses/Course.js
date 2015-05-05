var React                 = require('react');
var CourseActionCreator   = require('../../actions/CourseActionCreator');
var moment                = require('moment');
var CourseEdit            = require('./CourseEdit');

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
    }).isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  /*============================== @FORMATTING ==============================*/

  getFormattedIdentifier: function() {
    return  this.props.course.department_shorthand + '-' +
            this.props.course.course_number
  },

  getFormattedSemester: function() {
    return  this.props.course.term + ' ' +
            this.props.course.year;
  },

  getFormattedSection: function() {
    return  'Section: ' + this.props.course.section;
  },

  getFormattedInstructor: function() {
    return  'Instructor: ' + this.props.course.instructor_id;
  },

  /*============================== @RENDERING ==============================*/

  render: function() {
    return (
      <div className='course' onClick={this.handleCourseClick}>
        <h3 className='course__identifier'>{this.getFormattedIdentifier()}</h3>
        <h3 className='course__semester'>{this.getFormattedSemester()}</h3>
        <h4 className='course__name' onClick={this.props.onClick}>{this.props.course.course_name}</h4>
        <p  className='course__description'>{this.props.course.description}</p>
        <h3 className='course__section'>{this.getFormattedSection()}</h3>
        <h3 className='course__instructor'>{this.getFormattedInstructor()}</h3>
        <CourseEdit course_id={this.props.course.id}/>
      </div>
    );
  }
});

module.exports = Course;
