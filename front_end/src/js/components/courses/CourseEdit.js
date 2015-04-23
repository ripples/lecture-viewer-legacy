var React                 = require('react');
var CourseActionCreator   = require('../../actions/CourseActionCreator');
var CourseStore           = require('../../stores/CourseStore');

var Modal                 = require('react-bootstrap').Modal;
var ModalTrigger          = require('react-bootstrap').ModalTrigger;
var Button                = require('react-bootstrap').Button;
var Input                 = require('react-bootstrap').Input;
var Col                   = require('react-bootstrap').Col;
var Row                   = require('react-bootstrap').Row;
var OverlayMixin          = require('react-bootstrap').OverlayMixin;

var CourseEdit = React.createClass({

  displayName: 'CourseEdit',

  mixins: [OverlayMixin],

  propTypes : {
    course_id:  React.PropTypes.number.isRequired
  },

  getDefaultProps : function() {
    return {
      course_id: 1
    };
  },

  getInitialState: function() {
  	return {
      isModalOpen: false,
  		isEditingInfo: false,
  		isEditingRoster: false,
      isUploadingCsv: false
  	};
  },

  /*============================== @LIFECYCLE ==============================*/

  componentDidMount : function() {
    this.contextDidChange(this.props);
  },

  componentWillReceiveProps : function(nextProps) {
    this.setState(this.getStateFromStores(nextProps));
    this.contextDidChange(nextProps);
  },

  getStateFromStores : function(props) {
    var course = CourseStore.getCourse(props.course_id);
    if(!course || course == null) {
      lecture = {
        id: null,
        department: null,
        course_name: null,
        course_number: null,
        section: null,
        term: null,
        year: null,
        description: null,
        instructor_id: null
      }
    }
    return { course: course };
  },

  contextDidChange : function(props) {
    CourseActionCreator.requestCourse(props.course_id);
  },

  /*============================== @HANDLING ==============================*/
  handleToggle: function() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  handleUploadCsvClick: function() {
    this.setState({isUploadingCsv: !this.state.isUploadingCsv});
  },

  handleChange: function(attribute, event) {
    event.preventDefault();
    var course = this.state.course;
    course[attribute] = event.target.value;
    this.setState({course: course});
  },

  handleSaveInformation: function() {
    CourseActionCreator.saveCourse(this.props.course_id, this.state.course);
  },

  /*============================== @RENDERING ==============================*/

  render: function() {
    return (
      <a onClick={this.handleToggle}>Edit</a>
    )
  },

  renderOverlay: function() {
    if (!this.state.isModalOpen) {
      return <span/>;
    }

    var course = this.state.course;

    return (
      <Modal title='Course Edit' onRequestHide={this.handleToggle}>
        <div className='modal-body'>
          <form>
            <Row>
              <Col md={6}>
                <Input type='text' label='Department' name="course__department" value={course.department} onChange={this.handleChange.bind(this, 'department')}/>
              </Col>
              <Col md={3}>
                <Input type='text' label='Number' name="course__number" value={course.course_number} onChange={this.handleChange.bind(this, 'course_number')} />
              </Col>
              <Col md={3}>
                <Input type='text' label='Section' name="course__section" value={course.section} onChange={this.handleChange.bind(this, 'section')} />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Input type='text' label='Course Name' name="course__name" value={course.course_name} onChange={this.handleChange.bind(this, 'course_name')} />
              </Col>
              <Col md={3}>
                <Input type='text' label='Term' name="course__term" value={course.term} onChange={this.handleChange.bind(this, 'term')} />
              </Col>
              <Col md={3}>
                <Input type='text' label='Year' name="course__year" value={course.year} onChange={this.handleChange.bind(this, 'year')} />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Input type='text' label='Instructor' name="course__instructor" value={course.instructor_id} onChange={this.handleChange.bind(this, 'instructor_id')} />
              </Col>
            </Row>
            <Input type='textarea' label='Description' name="course__description" value={course.description} onChange={this.handleChange.bind(this, 'description')} />
          </form>
          {this.renderUploadCsvButton()} <br/>
        </div>
        <div className='modal-footer'>
          <Button bsStyle='primary' onClick={this.handleSaveInformation}>Save changes</Button>
          <Button onClick={this.handleToggle}>Close</Button>
        </div>
      </Modal>
    );
  },

  renderUploadCsvButton: function() {
    if (this.state.isUploadingCsv){
      return <span>
                <Input type='file' label='File'/>
                <Button onClick={this.handleUploadCsvClick}> Upload </Button>
             </span>;
    } else {
      return <Button onClick={this.handleUploadCsvClick}> Upload Roster by CSV File </Button>;
    }
  }
});

module.exports = CourseEdit;
