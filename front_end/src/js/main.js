var React               = require('react');
var Router              = require('react-router');
var RouteHandler        = Router.RouteHandler;
var DefaultRoute        = Router.DefaultRoute;
var Route               = Router.Route;

var Login               = require('./components/landing/Login')
var Signup              = require('./components/landing/CreateAccount');
var ForgotPassword      = require('./components/landing/ForgotPassword');
var Main                = require('./components/Main');
var Watch               = require('./components/lectures/Watch');
var ManageCourse        = require('./components/courses/CourseEdit');
var ManageLecture       = require('./components/lectures/ManageLecture');
var Settings            = require('./components/settings/SettingsContainer');

var App = React.createClass({
  render: function () {return <RouteHandler {...this.props}/>}
});


// I would like to see this structure below, but the react-router component doesn't offer a simple solution--would require parsing.
// LOGIN               https://lectureviewer.com/login
// SIGNUP              https://lectureviewer.com/signup
// FORGOT_PASSWORD     https://lectureviewer.com/forgot-password
// MAIN                https://lectureviewer.com/m
// CREATE_COURSE       https://lectureviewer.com/m/create-course
// MANAGE_COURSE       https://lectureviewer.com/m/manage-course--c15
// CREATE_LECTURE      (Lectures are created on the capturing system... Would like to upload screencasts in the future)
// MANAGE_LECTURE      https://lectureviewer.com/m/manage-lecture--c15-l23
// WATCH_LECTURE       https://lectureviewer.com/m/watch/c15-l23#time=0m0s
// SETTINGS            https://lectureviewer.com/m/settings

// Any instances of '*' can be accessed in the handling component by this.props.params.splat.
// Multiple '*' operators means that this.props.params.splat will return an array of the values in order.
var routes = (
  <Route name="ROOT"                path="/"                                      handler={App}>
    <Route name="LOGIN"               path="login"                                  handler={Login}/>
    <Route name="SIGNUP"              path="signup"                                 handler={Signup}/>
    <Route name="FORGOT_PASSWORD"     path="forgot-password"                        handler={ForgotPassword}/>
    <Route name="MAIN"                path="m"                                      handler={Main}>
      <Route name="WATCH_LECTURE"       path="watch/:course_id/:lecture_id"         handler={Watch}/>
      <Route name="CREATE_COURSE"       path="create-course"                          handler={ManageCourse}/>
      <Route name="MANAGE_COURSE"       path="manage-course/:course_id"               handler={ManageCourse}/>
      <Route name="MANAGE_LECTURE"      path="manage-lecture/:course_id/:lecture_id"  handler={ManageLecture}/>
      <Route name="SETTINGS"            path="settings"                               handler={Settings}/>
    </Route>
    <DefaultRoute handler={Login}/>
  </Route>
);

/*============================== @RENDERING ==============================*/

// This runs the React-Router with the defined routes.  Any time a route changes, the anonymous function is called with
// the appropriate component (Handler) specified in the routes, rendering that component into the 'app' element within the HTML.

Router.run(routes, function (Handler, state) {
  React.render(<Handler params={state.params}/>, document.getElementById('app'))
});
