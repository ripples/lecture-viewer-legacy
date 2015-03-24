var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Login = React.createClass({
  getInitialState: function() {
    return {
      name: "",
      password: ""
    };
  },
  
  handlePasswordChange: function(evt) {
    this.setState({
      password: evt.target.value
      
    });
},
handleNameChange: function(evt) {
    this.setState({
      name: evt.target.value
      
    });
  },
  // handleLogin: function(evt) {
  //   //TODO
  // },
  render: function() {
    return( <div>
    	<input placeholder="name" value={this.state.name} onChange={this.handleNameChange} />
    <input placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} />
    <Link to="comment">Login</Link>
    </div>
    );
  }
});

module.exports = Login;