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
      email: "",
      password: "",
      error: false
    };
  },

  handlePasswordChange: function(evt) {
    this.setState({
      password: evt.target.value

    });
},
handleEmailChange: function(evt) {
    this.setState({
      email: evt.target.value

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
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.pass.getDOMNode().value;
    auth.login(email, password, function (loggedIn) {
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
    	<input ref="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
    <input type="password" ref="pass" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
    <button onClick={this.handleLogin}>Login</button>
    <button onClick={this.handleCreate}>Create Account</button>
    </div>
    );
  }

});
// Fake authentication lib

var auth = {
  login: function (email, password, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }

    pretendRequest(email, password, function (res) {
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
function pretendRequest(email, password, cb) {
  setTimeout(function () {
    var localLength = localStorage.length;
    for(var i=0;i<localLength;i++){
      console.log("key, value: "+localStorage.key(i)+localStorage.getItem(localStorage.key(i)));
    if ((email!="" && email === localStorage.key(i)) && password === localStorage.getItem(localStorage.key(i))) {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      });
      return;
    }} if(!cb.authenticated) {
      alert("Incorrect email or password");
      cb({authenticated: false});
    }
  }, 0);
}

module.exports = Login;
