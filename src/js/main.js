var React = require('react');
var LectureContextSidebar = require('./components/LectureContextSidebar');
var Login = require('./components/Login')
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

// TODO : Implement Routing
var App = React.createClass({
  render: function () {
    return (
      <div>
      
        <RouteHandler/>
      </div>
    );
  }
});


var CommentRoute = React.createClass({
  render: function () {
  	console.log("comment");
    return <div><LectureContextSidebar course_id={1} lecture_id={1}/></div>;
  }
});

var LoginRoute = React.createClass({
  render: function () {
  	console.log("login");
    return <div><Login/></div>;
  }
});


var routes = (
  <Route handler={App} path="/">
    <Route name="comment" handler={CommentRoute}/>
    <Route name="login" handler={LoginRoute}/>
    <DefaultRoute handler={LoginRoute} />
  
  </Route>
);

Router.run(routes, function (Handler) {
	console.log("initial");
  React.render(<Handler/>, document.getElementById('app'));
});

// React.render(
//   <div>
//     <LectureContextSidebar course_id={1} lecture_id={1}/>
//   </div>, document.getElementById('app'));