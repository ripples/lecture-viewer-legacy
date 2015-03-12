var React                 = require('react');
var Reply                 = require('./Reply');
var ReplyEditor           = require('./ReplyEditor');
var pluralize             = require('pluralize');
var moment                = require('moment');
var CommentActionCreator  = require('../actions/CommentActionCreator');

var Comment = React.createClass({

  // TODO : Use SHAPING to pass a single Comment with specific fields as a prop
  propTypes: {
    commentId: React.PropTypes.number,
    author: React.PropTypes.object.isRequired,
    datePosted: React.PropTypes.instanceOf(Date).isRequired,
    commentBody: React.PropTypes.string.isRequired,
    timestamp: React.PropTypes.number,
    replies: React.PropTypes.array,
    isReplying: React.PropTypes.bool
  },

  getInitialState: function() {
    return ({
      isRepliesListVisisble: false
    });
  },

  _onSeek: function() {
    // TODO : Create SEEK Action
  },

  _onToggleReplies: function() {
    this.setState({isRepliesListVisisble: !this.state.isRepliesListVisisble});
  },

  // An action must be dispatched to prevent simultaneous open replies across multiple comments
  _onBeginReply: function() {
    CommentActionCreator.beginReplyToComment(this.props.commentId);
  },

  render: function() {

    var authorName = this.props.author.firstName;
    var timeAgo = moment(this.props.datePosted).fromNow();
    var formattedTimeStamp = this.props.timestamp; // TODO ? Format

    var toggleRepliesButton = '';
    var n = this.props.replies.length;
    if(n > 0) {
      var toggleRepliesButtonStyle = (this.state.isRepliesListVisisble) ?
        'comment__reply-button--open' :
        'comment__reply-button--closed';
      toggleRepliesButton =
        <button className={toggleRepliesButtonStyle} onClick={this._onToggleReplies}>{n} {pluralize('Reply', n)}</button>;
    }

    var repliesListItems = this.props.replies.map(function(reply, i) {
      return (<li key={i}><Reply author={reply.author} datePosted={reply.date} replyBody={reply.body}/></li>);
    });

    // TODO : Remove this in favor of the CSS classes below...
    var repliesListInlineStyle = (this.state.isRepliesListVisisble) ? {} : {display: 'none'};

    var repliesListStyle = (this.state.isRepliesListVisisble) ?
      'comment__replies-list--visible' :
      'comment__replies-list--hidden';

    var replyButton = (!this.props.isReplying) ?
      <button className='comment__reply-button' onClick={this._onBeginReply}>Reply</button> :
      <ReplyEditor parentCommentId={this.props.commentId}/>;

    return (
      <div className='comment'>
        <h4 className='comment__author'>{authorName}</h4>
        <h4 className='comment__date'>{timeAgo}</h4>
        <p className='comment__body'>
          <span className='comment__timestamp' onClick={this._onSeek}>{formattedTimeStamp}</span> {this.props.commentBody}
        </p>
        {replyButton}
        {toggleRepliesButton}
        <div className={repliesListStyle} style={repliesListInlineStyle}>
          <ol>
            {repliesListItems}
          </ol>
        </div>
      </div>
    );
  }
});

module.exports = Comment;
