var React                 = require('react');
var Router                = require('react-router');
var Lecture               = require('./Lecture');
var CreateStoreMixin      = require('../../mixins/CreateStoreMixin');
var LectureStore          = require('../../stores/LectureStore');
var LectureActionCreator  = require('../../actions/LectureActionCreator');

var ManageLecture = React.createClass({

  displayName : 'ManageLecture',

  propTypes : {
    course_id:  React.PropTypes.number.isRequired,
    lecture_id: React.PropTypes.number.isRequired
  },

  mixins : [CreateStoreMixin([LectureStore])],

  getDefaultProps : function() {
    return {
      course_id: 1,
      lecture_id: 1
    };
  },

  /*============================== @LIFECYCLE ==============================*/

  componentDidMount : function() {
    this.contextDidChange(this.props);
  },

  componentWillReceiveProps : function(nextProps) {
    this.setState(this.getStateFromStores(nextProps));
    this.contextDidChange(nextProps);
  },

  getStateFromStores : function(props) {
    var lecture = LectureStore.getLecture(props.course_id, props.lecture_id);
    if(!lecture || lecture == null) {
      lecture = {
        id:           null,
        ordinal:      null,
        title:        null,
        description:  null
      }
    }
    return { lecture: lecture };
  },

  contextDidChange : function(props) {
    LectureActionCreator.requestLecture(props.course_id, props.lecture_id);
  },

  /*============================== @HANDLING ===============================*/

  handleTitleChange : function(e) {
    e.preventDefault();
    var lecture = this.state.lecture;
    lecture.title = e.target.value;
    this.setState({lecture: lecture});
  },

  handleDescriptionChange : function(e) {
    e.preventDefault();
    var lecture = this.state.lecture;
    lecture.description = e.target.value;
    this.setState({lecture: lecture});
  },

  handleSave : function(e) {
    e.preventDefault();
    LectureActionCreator.saveLecture(this.props.course_id, this.props.lecture_id, this.state.lecture);
    // TODO : Unmount component? Close modal? This will prbably be handled by the parent component.
    // Or you will likely transitionTo a new route.
  },

  /*============================== @RENDERING ==============================*/

  render : function() {
    return (
      <div className="manage-lecture">
        <h1>Manage Lecture {this.state.lecture.ordinal}</h1>
        Lecture {this.state.lecture.id} <br/>
        Title: <input type="text" name="lecture-title" value={this.state.lecture.title} onChange={this.handleTitleChange}/> <br/>
        Description: <textarea type="text" name="lecture-description" value={this.state.lecture.description} onChange={this.handleDescriptionChange}/> <br/>
        <button onClick={this.handleSave}>Save Changes</button>
      </div>
    );
  }
});

module.exports = ManageLecture;
