var React           = require('react');
var MediaController = require('./MediaController');

var MediaPlayer = React.createClass({

  propTypes: {
    media: React.PropTypes.object
  },

  /*============================== @LIFECYCLE ==============================*/

  getInitialState: function() {
    return {
      currentTime: 0.0,
      paused: true,
      muted: false,
      volume: 1.0,
      currentWhiteboardIndex: 0,
      currentScreenIndex: 0,
      shouldRefreshWhiteboardIndices: false,
      shouldRefreshScreenIndices: false,
    };
  },

  componentDidMount: function() {
    // TODO : Put this in a better spot... Perhaps create a video component
    var video = document.getElementById("video");
    video.ontimeupdate = this.handleTimeChange.bind(null, video);
    video.onended = function() {this.setState({paused: true, currentWhiteboardIndex: 0});}.bind(this);
  },

  /*============================== @CONTROLLER-HANDLING ==============================*/

  handlePlayToggle: function(shouldPlay) {
    var video = document.getElementById("video");
    shouldPlay ? video.play() : video.pause();
    this.setState({paused: video.paused});
  },

  handleMuteToggle: function(shouldMute) {
    var video = document.getElementById("video");
    video.muted = shouldMute;
    this.setState({muted: video.muted});
  },

  handleFullscreenToggle: function() {
    var video = document.getElementById("video");
    if(video.requestFullscreen) {
      video.requestFullscreen();
    } else if(video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if(video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
  },

  handleSeek: function(value) {
    var video = document.getElementById("video");
    var time = this.props.media.video.duration * (value / 100.0);
    video.currentTime = time;
    this.setState({currentTime: time, shouldRefreshWhiteboardIndices: true});
  },

  handleVolumeChange: function(value) {
    var video = document.getElementById("video");
    video.volume = value;
    this.setState({volume: value});
  },

  /*============================== @VIDEO-HANDLING ==============================*/

  handleTimeChange: function(time) {
    // TODO : Use time parameter
    var video = document.getElementById("video");
    this.setState({currentTime: video.currentTime});
  },

  /*============================== @IMAGE-SYNCHRONIZATION ==============================*/

  // TODO : Refactor into a getSyncedImage function.

  getCurrentWhiteboardImage: function() {
    var index;
    if(this.isPastFinalImage()) {

      index = this.props.media.whiteboard.length-1

    } else if(this.state.shouldRefreshWhiteboardIndices) {

      index = this.binaryIndexOf(this.props.media.whiteboard, this.state.currentTime, this.comparator);
      this.state.shouldRefreshWhiteboardIndices = false;
      this.cacheWhiteboardImage(index);
      this.state.currentWhiteboardIndex = index;

    } else {

      index = this.state.currentWhiteboardIndex;
      if(index < this.props.media.whiteboard.length-1 &&
        this.state.currentTime > this.props.media.whiteboard[index].end) {
          index = ++this.state.currentWhiteboardIndex;
          this.cacheWhiteboardImage(index);
      }
    }
    return this.props.media.whiteboard[index].url;
  },

  isPastFinalImage: function() {
    return this.state.currentTime > this.props.media.whiteboard[this.props.media.whiteboard.length-1].end;
  },

  getCurrentScreenImage: function() {
    // TODO : Follow Whiteboard implementation.
    return null;
  },

  /*============================== @IMAGE-BUFFERING ==============================*/

  bufferImages: function(startIndex, images, bufferSize) {
    if (!this.buffer) {
      this.buffer = [];
    }
    var buffer = this.buffer;
    for (var i = startIndex; i < images.length; i++) {
      var image = new Image();
      image.onload = function() {
        var index = buffer.indexOf(this);
        if (index !== -1) {
          buffer.splice(index, 1); // remove image from the array once it's loaded
        }
      }
      buffer.push(image);
      image.src = images[i].url;
    }
  },

  // Preload image if it does not exist
  cacheWhiteboardImage: function(index) {
    this.bufferImages(index, this.props.media.whiteboard, 1);
  },

  /*============================== @IMAGE-FINDING ==============================*/

  comparator: function(element, valueToCompare) {
    if(element.start < valueToCompare) {
      if(element.end > valueToCompare) {
        return 0; // EQUAL TO VALUE
      }
      return -1;  // LESS THAN VALUE
    }
    else if(element.start === valueToCompare) {
      return 0;   // EQUAL TO VALUE
    }
    return 1;     // GREATER THAN VALUE
  },

  binaryIndexOf: function(array, value, compare) {
    var minIndex = 0;
    var maxIndex = array.length - 1;
    var currentIndex;
    var currentElement;
    while (minIndex <= maxIndex) {
      currentIndex = Math.floor((minIndex + maxIndex) / 2);
      currentElement = array[currentIndex];
      if(compare(currentElement, value) < 0) {
        minIndex = currentIndex + 1;
      } else if(compare(currentElement, value) > 0) {
        maxIndex = currentIndex - 1;
      } else {
        return currentIndex;
      }
    }
    return -1;
  },

  /*============================== @RENDERING ==============================*/

  render: function() {
    return (
      <div className='media-player'>
          {this.renderVideo()}
          {this.renderWhiteboards()}
          {this.renderScreen()}
          {this.renderControler()}
      </div>
    );
  },

  renderVideo: function() {
    var videoFormats = this.props.media.video.formats.map(function(format, i) {
      return <source key={i} src={this.props.media.video.base_url + '.' + format}/>
    }.bind(this));
    return (
      <video id="video" className='lecture-media__video'>{videoFormats}</video>
    );
  },

  renderWhiteboards: function() {
    // TODO : Handle multiple whiteboards
    return <img className='lecture-media__whiteboard-image' src={this.getCurrentWhiteboardImage()}/>
  },

  renderScreen: function() {
    return <img className='lecture-media__screen-image' src={this.getCurrentScreenImage()}/>
  },

  renderControler: function() {
    return <MediaController

      duration={this.props.media.video.duration}
      currentTime={this.state.currentTime}
      paused={this.state.paused}
      muted={this.state.muted}
      volume={this.state.volume}

      onPlay={this.handlePlayToggle.bind(null, true)}
      onPause={this.handlePlayToggle.bind(null, false)}
      onMute={this.handleMuteToggle.bind(null, true)}
      onUnmute={this.handleMuteToggle.bind(null, false)}
      onFullscreen={this.handleFullscreenToggle}
      onSeek={this.handleSeek}
      onVolumeChange={this.handleVolumeChange}/>
  }

});

module.exports = MediaPlayer;
