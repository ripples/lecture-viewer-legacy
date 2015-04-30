var React               = require('react');
var LectureList         = require('../lectures/LectureList');
var CourseList          = require('../courses/CourseList');
var Router              = require('react-router');
var Link                = Router.Link;

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
    delete localStorage.token;
    this.transitionTo('LOGIN', null, {loggedOut: true});
  },

  handleNotificationsClick: function (e) {
    e.preventDefault();
  },

  handleSettingsClick: function (e) {
    e.preventDefault();
    this.transitionTo('SETTINGS');
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
    // TODO : Good place to include a logo
    return (
      <div className='navigation-sidebar__header'>
        <button className='notifications-button' onClick={this.handleNotificationsClick}>Notifications</button>
      </div>
    );
  },

  renderFooter: function() {
    return (
      <div className='navigation-sidebar__footer'>
        <button className='logout-button' onClick={this.handleLogout}>Logout</button>
        <button className='settings-button' onClick={this.handleSettingsClick}>Settings</button>
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
