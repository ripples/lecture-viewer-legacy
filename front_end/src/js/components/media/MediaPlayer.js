var React = require('react');

var MediaPlayer = React.createClass({

  propTypes: {
    media: React.PropTypes.object
  },

  /*============================== @LIFECYCLE ==============================*/

  getInitialState: function() {
    return {
      currentTime: 0.0,
      currentWhiteboardIndex: 0,
      currentScreenIndex: 0,
      paused: true,
      muted: false,
      shouldRefreshWhiteboardIndices: false,
      shouldRefreshScreenIndices: false,
      wasPausedBeforeSeeking: true
    };
  },

  componentDidMount: function() {

    // TODO : This should not use jQuery-like access and handlers. The components
    // should be broken down and invoke their callbacks passed as props.

    /** 1) Get references to all elements that need event-handlers **/
    var video             = document.getElementById("video");
    var playButton        = document.getElementById("play-pause");
    var muteButton        = document.getElementById("mute");
    var fullScreenButton  = document.getElementById("full-screen");
    var seekBar           = document.getElementById("seek-bar");
    var volumeBar         = document.getElementById("volume-bar");

    /** 2) Initialize default values **/
    seekBar.defaultValue = 0;
    volumeBar.defaultValue = 1;

    /** 3) Attach event-handlers **/
    playButton.onclick        = this.handlePlayToggle.bind(null, video);
    muteButton.onclick        = this.handleMuteToggle.bind(null, video);
    fullScreenButton.onclick  = this.handleFullscreenToggle.bind(null, video);
    video.ontimeupdate        = this.handleTimeChange.bind(null, video, seekBar);
    seekBar.oninput           = this.handleSeek.bind(null, video, seekBar);
    seekBar.onmousedown       = this.handleSeekBegin.bind(null, video);
    seekBar.onmouseup         = this.handleSeekEnd.bind(null, video);
    volumeBar.oninput         = this.handleVolumeChange.bind(null, video, volumeBar);
  },

  /*============================== @HANDLING ==============================*/


  handlePlayToggle: function(video) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    this.setState({paused: video.paused, wasPausedBeforeSeeking: !video.paused});
  },

  handleMuteToggle: function(video) {
    video.muted = !video.muted;
    this.setState({muted: video.muted});
  },

  handleFullscreenToggle: function(video) {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
  },

  handleSeek: function(video, seekBar) {
    var time = video.duration * (seekBar.value / 100.0);
    video.currentTime = time;
    this.setState({currentTime: time, shouldRefreshWhiteboardIndices: true});
  },

  handleTimeChange: function(video, seekBar) {
    var value = (100.0 / video.duration) * video.currentTime;
    seekBar.value = value;
    this.setState({currentTime: video.currentTime});
  },

  handleSeekBegin: function(video) {
    if(video.paused) {
      this.setState({wasPausedBeforeSeeking: true});
    } else {
      video.pause();
      this.setState({wasPausedBeforeSeeking: false});
    }
  },

  handleSeekEnd: function(video) {
    if(!this.state.wasPausedBeforeSeeking) {
      video.play();
    }
  },

  handleVolumeChange: function(video, volumeBar) {
    video.volume = volumeBar.value;
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
      <video id="video" width="50%" height="50%">{videoFormats}</video>
    );
  },

  renderWhiteboards: function() {
    return <img id='lecture-media--whiteboard-image' src={this.getCurrentWhiteboardImage()}/>
  },

  renderScreen: function() {
    return <img id='lecture-media--screen-image' src={this.getCurrentScreenImage()}/>;
  },

  renderControler: function() {
    return (
      <div id="video-controls">
        <button type="button" id="play-pause">{this.state.paused ? 'Play' : 'Pause'}</button>
        <input  type="range"  id="seek-bar"/>
        <button type="button" id="mute">{this.state.muted ? 'Unmute' : 'Mute'}</button>
        <input  type="range"  id="volume-bar" min="0" max="1" step="0.1"/>
        <button type="button" id="full-screen">Full-Screen</button>
      </div>
    );
  }

});

module.exports = MediaPlayer;
