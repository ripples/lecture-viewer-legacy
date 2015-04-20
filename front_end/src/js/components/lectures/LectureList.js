var React                 = require('react');
var Lecture               = require('./Lecture');
var CreateStoreMixin      = require('../../mixins/CreateStoreMixin');
var LectureStore          = require('../../stores/LectureStore');
var LectureActionCreator  = require('../../actions/LectureActionCreator');
var ScrollContentWrapper  = require('../helpers/ScrollContentWrapper');

var LectureList = React.createClass({

  displayName: 'LectureList',

  propTypes: {
    course: React.PropTypes.object.isRequired,
    onBack: React.PropTypes.func.isRequired
  },

  mixins: [CreateStoreMixin([LectureStore])],

  /*============================== @LIFECYCLE ==============================*/

  componentDidMount: function() {
    this.contextDidChange(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    if(this.props != nextProps) {
      this.setState(this.getStateFromStores(nextProps));
    }
  },

  getStateFromStores: function(props) {
    var lectures = LectureStore.getLectures(props.course.id);
    return { lectures: lectures };
  },

  contextDidChange: function(props) {
    LectureActionCreator.requestLectures(props.course.id);
  },

  /*============================== @LIFECYCLE ==============================*/

  getFormattedIdentifier: function() {
    return  this.props.course.department_shorthand + '-' +
            this.props.course.course_number;
  },

  getFormattedSemester: function() {
    return  this.props.course.term + ' ' +
            this.props.course.year;
  },

  /*============================== @RENDERING ==============================*/

  render: function() {

    var lectures = this.state.lectures.map(function(lecture, i) {
      return (
        <li key={i}>
          <Lecture lecture={lecture}/>
        </li>
      )
    });

    return (
      <div className='lecture-list-container'>
        {this.renderCourseInfo()}
        <ScrollContentWrapper>
          <div className='lecture-list'>
            <ul>
              {lectures}
            </ul>
          </div>
        </ScrollContentWrapper>
      </div>
    );
  },

  renderCourseInfo: function() {
    return (
      <div className='course-information-heading' onClick={this.handleCourseClick}>
        <span className='back-to-courses' onClick={this.props.onBack}>Back to Courses...</span><br/>
        <h3 className='course__identifier'>{this.getFormattedIdentifier()}</h3>
        <h3 className='course__semester'>{this.getFormattedSemester()}</h3>
        <h1 className='course__name'>{this.props.course.course_name}</h1>
      </div>
    );
  }

});

module.exports = LectureList;
