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
      <button type="button" id="play-pause"
        className={this.props.paused ? 'play' : 'pause'}
        onClick={this.handleTogglePlayClick}>
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

    // TODO : Set input track background to transparent in CSS
    // TODO : Place the progress element directly behind the input element in CSS

    return (
      <div className='media-controller__seek-bar'>
        <span className='current-time'>
          {this.getFormattedTime(this.props.currentTime)}
        </span>
        <div className='seek-bar__range-progress'>
          <input type="range" id="seek-bar" className='range-progress__input' value={this.getSeekValue()} onChange={function() {}}
            onInput={this.handleSeekChange}/>
          <progress className='range-progress__progress' value={this.getSeekValue()} max="100"></progress>
          <span className='remaining-time'>
            {this.getFormattedTime(this.props.duration - this.props.currentTime)}
          </span>
        </div>
      </div>
    );
  }

});

module.exports = MediaController;
