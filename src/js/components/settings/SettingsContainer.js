var React  = require('react');
var Router = require('react-router');
var Settings = require('./Settings');

var SettingsContainer = React.createClass({

	displayName: 'SettingsContainer',


  /*============================== @LIFECYCLE ==============================*/
 

  /*============================== @HANDLING ==============================*/

  handleUpdate: function(e){
    //TODO
  },


  /*============================== @RENDERING ==============================*/
  render: function() {
    return(
      <div>
       <Settings
          user_first_name={"User first name"}
          user_last_name={"User last name"}
          user_email={"email@email.com"}
          user_password={"123"}
          user_id={"12345678"}/>
      </div>
    );
  }

});

module.exports = SettingsContainer;