var React = require('react');
var LectureListItem = require('./LectureListItem');

var LectureList = React.createClass({

  render: function() {

    var replies = this.props.notifications;
    var lectures = this.props.lectures.map(function(lecture) {
      return <li><LectureListItem lecture={lecture} replies={replies[lecture.id]}/></li>;
    });

    return (
      <div>
        <h1>Lectures</h1>
        <ul>{lectures}</ul>
      </div>
    )
  }

});

module.exports = LectureList;
