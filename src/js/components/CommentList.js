var React                 = require('react');
var Comment               = require('./Comment');
var CreateStoreMixin      = require('../mixins/CreateStoreMixin');
var CommentStore          = require('../stores/CommentStore');
var CommentActionCreator  = require('../actions/CommentActionCreator');

var CommentList = React.createClass({

  propTypes: {
    lectureId: React.PropTypes.number
  },

  mixins: [CreateStoreMixin([CommentStore])],

  getStateFromStores: function(props) {
    // var lectureID = this.parseLecture(props), // TODO : For use with ROUTER
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

  // When the page transitions to a different course, call on the ActionCreator
  componentWillReceiveProps: function(nextProps) {
    // if (this.parseLecture(nextProps) !== this.parseLecture(this.props)) {
      this.setState(this.getStateFromStores(nextProps));
      this.lectureDidChange(nextProps);
    // }
  },

  // Messages the ActionCreator to start the data flow
  lectureDidChange: function(props) {
    // var lectureID = this.parseCourse(props);
    var lectureId = props.lectureId;
    CommentActionCreator.requestCommentsForLecture(lectureId);
  },

  render: function() {

    var comments = this.state.comments;
    var commentListItems = comments.map(function(comment) {
      return (
        <li>
          <Comment key={comment.id} id={comment.id} author={comment.author} datePosted={comment.date}
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
