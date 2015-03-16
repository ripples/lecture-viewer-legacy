var React                 = require('react');
var Bookmark              = require('./Bookmark');
var CreateStoreMixin      = require('../mixins/CreateStoreMixin');
var BookmarkStore         = require('../stores/BookmarkStore');
var BookmarkActionCreator = require('../actions/BookmarkActionCreator');

/**
  Holds a list of Bookmarks for a specific lecture. When a user Bookmarks on a
  lecture, it should appear in this list.
**/

var BookmarkList = React.createClass({

  propTypes: {
    lectureId: React.PropTypes.number.isRequired
  },

  mixins: [CreateStoreMixin([BookmarkStore])],

  getStateFromStores: function(props) {
    // var lectureID = this.parseLecture(props); // TODO : For use with ROUTER
    var lectureId = props.lectureId;
    var bookmarks = BookmarkStore.getBookmarksForLecture(lectureId);
    return {
      bookmarks: bookmarks
    };
  },

  componentDidMount: function() {
    this.lectureDidChange(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    // if (this.parseLecture(nextProps) !== this.parseLecture(this.props)) {
      // this.setState(this.getStateFromStores(nextProps));
      this.lectureDidChange(nextProps);
    // }
  },

  lectureDidChange: function(props) {
    // var lectureID = this.parseCourse(props);  // TODO : For use with ROUTER
    var lectureId = props.lectureId;
    BookmarkActionCreator.requestBookmarksForLecture(lectureId);
  },

  render: function() {
    var bookmarks = this.state.bookmarks;
    var bookmarkListItems = bookmarks.map(function(bookmark, i) {
      return (
        <li key={i}>
          <Bookmark bookmarkId={bookmark.id} label={bookmark.label} time={bookmark.time}/>
        </li>
      );
    });

    return (
      <div className='bookmark-list'>
        <ol>
          {bookmarkListItems}
        </ol>
      </div>
    );
  }

});

module.exports = BookmarkList;
