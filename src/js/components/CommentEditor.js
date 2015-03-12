var React = require('react');
var CommentActionCreator = require('../actions/CommentActionCreator');

var CommentEditor = React.createClass({

  propTypes: {
    lectureId: React.PropTypes.number.isRequired
  },

  getInitialState: function() {
    return {
      commentBody: '',
      labelContent: '',
      isInvalid: false,
      isAnonymous: false
    };
  },

  _onToggleAnonymous: function(e) {
    e.preventDefault();
    this.setState({isAnonymous: !this.state.isAnonymous});
  },

  _onSubmitComment: function(e) {
    e.preventDefault();
    var commentBody = this.state.commentBody;

    // TODO : Perform error-checking
    CommentActionCreator.createCommentForLecture(commentBody, this.props.lectureId, this.state.isAnonymous);
    this.setState({commentBody: ''});
  },

  _handleChange: function(e) {
    this.setState({commentBody: e.target.value});
  },

  render: function() {

    var invalidCommentLabel = (this.state.isInvalid) ?
      <label className='comment-editor__label--invalid' for='comment-body'>{this.state.labelContent}</label> : '';

    var anonymousStatusText = (this.state.isAnonymous) ?
      'Anonymous' : ''

    // TODO : Place this on the Submit button to change whether it is disabled
    // var commentButtonState = (this.state.commentBody.length > 0 && !this.state.isInvalid) ? 'disabled' : '';
    // {commentButtonState}

    return (
      <div className='comment-editor'>
        <form>
          {invalidCommentLabel}
          <textarea className='comment-editor__input' id='comment-body' name='comment'
            value={this.state.commentBody} onChange={this._handleChange}></textarea>
          {anonymousStatusText}
          <button className='comment-editor__anonymous-toggle-button' onClick={this._onToggleAnonymous}>Toggle Anonymity</button>
          <input type='button' className='comment-editor__submit-button' value='Comment' onClick={this._onSubmitComment}/>
        </form>
      </div>
    );
  }

});

module.exports = CommentEditor;
