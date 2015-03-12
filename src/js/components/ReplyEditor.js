var React = require('react');
var CommentActionCreator = require('../actions/CommentActionCreator');

var ReplyEditor = React.createClass({

  propTypes: {
    parentCommentId: React.PropTypes.number
  },

  getInitialState: function() {
    return {
      replyBody: '',
      isInvalid: false,
      labelContent: ''
    };
  },

  _onCancelReply: function(e) {
    e.preventDefault();
    console.log("***Cancelling reply...");
    CommentActionCreator.cancelReply();
  },

  _onSubmitReply: function(e) {
    e.preventDefault();
    var replyBody = this.state.replyBody;

    // TODO : Perform error-checking
    console.log("***Submiting reply...");

    this.setState({replyBody: ''});
    CommentActionCreator.createReplyToComment(replyBody, this.props.parentCommentId);
  },

  _handleChange: function(e) {
    this.setState({replyBody: e.target.value});
  },

  render: function() {

    var invalidReplyLabel = (this.state.isInvalid) ?
      <label className='reply-editor__label--invalid' for='reply-body'>{this.state.labelContent}</label> : '';

    // TODO : Place this on the Submit button to change whether it is disabled
    // var replyButtonState = (this.state.replyBody.length > 0 && !this.state.isInvalid) ? 'disabled' : '';
    // {replyButtonState}

    return (
      <div className='reply-editor'>
        <form>
          {invalidReplyLabel}
          <textarea className='reply-editor__input' id='reply-body' name='reply' onChange={this._handleChange}></textarea>
          <input type='button' className='reply-editor__submit-button' value='Reply' onClick={this._onSubmitReply}/>
          <button className='reply-editor__cancel-button' onClick={this._onCancelReply}>Cancel</button>
        </form>
      </div>
    );
  }

});

module.exports = ReplyEditor;
