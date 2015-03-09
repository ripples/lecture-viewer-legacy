var React = require('react');

var LectureListItem = React.createClass({

  render: function() {

    var lecture = this.props.lecture;

    return (
      <div>
        {lecture.category} {lecture.ordinal}: {lecture.title}
        Uploaded {lecture.dateReleased} Duration {lecture.duration}
      </div>
    );
  }

});

module.exports = LectureListItem;
