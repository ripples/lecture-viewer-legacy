var React = require('react');

var MediaController = React.createClass({

  propTypes: {
    duration: React.PropTypes.number,
    currentTime: React.PropTypes.number,
    paused: React.PropTypes.bool,
    muted: React.PropTypes.bool,
  },

  componentDidMount: function() {
    document.getElementById("seek-bar").defaultValue = 0;
    document.getElementById("volume-bar").defaultValue = 1;
  },

  /*============================== @HANDLING ==============================*/

  handleTogglePlayClick: function() {
    this.props.paused ? this.props.onPlay() : this.props.onPause();
  },

  handleToggleMuteClick: function() {
    this.props.muted ? this.props.onUnmute() : this.props.onMute();
  },

  handleToggleFullscreenClick: function() {
    this.props.onFullscreen();
  },

  handleSeekChange: function(e) {
    this.props.onSeek(e.target.value);
  },

  handleVolumeChange: function(e) {
    this.props.onVolumeChange(e.target.value);
  },

  /*============================== @LOGIC ==============================*/

  getSeekValue: function() {
    return seekValue = (100.0 / this.props.duration) * this.props.currentTime;
  },

  /*============================== @FORMATTING ==============================*/

  getFormattedTime: function(timestamp) {
    var hours   = parseInt(timestamp / 3600) % 24;
    var minutes = parseInt(timestamp / 60) % 60;
    var seconds = parseInt(timestamp) % 60;
    return  (hours < 10 ? "0" + hours : hours) + ":" +
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds  < 10 ? "0" + seconds : seconds);
  },

  /*============================== @RENDERING ==============================*/

  render: function() {
    return (
      <div id="media-controller">
        {this.renderPlayToggleButton()}
        {this.renderSeekBar()}
        {this.renderMuteToggleButton()}
        {this.renderVolumeBar()}
        {this.renderFullscreenToggleButton()}
      </div>
    );
  },

  renderPlayToggleButton: function() {
    return (
      <button type="button" id="play-pause" onClick={this.handleTogglePlayClick}>
        {this.props.paused ? 'Play' : 'Pause'}
      </button>
    );
  },

  renderMuteToggleButton: function() {
    return (
      <button type="button" id="mute" onClick={this.handleToggleMuteClick}>
        {this.props.muted ? 'Unmute' : 'Mute'}
      </button>
    );
  },

  renderFullscreenToggleButton: function() {
    return (
      <button type="button" id="full-screen" onClick={this.handleToggleFullscreenClick}>
        FullScreen
      </button>
    );
  },

  renderVolumeBar: function() {
    return (
      <input type="range" id="volume-bar" min="0" max="1" step="0.1" onChange={function() {}}
        value={this.props.volume}
        onInput={this.handleVolumeChange}/>
    );
  },

  renderSeekBar: function() {
    return (
      <div>
        <span className='current-time'>
          {this.getFormattedTime(this.props.currentTime)}
        </span>
        <input type="range" id="seek-bar" value={this.getSeekValue()} onChange={function() {}}
          onInput={this.handleSeekChange}/>
        <span className='remaining-time'>
          {this.getFormattedTime(this.props.duration - this.props.currentTime)}
        </span>
      </div>
    );
  }

});

module.exports = MediaController;
