var React                 = require('react');
var LectureContextSidebar = require('./LectureContextSidebar');
var MediaPlayer           = require('../media/MediaPlayer');
var CreateStoreMixin      = require('../../mixins/CreateStoreMixin');
var MediaStore            = require('../../stores/MediaStore');
var LectureActionCreator  = require('../../actions/LectureActionCreator');

var LectureContext = React.createClass({

  // TODO : Refactor into multiple modules.

  propTypes: {
    course_id:  React.PropTypes.number.isRequired,
    lecture_id: React.PropTypes.number.isRequired
    // lecture:    React.PropTypes.object.isRequired TODO : Should have the selected lecture...
  },

  // TODO : Remove after handling props via Routing
  getDefaultProps: function() {
    return {
      course_id: 1,
      lecture_id: 1
    };
  },

  mixins: [CreateStoreMixin([MediaStore])],

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
    var media = MediaStore.getMedia(props.course_id, props.lecture_id);
    return { media: media };
  },

  contextDidChange: function(props) {
    LectureActionCreator.requestMedia(props.course_id, props.lecture_id);
  },

  /*============================== @HANDLING ==============================*/

  // TODO : Two siblings--media player and sidebar.  When a user needs to create
  // or reply to a comment, or create a bookmark, they need to know the current time
  // in the lecture. Pass a callback to the media player and update the time in the
  // sidebar on each tick.

  /*============================== @RENDERING ==============================*/

  render: function() {

    // TODO : Pass any necessary callbacks or data to children.
    if(this.state.media) {
      return (
        <div className='lecture-context'>
          <MediaPlayer media={this.state.media}/>
          <LectureContextSidebar {...this.props}/>
        </div>
      );
    } else {
      return (
        <div className='lecture-context'>
          <LectureContextSidebar {...this.props}/>
        </div>
      );
    }
  }

});

module.exports = LectureContext;
