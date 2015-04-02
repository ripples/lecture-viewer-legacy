var React                 = require('react');
var Router                = require('react-router');
var Lecture               = require('./Lecture');
var CreateStoreMixin      = require('../../mixins/CreateStoreMixin');
var LectureStore          = require('../../stores/LectureStore');
var LectureActionCreator  = require('../../actions/LectureActionCreator');

var ManageLecture = React.createClass({

  displayName : 'ManageLecture',

  propTypes: {
    course_id:  React.PropTypes.number.isRequired
  },

  mixins : [CreateStoreMixin([LectureStore])],
  
  getInitialState : function() {
    return {
      isEditingInfo: false
    };
  },
  
  /*============================== @LIFECYCLE ==============================*/
  
  componentWillMount : function(){
    this.props.course_id = 1;
  },
  
  componentDidMount : function() {
    this.contextDidChange(this.props);
  },

  componentWillReceiveProps : function(nextProps) {
    this.setState(this.getStateFromStores(nextProps));
    this.contextDidChange(nextProps);
  },

  getStateFromStores : function(props) {
    var lectures = LectureStore.getLectures(props.course_id);
    return { lectures: lectures };
  },

  contextDidChange : function(props) {
    LectureActionCreator.requestLectures(props.course_id);
  },
  
  /*============================== @HANDLING ===============================*/
  
  handleEditInformationClick: function(data) {
    this.setState({isEditingInfo: true});
  },
  
  handleSaveInformationClick: function(data) {
    this.setState({isEditingInfo: false});
  },
  
  /*============================== @RENDERING ==============================*/
  
  render : function() {
    
    if (this.state.isEditingInfo) {
      var editButton = <button onClick={this.handleSaveInformationClick}> Save Changes </button>;
      var lectures = this.state.lectures.map(function(lecture, i) {
        return (
          <li key={i}>
            Lecture {lecture.id} <br/>
            Title: <br/> <input type="text" name="lecture-title" placeholder={lecture.title} /> <br/>
            Description: <br/> <textarea type="text" name="lecture-description" placeholder={lecture.description} /> <br/>
          </li>
        )
      });
    } else {
      var editButton = <button onClick={this.handleEditInformationClick}> Edit Lectures </button>;
      var lectures = this.state.lectures.map(function(lecture, i) {
        return (
          <li key={i}>
            <Lecture lecture={lecture}/> <br/>
          </li>
        )
      });
    }
    
    return (
      <div className="manage-lecture">
        <h1>Manage Lectures</h1>
        <ul>
          {lectures}
        </ul>
        {editButton}
      </div>
    );
  }
});

module.exports = ManageLecture;
