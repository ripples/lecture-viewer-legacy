var React                 = require('react');
var BookmarkActionCreator = require('../../actions/BookmarkActionCreator');
var moment                = require('moment');

var BookmarkEditor = React.createClass({

  displayName: 'BookmarkEditor',

  propTypes: {
    onSubmit: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
  },

  // NEED THESE AS PROPS OR ON REQUEST
  getDefaultProps: function() {
    return {
      lectureLength: 3745,    // random...
      lectureTimestamp: 2054  // random...
    };
  },

  getInitialState: function() {
    return {
      content: '',
      time: '',
      contentIsValid: false,
      timeIsValid: false
    };
  },

  /*============================== @HANDLING ==============================*/

  handleCancelClick: function(e) {
    e.preventDefault();
    this.props.onCancel();
    this.replaceState(this.getInitialState());
  },

  handleSubmitClick: function(e) {
    e.preventDefault();
    var content = this.state.content.trim();
    var time = this.getStringAsTimestamp(this.state.time.trim());
    // TODO : Perform Validation if necessary
    this.props.onSubmit(content, time);
    this.replaceState(this.getInitialState());
  },

  handleContentChange: function(e) {
    e.preventDefault();
    var content = e.target.value;
    this.setState({
      content: content,
      contentIsValid: (content.trim().length > 0)
    });
  },

  handleTimeChange: function(e) {
    e.preventDefault();
    var time = e.target.value;
    this.setState({
      time: time,
      timeIsValid: this.isTimestampValid(this.getStringAsTimestamp(time.trim()))
    });
  },

  /*============================== @FORMATTING ==============================*/

  getStringAsTimestamp: function(timeString) {
    if(moment(timeString, ["hh:mm:ss", "h:m:s", "mm:ss", "m:s"]).isValid()) {
      // Returns timestamp in seconds
      var p = timeString.split(':'), s = 0, m = 1;
      while (p.length > 0) {
          s += m * parseInt(p.pop(), 10);
          m *= 60;
      }
      return s;
    } else {
      return undefined;
    }
  },

  /*============================== @VALIDATING ==============================*/

  isTimestampValid: function(timestamp) {
    return  (timestamp && timestamp != null) &&
            !isNaN(timestamp) &&
            (timestamp >= 0 && timestamp <= this.props.lectureLength);
  },

  /*============================== @RENDERING ==============================*/

  render: function() {
    return (
      <div className='bookmark-editor'>
        <form>
          <textarea className='bookmark-editor__content-input'
            name='bookmark' value={this.state.content}
            onChange={this.handleContentChange}>
          </textarea>
          <input placeholder="0:00" value={this.state.time}
            onChange={this.handleTimeChange}
          />
          <button className='bookmark-editor__cancel-button'
            onClick={this.handleCancelClick}>
            Cancel
          </button>
          {this.renderSubmitBookmarkButton()}
        </form>
      </div>
    );
  },

  renderSubmitBookmarkButton: function() {
    var bookmarkButtonState = this.state.contentIsValid &&
                              this.state.timeIsValid ? '' : 'disabled';
    return (
      <input className='bookmark-editor__submit-button'
        type='button' value='Submit'
        onClick={this.handleSubmitClick}/>
    );
  }
});

module.exports = BookmarkEditor;
