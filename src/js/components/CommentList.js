var React                 = require('react');
var Comment               = require('./Comment');
var CreateStoreMixin      = require('../mixins/CreateStoreMixin');
var CommentStore          = require('../stores/CommentStore');
var CommentActionCreator  = require('../actions/CommentActionCreator');

/**
  Holds a list of Comments for a specific lecture. When a user comments on a
  lecture, it should appear in this list.
**/

var CommentList = React.createClass({

  // The list needs to know which lecture it is showing comments for.
  // Additionally, it should know how comments will be filtered. TODO
  propTypes: {
    lectureId: React.PropTypes.number.isRequired
  },

  // Listen for changes in the CommentStore
  mixins: [CreateStoreMixin([CommentStore])],

  // Get the comments from the store based on the current lectureId prop
  getStateFromStores: function(props) {
    // var lectureID = this.parseLecture(props); // TODO : For use with ROUTER
    var lectureId = props.lectureId;
    var comments = CommentStore.getCommentsForLecture(lectureId);
    return {
      comments: comments
    };
  },

  // When the component is mounted, it should call an ActionCreator to get new data
  componentDidMount: function() {
    this.lectureDidChange(this.props);
  },

  // When there is a transition to a different lecture, call on the ActionCreator
  componentWillReceiveProps: function(nextProps) {
    // if (this.parseLecture(nextProps) !== this.parseLecture(this.props)) {
      // this.setState(this.getStateFromStores(nextProps));
      this.lectureDidChange(nextProps);
    // }
  },

  // Messages the ActionCreator to start the data flow by requesting comments
  lectureDidChange: function(props) {
    // var lectureID = this.parseCourse(props);  // TODO : For use with ROUTER
    var lectureId = props.lectureId;
    CommentActionCreator.requestCommentsForLecture(lectureId);
  },

  render: function() {

    var comments = this.state.comments;
    var commentListItems = comments.map(function(comment, i) {
      return (
        <li key={i}>
          <Comment commentId={comment.id} author={comment.author} datePosted={comment.date}
            commentBody={comment.body} timestamp={comment.timestamp}
            replies={comment.replies} isReplying={comment.isReplying}/>
        </li>
      );
    });

    return (
      <div className='comment-list'>
        <ol>
          {commentListItems}
        </ol>
      </div>
    );
  }

});

module.exports = CommentList;
