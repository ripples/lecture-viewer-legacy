var React  = require('react');
var Router = require('react-router');
var Course = require('./courses/Course');

var ManageCourse = React.createClass({
	
	propTypes: {
    course_id: React.PropTypes.number.isRequired,
    students: React.PropTypes.array.isRequired
  },
  
	render: function() {
		return (
			<div id='manage-course'>
        
      </div>
		);
	}
});