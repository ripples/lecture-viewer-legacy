var React  = require('react');
var Router = require('react-router');
var Course = require('./Course');
var CreateStoreMixin     = require('../../mixins/CreateStoreMixin');
var CourseStore = require('../../stores/CourseStore');
var CourseActionCreator  = require('../../actions/CourseActionCreator');

var ManageCourse = React.createClass({

	displayName: 'ManageCourse',

	mixins: [CreateStoreMixin([CourseStore])],

	getInitialState: function() {
		return {
			isEditingInfo: false,
			isEditingRoster: false
		};
	},

	/*============================== @LIFECYCLE ==============================*/

	componentDidMount: function() {
		this.contextDidChange(this.props);
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState(this.getStateFromStores(nextProps));
		this.contextDidChange(nextProps);
	},

	getStateFromStores: function(props) {
		var courses = CourseStore.getCourses();
		return { courses: courses };
	},

	contextDidChange: function(props) {
		CourseActionCreator.requestCourses();
	},

	/*============================== @HANDLING ==============================*/

	handleEditInformationClick: function(data) {
		this.state.isEditingInfo = true;
	},

	handleEditRosterClick: function(data) {
		this.state.isEditingRoster = true;
	},

	/*============================== @RENDERING ==============================*/

	render: function() {
		if (this.state.isEditingInfo){
			var infoEditButton = <button onClick={this.handleSaveInformationClick}> Save Information </button>;
		} else {
			var infoEditButton = <button onClick={this.handleEditInformationClick}> Edit Information </button>;
		}

		if (this.state.isEditingRoster){
			var rosterEditButton = <button onClick={this.handleSaveRosterClick}> Save Roster </button>;
		} else {
			var rosterEditButton = <button onClick={this.handleEditRosterClick}> Edit Roster </button>;
		}

		var courses = this.state.courses.map(function(course, i) {
      return (
        <li key={i}>
          <Course course={course}/>
					{infoEditButton}
					{rosterEditButton}
        </li>
      )
    });

    return (
      <div className='manage-course'>
        <h1>Courses</h1>
        <ul>
          {courses}
        </ul>
      </div>
    );
	}
});

module.exports = ManageCourse;
