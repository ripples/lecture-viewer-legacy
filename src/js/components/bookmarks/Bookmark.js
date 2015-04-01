var React = require('react');

var Bookmark = React.createClass({

  propTypes: {
    bookmark: React.PropTypes.shape({
      id:     React.PropTypes.number.isRequired,
      label:  React.PropTypes.string.isRequired,
      time:   React.PropTypes.number.isRequired
    })
  },

  /*============================== @FORMATTING ==============================*/

  getFormattedTimestamp: function() {
    // TODO : LINK to appropriate time in lecture
    // TODO : Put in form of hh:mm:ss if there is a time for the comment
    // return moment({seconds:this.props.bookmark.time}, ['HH:mm:ss']); FIXME
    return this.props.bookmark.time;
  },

  /*============================== @RENDERING ==============================*/

  render: function() {
    return (
      <div className='bookmark'>
        <h4 className='bookmark__label'>{this.props.bookmark.label}</h4>
        <h4 className='bookmark__time'>{this.getFormattedTimestamp()}</h4>
      </div>
    );
  }

});

module.exports = Bookmark;
