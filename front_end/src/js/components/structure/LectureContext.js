var React                 = require('react');
var LectureContextSidebar = require('./LectureContextSidebar');

var LectureContext = React.createClass({

  // TODO : Refactor into multiple modules.

  propTypes: {
    course_id:  React.PropTypes.number.isRequired,
    lecture_id: React.PropTypes.number.isRequired,
    lecture:    React.PropTypes.object.isRequired
  },

  propTypes: {
    video: React.PropTypes.shape({
      supportedFormats: React.PropTypes.array,
      baseURL: React.PropTypes.string
    }),
    currentTime: React.PropTypes.number,
    whiteboard_images: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        time: React.PropTypes.number,
        url: React.PropTypes.string
      })
    ),
    screen_images: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        time: React.PropTypes.number,
        url: React.PropTypes.string
      })
    )
  },

  /*============================== @LIFECYCLE ==============================*/

  componentDidMount: function() {
    this.contextDidChange(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState(this.getStateFromStores(nextProps));
    this.contextDidChange(nextProps);
  },

  getStateFromStores: function(props) {
    var lectureMedia = LectureStore.getLectureMedia(props.course_id, props.lecture_id);
    return { lectureMedia: lectureMedia };
  },

  contextDidChange: function(props) {
    LectureActionCreator.requestLectureMedia(props.course_id, props.lecture_id);
  },

  /*============================== @HANDLING ==============================*/

  handlePlaybackToggle: function() {
    this.setState({paused: !this.state.paused});
    var video = React.findDOMNode(this.refs.video);
    this.state.paused ? video.pause() : video.play();
  },
  handleMuteToggle: function() {
    this.setState({muted: !this.state.muted});
    var video = React.findDOMNode(this.refs.video);
    video.muted = this.state.muted;
  },
  handleVolumeChange: function(level) {
    this.setState({volume: level});
    var video = React.findDOMNode(this.refs.video);
    video.volume = level;
  },
  handleTimeChange: function(time) {
    this.setState({currentTime: time});
    var video = React.findDOMNode(this.refs.video);
    video.currentTime = time;
  },

  /*============================== @RETRIEVING ==============================*/

  // TODO : Refactor into a getSyncedImage function.
  // TODO : Load images into the cache using a buffer based on currentTime
  // Maybe just a few, since images will not need to update frequently

  getCurrentWhiteboardImage: function() {
    if(this.state.shouldRefreshWhiteboardIndices) {
      var index = this.binaryIndexOf.call(this.props.whiteboard_images, this.state.currentTime, this.comparator);
      this.cacheWhiteboardImage(index);
      this.state.shouldRefreshWhiteboardIndices = false;
      this.state.currentWhiteboardIndex = index;
    } else {
      var index = this.state.currentWhiteboardIndex;
      if(index < this.props.whiteboard_images.length-1 &&
        this.state.currentTime > this.props.whiteboard_images[index].end) {
          this.state.currentWhiteboardIndex++;
          this.cacheWhiteboardImage(index);
      }
    }
    return this.state.images.whiteboard[this.state.currentWhiteboardIndex];
  },

  getCurrentScreenImage: function() {
    // TODO : Follow Whiteboard implementation.
  },

  /*============================== @HELPING ==============================*/

  // Preload image if it does not exist
  cacheWhiteboardImage: function(index) {
    if(!this.state.images.whiteboard[index]) {
      var image = new Image();
      image.src = this.props.whiteboard_images[index].url;
      this.state.images.whiteboard[index] = image;
    }
  },

  // TODO : Could refactor. This is specific to the image objects
  comparator: function(element, valueToCompare) {
    if(element.start < valueToCompare) {
      if(element.end > valueToCompare) {
        return 0; // EQUAL TO VALUE
      }
      return -1;  // LESS THAN VALUE
    }
    return 1;     // GREATER THAN VALUE
  },

  binaryIndexOf: function(value, comparator) {
    var minIndex = 0;
    var maxIndex = this.length - 1;
    var currentIndex;
    var currentElement;
    while (minIndex <= maxIndex) {
      currentIndex = (minIndex + maxIndex) / 2 | 0;
      currentElement = this[currentIndex];
      if(compare(currentElement, value) < 0) {
        minIndex = currentIndex + 1;
      } else if(compare(currentElement, value) > 0) {
        minIndex = currentIndex - 1;
      } else {
        return currentIndex;
      }
    }
    return -1;
  },

  /*============================== @RENDERING ==============================*/

  render: function() {

    var controllerEventHandlers = {
      onTogglePlayback: this.handlePlaybackToggle,
      onToggleMute:     this.handleMuteToggle,
      onVolumeChange:   this.handleVolumeChange,
      onTimeChange:     this.handleTimeChange
    }

    return (
      <div className='lecture-context'>
        <div className='lecture-context-content'>
          {/*this.renderVideo()*/}
          {/*this.renderWhiteboards()*/}
          {/*this.renderScreen()*/}
          {/*<MediaController {controllerEventHandlers}/>*/}
          <div className='lecture-context-content--details'>
            {'LECTURE DETAILS HERE'}
          </div>
        </div>
        <LectureContextSidebar {...this.props}/>
      </div>
    );
  },

  renderVideo: function() {
    var videoFormats = this.props.video.supportedFormats.map(function(format) {
      return <source src={this.props.video.baseURL + '.' + format}/>
    });
    return <video ref="video" width="100%" height="100%">{videoFormats}</video>;
  },

  renderWhiteboards: function() {
    return <img id='lecture-media--whiteboard-image' src={this.getCurrentWhiteboardImage()}/>
  },

  renderScreen: function() {
    return <img id='lecture-media--screen-image' src={this.getCurrentScreenImage()}/>;
  },

});

module.exports = LectureContext;
