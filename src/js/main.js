var React = require('react');
var CoursePage = require('./pages/CoursePage');
var CommentList = require('./components/CommentList');

// TODO : Implement Routing

React.render(
  <div>
    <CommentList lectureId={1}/>
  </div>, document.getElementById('app'));
