var React   = require('react');
var Actions = require('../actions/LectureActionCreator');

var ComponentName = React.createClass({

    // Used for debugging--set it to something resembling the component name
    displayName : 'ComponentName',

    // Specify optional or required props that the component will look for
    propTypes: {},

    // Allows you to include multiple reusable modules that may call
    // particular lifecycle methods among other helper methods
    mixins : [],

    // When the component is inserted as a child of a DOM node, this
    // function is called to set up the appropriate initial state
    getInitialState : function() {
        return { /*** State dictionary properties go here ***/ }
    },

    // Before the component is mounted as a child to a DOM node, this
    // function is called, allowing you to perform any necessary setup.
    componentWillMount : function() {},

    // Called when the component is about to be removed from the DOM
    // Provide any teardown logic hear
    componentWillUnmount : function() {},

    /*** Place any helper methods here ***/

    // If you need to handle a user interaction, call an Action and pass
    // it the appropriate data as a parameter

    // This is called every time the state changes and is responsible for
    // returning HTML that will be displayed to the user
    render : function() {

        // EXAMPLE: Access Component properties and methods using {} syntax
        //          You must wrap the html in a containing element, as
        //          adjacent elemnents cannot be rendered unless enclosed.
        //          Access state properties by {this.state.whatever}
        return (
            <div className="myClass">
                Hello, {this.props.name}!
            </div>
        )
    }
});

// This allows the component to be require()'d from other modules
module.exports = ComponentName;
