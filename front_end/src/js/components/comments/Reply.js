var React = require('react');
var moment = require('moment');

var Reply = React.createClass({

  displayName: 'Reply',

  propTypes: {
    reply:      React.PropTypes.shape({
      id:           React.PropTypes.number,
      author:       React.PropTypes.shape({
        first_name:   React.PropTypes.string.isRequired,
        last_name:    React.PropTypes.string.isRequired,
      }).isRequired,
      date_posted:  React.PropTypes.instanceOf(Date).isRequired,
      content:      React.PropTypes.string.isRequired,
    }),
  },

  /*============================== @FORMATTING ==============================*/

  getFormattedAuthorName: function() {
    return  this.props.reply.author.first_name + ' ' +
            this.props.reply.author.last_name;
  },

  getFormattedDatePosted: function() {
    return moment(this.props.reply.date_posted).fromNow();
  },

  /*============================== @RENDERING ==============================*/

  render: function() {
    return (
      <div className='reply'>
        <h4 className='reply__author'>{this.getFormattedAuthorName()}</h4>
        <h4 className='reply__date'>{this.getFormattedDatePosted()}</h4>
        <p className='reply__content'>{this.props.reply.content}</p>
      </div>
    );
  }
});

module.exports = Reply;
