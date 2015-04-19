var React = require('react');

var CommentEditor = React.createClass({

  displayName: 'CommentEditor',

  propTypes: {
    onSubmit: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      content: '',
      contentIsValid: false,
      isAnonymous: false
    };
  },

  /*============================== @HANDLING ==============================*/

  handleToggleAnonymousClick: function(e) {
    e.preventDefault();
    this.setState({isAnonymous: !this.state.isAnonymous});
  },

  handleSubmitClick: function(e) {
    e.preventDefault();
    var content = this.state.content.trim();
    // TODO : Perform Validation if necessary
    this.props.onSubmit(this.state.content, this.state.isAnonymous);
    this.setState({
      content: '',
      contentIsValid: false
    });
  },

  handleCommentContentChange: function(e) {
    e.preventDefault();
    this.setState({
      content: e.target.value,
      contentIsValid: (e.target.value.trim().length > 0)
    });
  },

  /*============================== @RENDERING ==============================*/

  render: function() {
    return (
      <div className='comment-editor'>
        <form>
          <textarea className='comment-editor__input'
            name='comment' value={this.state.content}
            placeholder={'Add Comment...'}
            onChange={this.handleCommentContentChange}>
          </textarea>
          {/*this.renderAnonymousToggleButton()*/}
          {this.renderSubmitCommentButton()}
        </form>
      </div>
    );
  },

  renderSubmitCommentButton: function() {
    var commentButtonState = this.state.contentIsValid ? '' : 'disabled';
    return (
      <input className='comment-editor__submit-button'
        type='button' value='Comment'
        onClick={this.handleSubmitClick}/>
    );
  },

  renderAnonymousToggleButton: function() {
    var anonymousStatusText = this.state.isAnonymous ? 'Anonymous' : '';
    return (
      <div>
        <p>{anonymousStatusText}</p>
        <button className='comment-editor__anonymous-toggle-button'
          onClick={this.handleToggleAnonymousClick}>
          Toggle Anonymity
        </button>
      </div>
    );
  }
});

module.exports = CommentEditor;
