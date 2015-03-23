var React = require('react');

var ReplyEditor = React.createClass({

  displayName: 'ReplyEditor',

  propTypes: {
    onSubmit: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      content: '',
      contentIsValid: false
    };
  },

  /*============================== @HANDLING ==============================*/

  handleCancelClick: function(e) {
    e.preventDefault();
    this.props.onCancel();
    this.replaceState(this.getInitialState());
  },

  handleSubmitClick: function(e) {
    e.preventDefault();
    var content = this.state.content.trim();
    // TODO : Perform Validation if necessary
    this.props.onSubmit(content);
    this.replaceState(this.getInitialState());
  },

  handleReplyContentChange: function(e) {
    e.preventDefault();
    this.setState({
      content: e.target.value,
      contentIsValid: (e.target.value.trim().length > 0)
    });
  },

  /*============================== @RENDERING ==============================*/

  render: function() {
    return (
      <div className='reply-editor'>
        <form>
          <textarea className='reply-editor__input'
            name='reply-content' value={this.state.content}
            onChange={this.handleReplyContentChange}>
          </textarea>
          {this.renderSubmitReplyButton()}
          <button className='reply-editor__cancel-button'
            onClick={this.handleCancelClick}>
            Cancel
          </button>
        </form>
      </div>
    );
  },

  renderSubmitReplyButton: function() {
    var replyButtonState = this.state.contentIsValid ? '' : 'disabled';
    return (
      <input className='reply-editor__submit-button'
        type='button' value='Reply'
        onClick={this.handleSubmitClick}/>
    );
  }
});

module.exports = ReplyEditor;
