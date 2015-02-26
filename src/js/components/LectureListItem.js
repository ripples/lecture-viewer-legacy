var React = require('react');
var RepliesDropDown = require('./RepliesDropDown');

var LectureListItem = React.createClass({

  hasReplies: function() {
    return this.props.replies;
  },

  render: function() {

    var repliesDropDown = this.hasReplies() ? <RepliesDropDown replies={this.props.replies}/> : '';
    var lecture = this.props.lecture;

    return (
      <div>
        {lecture.category} {lecture.ordinal}: {lecture.title}
        Uploaded {lecture.dateReleased} Duration {lecture.duration} 
        {repliesDropDown}
      </div>
    );
  }

});

module.exports = LectureListItem;
