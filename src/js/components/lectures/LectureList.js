var React                 = require('react');
var Lecture               = require('./Lecture');
var CreateStoreMixin      = require('../../mixins/CreateStoreMixin');
var LectureStore          = require('../../stores/LectureStore');
var LectureActionCreator  = require('../../actions/LectureActionCreator');

var LectureList = React.createClass({

  displayName: 'LectureList',

  propTypes: {
    course_id: React.PropTypes.number.isRequired
  },

  mixins: [CreateStoreMixin([LectureStore])],

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

  render: function() {

    var lectures = this.state.lectures.map(function(lecture, i) {
      return (
        <li key={i}>
          <Lecture lecture={lecture}/>
        </li>
      )
    });

    return (
      <div className='lecture-list'>
        <h1>Lectures</h1>
        <ul>
          {lectures}
        </ul>
      </div>
    );
  }
});

module.exports = LectureList;
