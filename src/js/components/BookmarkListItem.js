var React = require('react');
var BookmarkListItem = React.createClass({

  render: function() {

    var bookmark = this.props.bookmark;

    // For use with ReactRouter
    // <Link to='view' params={{lecture: bookmark.lectureID, timestamp: bookmark.timestamp}}>
    //   {bookmark.label}
    // </Link>

    return (
      <div>
        <a href="google.com">
          {bookmark.label}
        </a>
      </div>
    );
  }

});

module.exports = BookmarkListItem;
