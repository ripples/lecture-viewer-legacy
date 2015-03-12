var React = require('react');
var CoursePage = require('./pages/CoursePage');
var CommentList = require('./components/CommentList');
var CommentEditor = require('./components/CommentEditor');

// TODO : Implement Routing

React.render(
  <div>
    <CommentList lectureId={1}/>
    <CommentEditor lectureId={1}/>
  </div>, document.getElementById('app'));
