var React = require('react');

var MediaPlayer = React.createClass({

  // propTypes: {
  //   media: React.propTypes.object
  // },

  getInitialState: function() {
    return {
      currentTime: 0.0,
      paused: true,
      isSeeking: false,
      muted: false,
      volume: 1.0,
      currentWhiteboardIndex: 0,
      currentScreenIndex: 0,
      shouldRefreshWhiteboardIndices: true,
      shouldRefreshScreenIndices: true
    };
  },

  componentDidMount: function() {
    var video = document.getElementById("video");
    video.ontimeupdate = function() {
      console.log("Current Time: " + video.currentTime);
      this.setState({currentTime: video.currentTime});
    }.bind(this);
  },

  /*============================== @HANDLING ==============================*/

  // TODO : Clean these up. Initilize the callbacks from the didMount function.

  handlePlaybackToggle: function() {
    this.setState({paused: !this.state.paused});
    var video = this.getDOMNode(this.refs.video);
    this.state.paused ? video.pause() : video.play();
  },
  handleMuteToggle: function() {
    this.setState({muted: !this.state.muted});
    var video = this.getDOMNode(this.refs.video);
    video.muted = this.state.muted;
  },
  handleVolumeChange: function(level) {
    this.setState({volume: level});
    var video = this.getDOMNode(this.refs.video);
    video.volume = level;
  },
  // TODO : Other media controler handlers

  /*============================== @RETRIEVING ==============================*/

  // TODO : Refactor into a getSyncedImage function.
  // TODO : Load images into the cache using a buffer based on currentTime
  // Maybe just a few, since images will not need to update frequently

  getCurrentWhiteboardImage: function() {
    // if(this.state.shouldRefreshWhiteboardIndices) {
    //   var index = this.binaryIndexOf(this.props.media.whiteboard, this.state.currentTime, this.comparator);
    //   this.cacheWhiteboardImage(index);
    //   this.state.shouldRefreshWhiteboardIndices = false;
    //   this.state.currentWhiteboardIndex = index;
    // } else {
      var index = this.state.currentWhiteboardIndex;
      if(index < this.props.media.whiteboard.length-1 &&
        this.state.currentTime > this.props.media.whiteboard[index].end) {
          this.state.currentWhiteboardIndex++;
          this.cacheWhiteboardImage(this.state.currentWhiteboardIndex);
      }
    // }
    return this.props.media.whiteboard[this.state.currentWhiteboardIndex].url;
  },

  getCurrentScreenImage: function() {
    // TODO : Follow Whiteboard implementation.
    return null;
  },

  /*============================== @HELPING ==============================*/

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
                  // remove image from the array once it's loaded
                  // for memory consumption reasons
                  buffer.splice(index, 1);
              }
          }
          buffer.push(image);
          image.src = images[i].url;
      }
  },

  // FIXME : The 'state.images' array is irrelevant. The images will be cached behind
  // the scenes and still referenced by URL.

  // Preload image if it does not exist
  cacheWhiteboardImage: function(index) {
    console.log("Caching Image at index... " + index);
    this.bufferImages(index, this.props.media.whiteboard, 1);
    // if(!this.state.images.whiteboard[index]) {
    //   var image = new Image();
    //   image.src = this.props.media.whiteboard[index].url;
    //   this.state.images.whiteboard[index] = image;
    // }
  },

  // TODO : Could refactor. This is specific to the image objects
  comparator: function(element, valueToCompare) {
    if(element.start < valueToCompare) {
      if(element.end > valueToCompare) {
        return 0; // EQUAL TO VALUE
      }
      return -1;  // LESS THAN VALUE
    } else if(element.start === valueToCompare) {
      return 0;
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
        minIndex = currentIndex - 1;
      } else {
        return currentIndex;
      }
    }
    return -1;
  },

  /*============================== @RENDERING ==============================*/

  render: function() {

    // var controllerEventHandlers = {
    //   onTogglePlayback: this.handlePlaybackToggle,
    //   onToggleMute:     this.handleMuteToggle,
    //   onVolumeChange:   this.handleVolumeChange,
    //   onTimeChange:     this.handleTimeChange
    // };

    return (
      <div className='media-player'>
        MEDIA HERE
          {this.renderVideo()}
          {this.renderWhiteboards()}
          {this.renderScreen()}
          {/*<MediaController {controllerEventHandlers}/>*/}
      </div>
    );
  },

  renderVideo: function() {
    var videoFormats = this.props.media.video.formats.map(function(format, i) {
      return <source key={i} src={this.props.media.video.base_url + '.' + format}/>
    }.bind(this));
    return <video id="video" width="50%" height="50%" controls>{videoFormats}</video>;
  },

  renderWhiteboards: function() {
    return <img id='lecture-media--whiteboard-image' src={this.getCurrentWhiteboardImage()}/>
  },

  renderScreen: function() {
    return <img id='lecture-media--screen-image' src={this.getCurrentScreenImage()}/>;
  },

});

module.exports = MediaPlayer;
