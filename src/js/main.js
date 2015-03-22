var React = require('react');
var LectureContextSidebar = require('./components/LectureContextSidebar');

// TODO : Implement Routing
React.render(
  <div>
    <LectureContextSidebar course_id={1} lecture_id={1}/>
  </div>, document.getElementById('app'));
