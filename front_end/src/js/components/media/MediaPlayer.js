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
      shouldRefreshWhiteboardIndices: false,
      shouldRefreshScreenIndices: false
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
    wasPausedBeforeSeeking = true;

    /** 3) Attach event-handlers **/
    // TOGGLE PLAY/PAUSE
    playButton.addEventListener("click", function() {
      if (video.paused == true) {
        wasPausedBeforeSeeking = false;
        video.play();
        playButton.innerHTML = "Pause";
      } else {
        wasPausedBeforeSeeking = true;
        video.pause();
        playButton.innerHTML = "Play";
      }
    });
    // TOGGLE MUTE/UNMUTE
    muteButton.addEventListener("click", function() {
      if (video.muted == false) {
        video.muted = true;
        muteButton.innerHTML = "Unmute";
      } else {
        video.muted = false;
        muteButton.innerHTML = "Mute";
      }
    });
    // TOGGLE FULLSCREEN
    fullScreenButton.addEventListener("click", function() {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
    });
    // SEEKING
    seekBar.addEventListener("input", function() {
      var time = video.duration * (seekBar.value / 100.0);
      video.currentTime = time;
      this.setState({currentTime: time, shouldRefreshWhiteboardIndices: true});
    }.bind(this));
    // VIDEO TIME CHANGE
    video.addEventListener("timeupdate", function() {
      var value = (100.0 / video.duration) * video.currentTime;
      seekBar.value = value;
      this.setState({currentTime: video.currentTime});
    }.bind(this));
    // SEEK PAUSE : Pause the video when the slider handle is being dragged
    seekBar.addEventListener("mousedown", function() {
      if(video.paused) {
        wasPausedBeforeSeeking = true;
      } else {
        video.pause();
      }
    });
    // SEEK PLAY : Play the video when the slider handle is dropped
    seekBar.addEventListener("mouseup", function() {
      if(!wasPausedBeforeSeeking) {
        video.play();
      }
    });
    // VOLUME CHANGE
    volumeBar.addEventListener("input", function() {
      video.volume = volumeBar.value;
    });

  },

  /*============================== @HANDLING ==============================*/

  // TODO : Pull logic out from above.

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

  // TODO : Make sure screen + whiteboard are sorted by startTime
  // See FIXME below...

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
      image.src = images[i].url;  // BUG : Cannot read property URL of undefined.
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
    return <video id="video" ref="video" width="50%" height="50%">{videoFormats}</video>;
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
        <button type="button" id="play-pause">Play</button>
        <input  type="range"  id="seek-bar"/>
        <button type="button" id="mute">Mute</button>
        <input  type="range"  id="volume-bar" min="0" max="1" step="0.1"/>
        <button type="button" id="full-screen">Full-Screen</button>
      </div>
    );
  }

});

module.exports = MediaPlayer;
