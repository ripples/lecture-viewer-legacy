var React  = require('react');
var Router = require('react-router');
var CourseEdit = require('./CourseEdit');
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
		return {
			courses: courses
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
			return (
				<li key={i}>
					<CourseEdit course={course}/>
				</li>
			)
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
