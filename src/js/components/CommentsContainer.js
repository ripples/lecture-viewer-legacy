var React                 = require('react');
var CommentList           = require('./CommentList');
var CommentEditor         = require('./CommentEditor');
var CreateStoreMixin      = require('../mixins/CreateStoreMixin');
var CommentStore          = require('../stores/CommentStore');
var CommentActionCreator  = require('../actions/CommentActionCreator');

var CommentsContainer = React.createClass({

  propTypes: {
    course_id: React.PropTypes.number.isRequired,
    lecture_id: React.PropTypes.number.isRequired
  },

  mixins: [CreateStoreMixin([CommentStore])],

  /*============================== @LIFECYCLE ==============================*/

  componentDidMount: function() {
    this.contextDidChange(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState(this.getStateFromStores(nextProps));
    this.contextDidChange(nextProps);
  },

  getStateFromStores: function(props) {
    var comments = CommentStore.getComments(props.course_id, props.lecture_id);
    return { comments: comments };
  },

  contextDidChange: function(props) {
    CommentActionCreator.requestComments(props.course_id, props.lecture_id);
  },

  /*============================== @HANDLING ==============================*/

  handleSubmitComment: function(content, isAnonymous) {
    CommentActionCreator.createComment(
      this.props.course_id, this.props.lecture_id, content, isAnonymous
    );
  },

  /*============================== @RENDERING ==============================*/

  render: function() {
    return (
      <div className='comments-container'>
        <CommentList
          comments={this.state.comments} 
          course_id={this.props.course_id}
          lecture_id={this.props.lecture_id}/>
        <CommentEditor onSubmit={this.handleSubmitComment}/>
      </div>
    );
  }

});

module.exports = CommentsContainer;
