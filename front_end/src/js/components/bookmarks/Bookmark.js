var React                 = require('react');
var BookmarkEditor        = require('./BookmarkEditor');
var BookmarkActionCreator = require('../../actions/BookmarkActionCreator');

var Bookmark = React.createClass({

  propTypes: {
    bookmark: React.PropTypes.shape({
      id:       React.PropTypes.number.isRequired,
      content:  React.PropTypes.string.isRequired,
      time:     React.PropTypes.number.isRequired
    }),
    isEditing:    React.PropTypes.bool,
    onBeginEdit:  React.PropTypes.func,
    onEndEdit:    React.PropTypes.func,
  },

  /*============================== @HANDLING ==============================*/

  handleEditClick: function() {
    this.props.onBeginEdit(this.props.bookmark.id);
  },

  handleDeleteClick: function() {
    BookmarkActionCreator.deleteBookmark(
      this.props.course_id, this.props.lecture_id, this.props.bookmark.id
    );
    this.props.onEndEdit();
  },

  handleCancelEdit: function() {
    this.props.onEndEdit();
  },

  handleSaveBookmark: function(content, time) {
    BookmarkActionCreator.saveBookmark(
      this.props.course_id, this.props.lecture_id,
      this.props.bookmark.id, content, time
    );
    this.props.onEndEdit();
  },

  /*============================== @FORMATTING ==============================*/

  getFormattedTimestamp: function() {
    // TODO : LINK to appropriate time in lecture
    var timestamp = this.props.bookmark.time;
    var hours   = parseInt(timestamp / 3600) % 24;
    var minutes = parseInt(timestamp / 60) % 60;
    var seconds = parseInt(timestamp) % 60;
    return  (hours < 10 ? "0" + hours : hours) + ":" +
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds  < 10 ? "0" + seconds : seconds);
  },

  /*============================== @RENDERING ==============================*/

  render: function() {
    return (
      <div className='bookmark'>
        {this.props.isEditing ? this.renderEditor() : this.renderBookmark()}
      </div>
    );
  },

  renderActionButtons: function() {
    return (
      <div className='bookmark-actions'>
        <span onClick={this.handleEditClick}>Edit </span>
        <span onClick={this.handleDeleteClick}>Delete </span>
      </div>
    );
  },

  renderBookmark: function() {
    return (
      <div className='bookmark-content'>
        {this.renderActionButtons()}
        <h4 className='bookmark__label'>{this.props.bookmark.content}</h4>
        <h5 className='bookmark__time'>{this.getFormattedTimestamp()}</h5>
      </div>
    );
  },

  renderEditor: function() {
    return (
      <BookmarkEditor
        bookmark={this.props.bookmark}
        onSubmit={this.handleSaveBookmark}
        onCancel={this.handleCancelEdit}/>
    );
  }
});

module.exports = Bookmark;
