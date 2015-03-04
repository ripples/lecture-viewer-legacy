var React = require('react');
var pluralize = require('pluralize');
var moment = require('moment');

var Comment = React.createClass({

  propTypes: {
    author: React.PropTypes.object.isRequired,
    datePosted: React.PropTypes.instanceOf(Date).isRequired,
    commentBody: React.PropTypes.string.isRequired,
    timestamp: React.PropTypes.number,
    replies: React.PropTypes.array,
    isReplying: React.PropTypes.bool
  },

  _onSeek: function() {
    // TODO : Create SEEK Action
  },

  _onToggleReplies: function() {
    this.setState{isRepliesListVisisble: !this.state.isRepliesListVisisble};
  },

  // An action must be dispatched to prevent simultaneos open replies across multiple comments
  _onBeginReply: function() {
    // TODO : Create REPLY_BEGIN Action
  },

  render: function() {

    var authorName = this.props.author.firstName;
    var timeAgo = moment(this.props.datePosted).fromNow();
    var formattedTimeStamp = this.props.timestamp; // TODO ? Format

    var toggleRepliesButton = '';
    if(var n = this.props.replies.length > 0) {
      toggleRepliesButtonStyle = (this.state.isRepliesListVisisble) ?
        'comment__reply-button--open' :
        'comment__reply-button--closed';
      toggleRepliesButton =
        <button className={toggleRepliesButtonStyle} onClick={this._onToggleReplies()}>{n} {pluralize('Reply', n)}</button>;
    }

    var repliesList = this.props.replies.map(function(reply) {
      return <li><Reply author={reply.author} datePosted={reply.date} replyBody={reply.body}></li>
    });

    var repliesListStyle = (this.state.isRepliesListVisisble) ?
      'comment__replies-list--visible' :
      'comment__replies-list--hidden';

    var replyButton = (!this.props.isReplying) ?
      <button className='comment__reply-button' onClick={this._onBeginReply()}>Reply</button> : '';

    return (
      <div className='comment'>
        <h4 className='comment__author'>{authorName}</h4>
        <h4 className='comment__date'>{timeAgo}</h4>
        <p className='comment__body'>
          <span className='comment__timestamp' onClick={this._onSeek()}>{formattedTimeStamp}</span> {this.props.commentBody}
        </p>
        {replyButton}
        {toggleRepliesButton}
        <div className={repliesListStyle}>
          <ol>
            {repliesList}
          </ol>
        </div>
      </div>
    );
  }

});

module.exports = Comment;
