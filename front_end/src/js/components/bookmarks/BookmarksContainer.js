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

  getInitialState: function() { return {isAdding: false}; },

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

  handleSubmitBookmark: function(content, time) {
    BookmarkActionCreator.createBookmark(
      this.props.course_id, this.props.lecture_id, content, time
    );
    this.setState(this.getInitialState());
  },

  handleCancelAddBookmark: function() {
    this.setState(this.getInitialState());
  },

  handleAddClick: function() {
    this.setState({isAdding: !this.state.isAdding});
  },

  /*============================== @RENDERING ==============================*/

  render: function() {
    return (
      <div className='bookmarks-container'>
        <BookmarkList
          bookmarks={this.state.bookmarks}
          course_id={this.props.course_id}
          lecture_id={this.props.lecture_id}/>
        {this.renderAddButtonOrEditor()}
      </div>
    );
  },

  renderAddButtonOrEditor: function() {
    return (
      this.state.isAdding ?
      <BookmarkEditor
        onSubmit={this.handleSubmitBookmark}
        onCancel={this.handleCancelAddBookmark}/> :
      <button className='bookmark__add-button' onClick={this.handleAddClick}>
        Add Bookmark
      </button>
    );
  }
});

module.exports = BookmarksContainer;
