var React                 = require('react');
var Lecture               = require('./Lecture');
var CreateStoreMixin      = require('../../mixins/CreateStoreMixin');
var LectureStore          = require('../../stores/LectureStore');
var LectureActionCreator  = require('../../actions/LectureActionCreator');

var ManageLecture = React.createClass({

  displayName : 'ManageLecture',

  propTypes: {
    lecture_id: React.PropTypes.number.isRequired,
    course_id:  React.PropTypes.number.isRequired
  },

  mixins : [CreateStoreMixin([LectureStore])],
  
  /*============================== @LIFECYCLE ==============================*/
  
  componentDidMount: function() {
    this.contextDidChange(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState(this.getStateFromStores(nextProps));
    this.contextDidChange(nextProps);
  },

  getStateFromStores: function(props) {
    var lectures = LectureStore.getLectures(props.course_id);
    return { lectures: lectures };
  },

  contextDidChange: function(props) {
    LectureActionCreator.requestLectures(props.course_id);
  },
  
  /*============================== @RENDERING ==============================*/

  render : function() {
    
    return (
      <div className="ManageLecture">
        Lecture: {this.props.lecture_id}
        {this.state.lecture}
      </div>
    );
  }
});

module.exports = ManageLecture;
