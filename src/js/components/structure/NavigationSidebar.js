var React         = require('react');
var CourseList    = require('../courses/CourseList');
var LectureList   = require('../lectures/LectureList');
var Router        = require('react-router');

var NavigationSidebar = React.createClass({

  mixins: [Router.Navigation],

  /*============================== @HANDLING ==============================*/

  handleLogout: function (e) {
    e.preventDefault();
    console.log("Logging out...");
    delete localStorage.token;
    this.transitionTo('login', null, {loggedOut: true});
  },

  // TODO : Maintain the currently selected course_id

  /*============================== @RENDERING ==============================*/

  render: function() {
    return (
      <div className='navigation-sidebar'>
        <button onClick={this.handleLogout}>Logout</button>
        <CourseList/>
        <LectureList course_id={1}/>
      </div>
    );
  }
});

module.exports = NavigationSidebar;
