var React = require('react');
var moment = require('moment');

var Reply = React.createClass({

  propTypes: {
    author: React.PropTypes.object.isRequired,
    datePosted: React.PropTypes.instanceOf(Date).isRequired,
    replyBody: React.PropTypes.string.isRequired
  },

  render: function() {

    var authorName = this.props.author.firstName;
    var timeAgo = moment(this.props.datePosted).fromNow();

    return (
      <div className='reply'>
        <h4 className='reply__author'>{authorName}</h4>
        <h4 className='reply__date'>{timeAgo}</h4>
        <p className='reply__body'>{this.props.replyBody}</p>
      </div>
    );
  }

});

module.exports = Reply;
