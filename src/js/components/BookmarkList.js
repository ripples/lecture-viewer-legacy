var React = require('react');
var BookmarkListItem = require('./BookmarkListItem');

var BookmarkList = React.createClass({

  render: function() {

    var bookmarks = this.props.bookmarks.map(function(bookmark) {
      return <li><BookmarkListItem bookmark={bookmark}/></li>;
    });

    return (
      <div id='bookmarks-list'>
        <h1>Bookmarks</h1>
        <ul>{bookmarks}</ul>
      </div>
    )
  }
});

module.exports = BookmarkList;
