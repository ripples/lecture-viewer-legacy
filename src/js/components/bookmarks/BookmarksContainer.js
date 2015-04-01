var React                 = require('react');
var BookmarkList          = require('./BookmarkList');
var BookmarkEditor        = require('./BookmarkEditor');
var CreateStoreMixin      = require('../../mixins/CreateStoreMixin');
var BookmarkStore         = require('../../stores/BookmarkStore');
var BookmarkActionCreator = require('../../actions/BookmarkActionCreator');

var BookmarksContainer = React.createClass({

  propTypes: {
    course_id: React.PropTypes.number.isRequired,
    lecture_id: React.PropTypes.number.isRequired
  },

  mixins: [CreateStoreMixin([BookmarkStore])],

  /*============================== @LIFECYCLE ==============================*/

  componentDidMount: function() {
    this.contextDidChange(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState(this.getStateFromStores(nextProps));
    this.contextDidChange(nextProps);
  },

  getStateFromStores: function(props) {
    var bookmarks = BookmarkStore.getBookmarks(props.course_id, props.lecture_id);
    return { bookmarks: bookmarks };
  },

  contextDidChange: function(props) {
    BookmarkActionCreator.requestBookmarks(props.course_id, props.lecture_id);
  },

  /*============================== @HANDLING ==============================*/

  handleSubmitBookmark: function(label, time) {
    BookmarkActionCreator.createBookmark(
      this.props.course_id, this.props.lecture_id, label, time
    );
  },

  handleSaveBookmark: function(bookmark_id, label, time) {
    BookmarkActionCreator.saveBookmark(
      this.props.course_id, this.props.lecture_id, bookmark_id, label, time
    );
  },

  handleDeleteBookmark: function(bookmark_id) {
    BookmarkActionCreator.deleteBookmark(
      this.props.course_id, this.props.lecture_id, bookmark_id
    );
  },

  /*============================== @RENDERING ==============================*/

  render: function() {
    return (
      <div className='bookmarks-container'>
        <BookmarkList
          bookmarks={this.state.bookmarks}
          course_id={this.props.course_id}
          lecture_id={this.props.lecture_id}/>
        <BookmarkEditor onSubmit={this.handleSubmitBookmark}/>
      </div>
    );
  }

});

module.exports = BookmarksContainer;
