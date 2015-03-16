var React = require('react');

var Bookmark = React.createClass({

  propTypes: {
    bookmarkId: React.PropTypes.number.isRequired,
    label: React.PropTypes.string.isRequired,
    time: React.PropTypes.instanceOf(Date).isRequired
  },

  _formatTimestamp: function(timeInMilliseconds) {

    // TODO : Setup onClick listener
    // TODO : Format time as hh:mm:ss

    return null;
  },

  render: function() {

    var label = this.props.label;
    var time = this._formatTimestamp(this.props.time);

    return (
      <div className='bookmark'>
        <h4 className='bookmark__label'>{label}</h4>
        <h4 className='bookmark__time'>{time}</h4>
      </div>
    );
  }

});

module.exports = Bookmark;
