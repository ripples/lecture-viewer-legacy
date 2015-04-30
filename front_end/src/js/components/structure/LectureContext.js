var React                 = require('react');
var LectureContextSidebar = require('./LectureContextSidebar');
var MediaPlayer           = require('../media/MediaPlayer');
var CreateStoreMixin      = require('../../mixins/CreateStoreMixin');
var MediaStore            = require('../../stores/MediaStore');
var LectureActionCreator  = require('../../actions/LectureActionCreator');

var LectureContext = React.createClass({

  propTypes: {
    course_id:  React.PropTypes.number.isRequired,
    lecture_id: React.PropTypes.number.isRequired,
    time:       React.PropTypes.number,
    // lecture:    React.PropTypes.object.isRequired TODO : Should have the selected lecture...
  },

  mixins: [CreateStoreMixin([MediaStore])],

  /*============================== @LIFECYCLE ==============================*/

  componentDidMount: function() {
    this.contextDidChange(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    if(this.props != nextProps) {
      this.contextDidChange(nextProps);
      this.setState(this.getStateFromStores(nextProps));
    }
  },

  getStateFromStores: function(props) {
    var media = MediaStore.getMedia(props.course_id, props.lecture_id);
    return { media: media };
  },

  contextDidChange: function(props) {
    if((props.course_id != -1) && (props.lecture_id != -1)) {
      LectureActionCreator.requestMedia(props.course_id, props.lecture_id);
    }
  },

  /*============================== @HANDLING ==============================*/

  // TODO : Two siblings--media player and sidebar.  When a user needs to create
  // or reply to a comment, or create a bookmark, they need to know the current time
  // in the lecture. Pass a callback to the media player and update the time in the
  // sidebar on each tick.

  /*============================== @RENDERING ==============================*/

  render: function() {
    var content = (this.state.media) ?
                    this.renderContent() :
                    this.renderPlaceholder();
    return <div className='lecture-context'>{content}</div>;
  },

  renderContent: function() {
    return (
      <div>
        <div className='lecture-context-content'>
          {/*TODO : Render the lecture information*/}
          <MediaPlayer media={this.state.media} time={this.props.time}/>
        </div>
        <LectureContextSidebar
          course_id={this.props.course_id}
          lecture_id={this.props.lecture_id}/>
      </div>
    );
  },

  renderPlaceholder: function() {
    return <div>Placeholder</div>
  }

});

module.exports = LectureContext;
