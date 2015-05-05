var React               = require('react');
var NavigationSidebar   = require('./structure/NavigationSidebar');
var LectureContext      = require('./structure/LectureContext');
var RouteHandler        = require('react-router').RouteHandler;

var Main = React.createClass({

  getInitialState: function() {
    return {
      course_id: -1,
      lecture_id: -1,
      time: -1,
      shouldPauseLecture: false
    };
  },

  /*============================== @HANDLING ==============================*/

  handleViewLecture: function(lectureDetails) {
    this.setState(lectureDetails);
  },

  // TODO : May only need a 'viewModal' handler.
  handleToggleModal: function(isDisplayingModal) {
    this.setState({shouldPauseLecture: isDisplayingModal});
  },

  /*============================== @RENDERING ==============================*/

  render: function () {
    return (
      <div className='app-container'>
        <NavigationSidebar/>
        <LectureContext {...this.state}/>
        <RouteHandler onWatch={this.handleViewLecture} onToggleModal={this.handleToggleModal} {...this.props}/>
      </div>
    );
  }
});

module.exports = Main;
