var React   = require('react');
var Comment = require('./Comment');

var CommentList = React.createClass({

  displayName: 'CommentList',

  propTypes: {
    course_id: React.PropTypes.number.isRequired,
    lecture_id: React.PropTypes.number.isRequired,
    comments:   React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      replyingCommentId: -1
    };
  },

  /*============================== @HANDLING ==============================*/

  handleBeginReply: function(commentId) {
    this.setState({replyingCommentId: commentId});
  },

  handleEndReply: function() {
    this.replaceState(this.getInitialState());
  },

  /*============================== @RENDERING ==============================*/

  render: function() {

    var comments = this.props.comments.map(function(comment, i) {
      return (
        <li key={i}>
          <Comment
            course_id={this.props.course_id}
            lecture_id={this.props.lecture_id}
            comment={comment}
            isReplying={this.state.replyingCommentId === comment.id}
            onBeginReply={this.handleBeginReply}
            onEndReply={this.handleEndReply}/>
        </li>
      )
    }.bind(this));

    return (
      <div className='comment-list'>
        <ol>
          {comments}
        </ol>
      </div>
    );
  }
});

module.exports = CommentList;
