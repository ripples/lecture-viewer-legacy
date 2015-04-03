var React  = require('react');
var Router = require('react-router');
var Course = require('./Course');
var CreateStoreMixin     = require('../../mixins/CreateStoreMixin');
var CourseStore = require('../../stores/CourseStore');
var CourseActionCreator  = require('../../actions/CourseActionCreator');

var ManageCourse = React.createClass({

	displayName: 'ManageCourse',

	mixins: [CreateStoreMixin([CourseStore])],

	// getInitialState: function() {
	// 	return {
	// 		isEditingInfo: false,
	// 		isEditingRoster: false
	// 	};
	// },

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
		var isEditingInfo = [];
		var isEditingRoster = [];
		for (var i=0; i<courses.length; i++){
			isEditingInfo.push(false);
			isEditingRoster.push(false);
		}
		return {
			courses: courses,
		 	isEditingInfo: isEditingInfo,
			isEditingRoster: isEditingRoster
		};
	},

	contextDidChange: function(props) {
		CourseActionCreator.requestCourses();
	},

	/*============================== @HANDLING ==============================*/

	handleEditInformationClick: function(i) {
		var isEditingInfo = this.state.isEditingInfo;
		isEditingInfo[i] = true;
		this.setState({isEditingInfo: isEditingInfo});
	},

	handleEditRosterClick: function(i) {
		var isEditingRoster = this.state.isEditingRoster;
		isEditingRoster[i] = true;
		this.setState({isEditingRoster: isEditingRoster});
	},

	handleSaveInformationClick: function(i) {
		var isEditingInfo = this.state.isEditingInfo;
		isEditingInfo[i] = false;
		this.setState({isEditingInfo: isEditingInfo});
	},

	handleSaveRosterClick: function(i) {
		var isEditingRoster = this.state.isEditingRoster;
		isEditingRoster[i] = false;
		this.setState({isEditingRoster: isEditingRoster});
	},

	/*============================== @RENDERING ==============================*/

	render: function() {
		var courses = this.state.courses.map(function(course, i) {
			var rosterEditButton;
			if (this.state.isEditingRoster[i]){
				rosterEditButton = 	<div>
																<button> Upload CSV File </button>
																<button> Paste Email </button>
																<button onClick={this.handleSaveRosterClick.bind(this, i)}> Save Roster </button>
														</div>;
			} else {
				rosterEditButton = <button onClick={this.handleEditRosterClick.bind(this, i)}> Edit Roster </button>;
			}

			if (this.state.isEditingInfo[i]){
				return (
					<li key={i}>
						Department <input type="text" name="course__deparment" value={course.department}/> <br/>
						Number <input type="text" name="course__number" value={course.course_number}/>
						Section <input type="text" name="course__section" value={course.section}/> <br/>
						Term <input type="text" name="course__term" value={course.term}/>
						Year <input type="text" name="course__year" value={course.year}/> <br/>
						Description <br/> <textarea type="text" name="course__description" value={course.description}/> <br/>
						<button onClick={this.handleSaveInformationClick.bind(this, i)}> Save Information </button> <br/>
						{rosterEditButton}
					</li>
				)
			} else {
				return (
					<li key={i}>
						<Course course={course}/>
						<button onClick={this.handleEditInformationClick.bind(this, i)}> Edit Information </button> <br/>
						{rosterEditButton}
					</li>
				)
			}
		}, this);

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
