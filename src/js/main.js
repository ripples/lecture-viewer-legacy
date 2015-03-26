var React                 = require('react');
var Login                 = require('./components/Login')
var CreateAccount         = require('./components/CreateAccount');
var LectureContextSidebar = require('./components/LectureContextSidebar');
var CourseList            = require('./components/courses/CourseList');
var LectureList           = require('./components/lectures/LectureList');
var ManageCourse          = require('./components/ManageCourse');
var Router                = require('react-router');

var DefaultRoute          = Router.DefaultRoute;
var Link                  = Router.Link;
var Route                 = Router.Route;
var RouteHandler          = Router.RouteHandler;


// TODO : Implement Routing
var App = React.createClass({

mixins: [Router.Navigation],

   contextTypes: {
    router: React.PropTypes.func
  },

  handleLogout: function (evt) {
console.log("logout");
this.transitionTo('logout');
},

  render: function () {
    return (
      <div>
      <button onClick={this.handleLogout}>Logout</button>
        <RouteHandler/>
      </div>
    );
  }
});

var CreateAccountRoute = React.createClass({
  render: function(){
    return <div><CreateAccount/></div>;
  }

});

var LogoutRoute = React.createClass({
  componentDidMount: function(){
    delete localStorage.token;
  },
  render: function () {
    console.log("logout 1");
    return <div><Login/><p>You are now logged out</p></div>;
  }
});

var MainRoute = React.createClass({
  render: function () {
    return (
      <div>
        <CourseList/>
        <LectureList course_id={1}/>
        <LectureContextSidebar course_id={1} lecture_id={1}/>
      </div>
    );
  }
});

var LoginRoute = React.createClass({
  mixins: [Router.Navigation],

   contextTypes: {
    router: React.PropTypes.func
  },
  componentDidMount: function(){
if(localStorage.token!=undefined)
      this.transitionTo("main");
  },
  render: function () {
    return <div><Login/></div>;
  },

});

var ManageCourseRoute = React.createClass({
  render: function () {
    return <div></div>;
  },
})

var routes = (
  <Route handler={App} path="/">
    <Route name="main" handler={MainRoute}/>
    <Route name="login" handler={LoginRoute}/>
    <Route name="logout" handler={LogoutRoute}/>
    <Route name="createAccount" handler={CreateAccountRoute}/>
    <DefaultRoute handler={LoginRoute} />

  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
