var React  = require('react');
var Router = require('react-router');

var CreateAccount = React.createClass({

  mixins: [Router.Navigation],

	getInitialState: function() {
    return {
      email: "",
      password: "",
      passwordsMatch: false
    };
  },

  /*============================== @HANDLING ==============================*/

  handleEmailChange: function(e) {
    this.setState({
      email: e.target.value
    });
  },

  handlePasswordChange: function(e) {
    this.setState({
      password: e.target.value
    });
  },

  handleCreateAccount: function(){
    if(this.state.password != this.refs.pass2.getDOMNode().value){
      alert("passwords do not match");
    }
    else{
      localStorage.setItem(this.state.email,this.state.password);
      this.transitionTo('login');
    }
  },

  handleLogin: function(e){
    e.preventDefault();
    this.transitionTo('login');
  },

  /*============================== @RENDERING ==============================*/

	render: function() {
    return(
      <div>
        <input ref="first_name" placeholder="First name" />
        <input ref="last_name" placeholder="Last name" /><br />
      	<input ref="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}/>
        <input type="password" ref="pass1" placeholder="Password" value={this.state.password}  onChange={this.handlePasswordChange}/>
        <input type="password" ref="pass2" placeholder="Retype password"  /><br />
        <button onClick={this.handleCreateAccount}>Create</button>
        <span>Have an account?</span><button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
});

module.exports = CreateAccount;
