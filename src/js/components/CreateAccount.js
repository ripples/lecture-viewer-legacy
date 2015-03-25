var React = require('react');
var Router = require('react-router');

var CreateAccount = React.createClass({

mixins: [Router.Navigation],

   contextTypes: {
    router: React.PropTypes.func
  }, 

	getInitialState: function() {
    return {
      name: "",
      password: "",
      passwordsMatch: false
    };
  },

handleNameChange: function(evt) {
    this.setState({
      name: evt.target.value
      
    });
  },

handlePasswordChange: function(evt) {
    this.setState({
      password: evt.target.value
      
    });
  },

handleCreateAccount: function(){
 this.transitionTo('login');
},
	render: function() {
    return( <div>
    	<input ref="name" placeholder="name" value={this.state.name} onChange={this.handleNameChange}/>
    <input ref="pass1" placeholder="password" value={this.state.password}  onChange={this.handlePasswordChange}/>
    <input ref="pass2" placeholder="retype password"  />
    <button onClick={this.handleCreateAccount}>Create</button>
    </div>
    );
  }

	});

module.exports = CreateAccount;