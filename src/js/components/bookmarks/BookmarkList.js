var React                 = require('react');
var Bookmark              = require('./Bookmark');
var CreateStoreMixin      = require('../../mixins/CreateStoreMixin');
var BookmarkStore         = require('../../stores/BookmarkStore');
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
            onBeginEdit={this.handleBeginBookmarkReply}
            onEndEdit={this.handleEndBookmarkReply}/>
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
