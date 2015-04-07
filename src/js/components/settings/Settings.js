var React  = require('react');
var Router = require('react-router');


var Settings = React.createClass({

	displayName: 'Settings',


propTypes: {
    user_id: React.PropTypes.number.isRequired,
    user_email: React.PropTypes.string.isRequired,
    user_password: React.PropTypes.number.isRequired,
    user_first_name: React.PropTypes.string.isRequired,
    user_last_name: React.PropTypes.string.isRequired
  },

  /*============================== @LIFECYCLE ==============================*/



  /*============================== @HANDLING ==============================*/

  handleUpdate: function(e){
    //TODO
  },


  /*============================== @RENDERING ==============================*/
  render: function() {
    return(
      <div>
       <input ref="first_name" placeholder="New first name" />
        <input ref="last_name" placeholder="New last name" /><br />
      	<input ref="email" placeholder="New email" />
        <input type="password" ref="pass1" placeholder="Old password"/>
        <input type="password" ref="pass2" placeholder="New password" />
        <input type="password" ref="pass3" placeholder="Retype password" /><br />
        <button onClick={this.handleUpdate}>Update</button>
      </div>
    );
  }

});

module.exports = Settings;