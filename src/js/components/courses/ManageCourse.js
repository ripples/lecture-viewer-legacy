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
		this.setState({isEditingInfo: true});
	},

	handleEditRosterClick: function(data) {
		this.setState({isEditingRoster: true});
	},

	handleSaveInformationClick: function(data) {
		this.setState({isEditingInfo: false});
	},

	handleSaveRosterClick: function(data) {
		this.setState({isEditingRoster: false});
	},

	/*============================== @RENDERING ==============================*/

	render: function() {
		if (this.state.isEditingRoster){
			var rosterEditButton = 	<div>
															<button> Upload CSV File </button>
															<button> Paste Email </button>
															<button onClick={this.handleSaveRosterClick}> Save Roster </button>
															</div>;
		} else {
			var rosterEditButton = <button onClick={this.handleEditRosterClick}> Edit Roster </button>;
		}

		if (this.state.isEditingInfo){
			var infoEditButton = <button onClick={this.handleSaveInformationClick} type="submit"> Save Information </button>;
			var courses = this.state.courses.map(function(course, i) {
				return (
					<li key={i}>
						<form>
							<input type="text" name="course__deparment" value={course.department}/> <br/>
							<input type="text" name="course__number" value={course.course_number}/>
							<input type="text" name="course__section" value={course.section}/> <br/>
							<input type="text" name="course__term" value={course.term}/>
							<input type="text" name="course__year" value={course.year}/> <br/>
							<textarea type="text" name="course__description" value={course.description}/> <br/>
							{infoEditButton} <br/>
						</form>
						{rosterEditButton}
					</li>
				)
			});
		} else {
			var infoEditButton = <button onClick={this.handleEditInformationClick}> Edit Information </button>;
			var courses = this.state.courses.map(function(course, i) {
				return (
					<li key={i}>
						<Course course={course}/>
						{infoEditButton} <br/>
						{rosterEditButton}
					</li>
				)
			});
		}

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
