var React = require('react');
var BookmarkActionCreator = require('../../actions/BookmarkActionCreator');

var BookmarkEditor = React.createClass({

  propTypes: {
    lectureId: React.PropTypes.number.isRequired
  },

  getInitialState: function() {
    return {
      bookmarkBody: '',
      labelContent: '',
      isInvalid: false,
    };
  },

  _onAddBookmark: function(e) {
    e.preventDefault();
    var bookmarkBody = this.state.bookmarkBody;

    // TODO : Perform error-checking
    BookmarkActionCreator.createBookmarkForLecture(bookmarkBody, this.props.lectureId);
    this.setState({bookmarkBody: ''});
  },

  _handleChange: function(e) {
    this.setState({bookmarkBody: e.target.value});
  },

  render: function() {

    var invalidBookmarkLabel = (this.state.isInvalid) ?
      <label className='bookmark-editor__label--invalid' for='bookmark-body'>{this.state.labelContent}</label> : '';

    // TODO : Place this on the Submit button to change whether it is disabled
    // var bookmarkButtonState = (this.state.bookmarkBody.length > 0 && !this.state.isInvalid) ? 'disabled' : '';
    // {bookmarkButtonState}

    return (
      <div className='bookmark-editor'>
        <form>
          {invalidBookmarkLabel}
          <textarea className='bookmark-editor__input' id='bookmark-body' name='bookmark'
            value={this.state.bookmarkBody} onChange={this._handleChange}></textarea>
          <input type='button' className='bookmark-editor__submit-button' value='Add Bookmark' onClick={this._onAddBookmark}/>
        </form>
      </div>
    );
  }

});

module.exports = BookmarkEditor;
