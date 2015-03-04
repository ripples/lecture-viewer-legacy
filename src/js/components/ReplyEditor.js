var React = require('react');

var ReplyEditor = React.createClass({

  propTypes: {
    parent_comment_id: React.PropTypes.number.isRequired,
  },

  getInitialState: function() {
    return {
      isInvalid: false;
    };
  },

  _onCancelReply: function() {
    // TODO : Create REPLY_CANCEL Action
  },

  _onSubmitReply: function() {
    var replyBody = this.state.replyBody;
    // TODO : Perform error-checking
    // TODO : Create REPLY_SUBMIT Action
  },

  render: function() {

    var invalidReplyLabel = (this.state.isInvalid) ?
      <label className='reply-editor__label--invalid' for='reply-body'>{this.state.labelContent}</label> : '';

    // TODO : Disable 'Submit' if there is no text entered

    return (
      <div className='reply-editor'>
        <form action={this._onReply()}>
          {invalidReplyLabel}
          <textarea className='reply-editor__input' id='reply-body' name='reply' value={this.state.replyBody}></textarea>
          <input className='reply-editor__submit-button' type='submit' value='Reply'>
          <button className='reply-editor__cancel-button' onClick={this._onCancel()}>Cancel</button>
        </form>
      </div>
    );
  }

});

module.exports = ReplyEditor;
