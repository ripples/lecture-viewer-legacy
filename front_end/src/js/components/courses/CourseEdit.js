var React                 = require('react');
var CourseActionCreator   = require('../../actions/CourseActionCreator');
var Course = require('./Course');

var CourseEdit = React.createClass({

  displayName: 'CourseEdit',

  propTypes: {
    course:      React.PropTypes.shape({
      id:                   React.PropTypes.number.isRequired,
      department:           React.PropTypes.string.isRequired,
      department_shorthand: React.PropTypes.string.isRequired,
      course_name:          React.PropTypes.string.isRequired,
      course_number:        React.PropTypes.string.isRequired,
      description:          React.PropTypes.string.isRequired,
      section:              React.PropTypes.string.isRequired,
      term:                 React.PropTypes.string.isRequired,
      year:                 React.PropTypes.number.isRequired,
      instructor_id:        React.PropTypes.string.isRequired
    }).isRequired
  },

  getInitialState: function() {
  	return {
  		isEditingInfo: false,
  		isEditingRoster: false,
      isUploadingCsv: false
  	};
  },

  /*============================== @HANDLING ==============================*/

  handleEditInformationClick: function() {
		this.setState({isEditingInfo: true});
	},

	handleEditRosterClick: function() {
		this.setState({isEditingRoster: true});
	},

	handleSaveInformationClick: function() {
		this.setState({isEditingInfo: false});
	},

	handleSaveRosterClick: function() {
		this.setState({isEditingRoster: false});
	},

  handleUploadCsvClick: function() {
    this.setState({isUploadingCsv: !this.state.isUploadingCsv});
  },

  /*============================== @RENDERING ==============================*/

  render: function() {
    return (
      <div class='course_edit'>
        {this.renderCourseInfo()}
        {this.renderInfoEditButton()} <br/>
        {this.renderRosterEditButton()} <br/><br/>
      </div>
    )
  },

  renderCourseInfo : function(){
    var course = this.props.course;
    if (this.state.isEditingInfo){
      return <form>
              Department <input type="text" name="course__deparment" value={course.department}/> <br/>
              Number <input type="text" name="course__number" value={course.course_number}/>
              Section <input type="text" name="course__section" value={course.section}/> <br/>
              Term <input type="text" name="course__term" value={course.term}/>
              Year <input type="text" name="course__year" value={course.year}/> <br/>
              Description <br/> <textarea type="text" name="course__description" value={course.description}/> <br/>
            </form>;
    } else {
      return <Course course={course}/>;
    }
  },

  renderInfoEditButton: function(){
    if (this.state.isEditingInfo){
      return <button onClick={this.handleSaveInformationClick}> Save Information </button>;
    } else {
      return <button onClick={this.handleEditInformationClick}> Edit Information </button>;
    }
  },

  renderRosterEditButton: function() {
    if (this.state.isEditingRoster){
      return 	<div>
                {this.renderUploadCsvButton()} <br/>
                <button> Paste Email </button> <br/>
                <button onClick={this.handleSaveRosterClick}> Save Roster </button>
              </div>;
    } else {
      return <button onClick={this.handleEditRosterClick}> Edit Roster </button>;
    }
  },

  renderUploadCsvButton: function() {
    if (this.state.isUploadingCsv){
      return <span>
                <input type='file'/>
                <button onClick={this.handleUploadCsvClick}> Upload </button>
             </span>;
    } else {
      return <button onClick={this.handleUploadCsvClick}> Upload CSV File </button>;
    }
  }
});

module.exports = CourseEdit;
