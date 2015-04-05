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
    var lectures = LectureStore.getLecture(props.course_id, props.lecture_id);
    return { lecture: lecture };
  },

  contextDidChange : function(props) {
    LectureActionCreator.requestLecture(props.course_id, props.lecture_id);
  },
  
  /*============================== @HANDLING ===============================*/
  
  handleTitleChange : function(e) {
    e.preventDefault();
    // TODO: figure out how to modify title of lecture in state
  },
  
  handleDescriptionChange : function(e) {
    e.preventDefault();
    // TODO: figure out how to modify description of lecture in state
  },
  
  handleSave : function(e) {
    e.preventDefault();
    // TODO: add save functionality
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
