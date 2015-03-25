var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Login = React.createClass({

mixins: [Router.Navigation],

   contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      name: "",
      password: "",
      error: false
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

  handleCreate: function(evt){
    evt.preventDefault();
    this.transitionTo('createAccount');
  },

   handleLogin: function (evt) {
    console.log(localStorage.token);
    var self = this;
    evt.preventDefault();
    var nextPath = '/main';
    var name = this.refs.name.getDOMNode().value;
    var password = this.refs.pass.getDOMNode().value;
    auth.login(name, password, function (loggedIn) {
      if (!loggedIn){
        return this.setState({ error: true });}

      if (nextPath) {
        self.transitionTo(nextPath);
      } else {
        self.transitionTo('/main');
      }
    }.bind(this));
  },


  render: function() {
    return( <div>
    	<input ref="name" placeholder="name" value={this.state.name} onChange={this.handleNameChange} />
    <input ref="pass" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} />
    <button onClick={this.handleLogin}>Login</button>
    <button onClick={this.handleCreate}>Create Account</button>
    </div>
    );
  }

});
// Fake authentication lib

var auth = {
  login: function (name, password, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }

    pretendRequest(name, password, function (res) {
      if (res.authenticated) {
        localStorage.token = res.token;
        if (cb) cb(true);
        this.onChange(true);
      } else {
        if (cb) cb(false);
        this.onChange(false);
      }
    }.bind(this));
  },

  getToken: function () {
    return localStorage.token;
  },

  logout: function (cb) {
    delete localStorage.token;
    if (cb) cb();
    this.onChange(false);
  },

  loggedIn: function () {
    return !!localStorage.token;
  },
   onChange: function () {}
};
function pretendRequest(name, password, cb) {
  setTimeout(function () {
    if (name === 'name' && password === 'password') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      });
    } else {
      alert("incorrect name or password");
      cb({authenticated: false});
    }
  }, 0);
}

module.exports = Login;
