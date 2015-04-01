var React                 = require('react');
var Bookmark              = require('./Bookmark');
var BookmarkActionCreator = require('../../actions/BookmarkActionCreator');

var BookmarkList = React.createClass({

  displayName: 'BookmarkList',

  propTypes: {
    course_id:  React.PropTypes.number.isRequired,
    lecture_id: React.PropTypes.number.isRequired,
    bookmarks:  React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      editingBookmarkId: -1
    };
  },

  /*============================== @HANDLING ==============================*/

  handleBeginBookmarkEdit: function(bookmark_id) {
    this.setState({editingBookmarkId: bookmark_id});
  },

  handleEndBookmarkEdit: function() {
    this.replaceState(this.getInitialState());
  },

  handleSaveBookmark: function(bookmark_id, content, time) {
    BookmarkActionCreator.saveBookmark(
      this.props.course_id, this.props.lecture_id, bookmark_id, content, time
    );
  },

  handleDeleteBookmark: function(bookmark_id) {
    BookmarkActionCreator.deleteBookmark(
      this.props.course_id, this.props.lecture_id, bookmark_id
    );
  },

  /*============================== @RENDERING ==============================*/

  render: function() {

    var bookmarks = this.props.bookmarks.map(function(bookmark, i) {
      return (
        <li key={i}>
          <Bookmark
            course_id={this.props.course_id}
            lecture_id={this.props.lecture_id}
            bookmark={bookmark}
            isEditing={this.state.editingBookmarkId === bookmark.id}
            onBeginEdit={this.handleBeginBookmarkEdit}
            onEndEdit={this.handleEndBookmarkEdit}/>
        </li>
      )
    }.bind(this));

    return (
      <div className='bookmark-list'>
        <ol>
          {bookmarks}
        </ol>
      </div>
    );
  }

});

module.exports = BookmarkList;
