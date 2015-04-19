var React               = require('react');
var LectureList         = require('../lectures/LectureList');
var CourseList          = require('../courses/CourseList');
var Router              = require('react-router');

var NavigationSidebar = React.createClass({

  mixins: [Router.Navigation],

  getInitialState: function() {
    return {
      selectedCourse: null,
      viewingNotifications: false
    };
  },

  /*============================== @HANDLING ==============================*/

  handleLogout: function (e) {

    // TODO : Use a real Logout mechanism

    e.preventDefault();
    console.log("Logging out...");
    delete localStorage.token;
    this.transitionTo('login', null, {loggedOut: true});
  },

  handleNotificationsClick: function (e) {
    e.preventDefault();
  },

  handleCourseSelected: function (course) {
    this.setState({selectedCourse: course});
  },

  handleBack: function (course) {
    this.setState({selectedCourse: null});
  },

  /*============================== @RENDERING ==============================*/

  render: function() {

    // TODO : Render Notification Items if VIEWING_NOTIFICATION == TRUE

    return (
      <div className='navigation-sidebar'>
        {this.renderHeader()}
        {this.renderNavigationItems()}
        {this.renderFooter()}
      </div>
    );
  },

  renderHeader: function() {

    // TODO : Use real Logo

    return (
      <div className='navigation-sidebar__header'>
        <button className='notifications-button' onClick={this.handleNotificationsClick}>Notifications</button>
      </div>
    );
  },

  renderFooter: function() {

    // TODO : Link to the settings Route

    return (
      <div className='navigation-sidebar__footer'>
        <button className='logout-button' onClick={this.handleLogout}>Logout</button>
        <button className='settings-button'>Settings</button>
      </div>
    );
  },

  renderNavigationItems: function() {
    var list;
    if(this.state.selectedCourse) {
      list = <LectureList onBack={this.handleBack} course={this.state.selectedCourse}/>;
    } else {
      list = <CourseList onSelectCourse={this.handleCourseSelected}/>;
    }
    return (
      <div className='navigation-sidebar__content'>{list}</div>
    )
  },
});

module.exports = NavigationSidebar;
