var React = require('react');

var Bookmark = React.createClass({

  propTypes: {
    bookmark: React.PropTypes.shape({
      id:       React.PropTypes.number.isRequired,
      content:  React.PropTypes.string.isRequired,
      time:     React.PropTypes.number.isRequired
    })
  },

  /*============================== @FORMATTING ==============================*/

  getFormattedTimestamp: function() {
    // TODO : LINK to appropriate time in lecture
    var timestamp = this.props.bookmark.time;
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
      <div className='bookmark'>
        <h4 className='bookmark__label'>{this.props.bookmark.content}</h4>
        <h5 className='bookmark__time'>{this.getFormattedTimestamp()}</h5>
      </div>
    );
  }

});

module.exports = Bookmark;
