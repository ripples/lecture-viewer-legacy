// TODO : Replace the example data with a real component

var React   = require('react');

var App = React.createClass({

    displayName : 'App',

    getInitialState : function() {
        return {
            description: "This is the new description."
        }
    },

    componentWillMount : function() {},

    componentWillUnmount : function() {},

    render : function() {

        return (
            <div>
                <h1 className="myClass">{this.props.name}</h1>
                <h2>{this.state.description}</h2>
            </div>
        );
    }
});

// This allows the component to be require()'d from other modules
module.exports = App;
