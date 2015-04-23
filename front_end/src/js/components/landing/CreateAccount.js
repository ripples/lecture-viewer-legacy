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
      <div className="create-account">
        <link href='http://fonts.googleapis.com/css?family=Slabo+27px|Roboto|Arvo' rel='stylesheet' type='text/css'/>
        <div id="create-form">
          <button id="create-form__login" onClick={this.handleLogin}>Login</button>
          <h1 id="create-form__title">Create your account:</h1><br/>
          <input id="create-form__first" ref="first_name" placeholder="First name" />
          <input id="create-form__last" placeholder="Last name" /><br />
          <input id="create-form__email" ref="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}/>
          <input id="create-form__password1" type="password" ref="pass1" placeholder="Password" value={this.state.password}  onChange={this.handlePasswordChange}/>
          <input id="create-form__password2" type="password" ref="pass2" placeholder="Retype password"  /><br />
          <button id="create-form__create" onClick={this.handleCreateAccount}>Create</button>
        </div>
      </div>
    );
  }
});

module.exports = CreateAccount;
