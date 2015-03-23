var React                 = require('react');
// var BookmarkList          = require('./BookmarkList');
// var BookmarkEditor        = require('./BookmarkEditor');
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

    handleSubmitBookmark: function(content, isAnonymous) {
      BookmarkActionCreator.createBookmark(
        this.props.course_id, this.props.lecture_id
      );
    },

  /*============================== @RENDERING ==============================*/

  // <BookmarkList bookmarks={this.state.bookmarks}/>
  // <BookmarkEditor onSubmit={this.handleSubmitBookmark}/>

  render: function() {
    return (
      <div className='bookmarks-container'>

      </div>
    );
  }

});

module.exports = BookmarksContainer;
