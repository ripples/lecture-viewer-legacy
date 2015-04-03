var React                 = require('react');
var LectureActionCreator  = require('../../actions/LectureActionCreator');
var moment                = require('moment');
var pluralize             = require('pluralize');
var Router                = require('react-router');
var Link                  = Router.Link

var Lecture = React.createClass({

  displayName: 'Lecture',

  propTypes: {
    lecture: React.PropTypes.shape({
      id:           React.PropTypes.number.isRequired,
      ordindal:     React.PropTypes.number.isRequired,
      type:         React.PropTypes.string.isRequired,
      title:        React.PropTypes.string.isRequired,
      description:  React.PropTypes.string.isRequired,
      time_posted:  React.PropTypes.number.isRequired,
      time_length:  React.PropTypes.number.isRequired,
      thumbnail:    React.PropTypes.string.isRequired,
    }).isRequired
  },

  getInitialState: function() {
    return {
      descriptionVisible: false
    };
  },

  /*============================== @HANDLING ==============================*/

  handleToggleDescriptionClick: function() {
    this.setState({descriptionVisible: !this.state.descriptionVisible});
  },

  handleLectureClick: function() {
    // TODO : Handle any changes aside from changing the lecture context
  },

  /*============================== @FORMATTING ==============================*/

  getFormattedIdentifier: function() {
    return  this.props.lecture.type + ' ' +
            this.props.lecture.ordindal;
  },

  getFormattedDatePosted: function() {
    return 'Uploaded ' + moment(this.props.lecture.time_posted).fromNow();
  },

  getFormattedTimeLength: function() {
    // TODO : Convert time in milliseconds to minutes
    var timeInMinutes = this.props.lecture.time_length;
    return timeInMinutes + ' ' + pluralize('minute', timeInMinutes);
  },

  /*============================== @RENDERING ==============================*/

  render: function() {

    var linkParams = {
      course_id: this.props.course_id,
      lecture_id: this.props.lecture.id
    }

    // TODO : Modify LINK to route to view-lecture/...
    return (
      <div className='lecture' onClick={this.handleLectureClick}>
        <h3 className='lecture__identifier'>{this.getFormattedIdentifier()}</h3>
        <h3 className='lecture__date'>{this.getFormattedDatePosted()}</h3>
        <h2 className='lecture__name'>
          <Link to="main" params={linkParams}>
            {this.props.lecture.title}
          </Link>
        </h2>
        {this.renderToggleDescriptionButton()}
        {this.renderDescription()}
        <h3 className='lecture__time'>{this.getFormattedTimeLength()}</h3>
      </div>
    );
  },

  renderToggleDescriptionButton: function() {
    var className = (this.state.descriptionVisible) ?
      'lecture__toggle-description-button open' :
      'lecture__toggle-description-button closed';
    var toggleDescriptionButton =
      <button className={className} onClick={this.handleToggleDescriptionClick}>
        Toggle Description
      </button>;
    return toggleDescriptionButton;
  },

  renderDescription: function() {
    var descriptionStyle = (this.state.descriptionVisible) ?
      'lecture__description show' :
      'lecture__description hide';
    return <p className={descriptionStyle}>
      {this.props.lecture.description}
    </p>
  },
});

module.exports = Lecture;
