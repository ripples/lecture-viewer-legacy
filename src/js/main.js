var React               = require('react');
var Login               = require('./components/landing/Login')
var CreateAccount       = require('./components/landing/CreateAccount');
var NavigationSidebar   = require('./components/structure/NavigationSidebar');
var LectureContext      = require('./components/structure/LectureContext');
var ManageCourse        = require('./components/courses/ManageCourse');
var ManageLecture       = require('./components/lectures/ManageLecture');
var Settings            = require('./components/settings/Settings');

var Router              = require('react-router');
var DefaultRoute        = Router.DefaultRoute;
var Route               = Router.Route;
var RouteHandler        = Router.RouteHandler;

var App = React.createClass({
  render: function () { return <div><RouteHandler/></div>; }
});

var Main = React.createClass({
  render: function () {
    return (
      <div>
        <NavigationSidebar/>
        <LectureContext course_id={1} lecture_id={1}/>
      </div>
    );
  }
});

var routes = (
  <Route handler={App} path="/">
    <Route name="main" handler={Main}/>
    <Route name="login" handler={Login}/>
    <Route name="CreateAccount" handler={CreateAccount}/>
    <Route name="ManageCourse" handler={ManageCourse} />
    <Route name="ManageLecture" handler={ManageLecture}/>
    <Route name="Settings" handler={Settings}/>
    <DefaultRoute handler={Login}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
