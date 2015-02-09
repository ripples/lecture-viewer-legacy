/*** Please follow this format when creating new Stores ***/

var Dispatcher      = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var assign          = require('object-assign');
var EventEmitter    = require('events').EventEmitter;

var CHANGE_EVENT = "change";

/*** Place any private variables here ***/

/***  Place any private helper functions here ***/

// Create the Store (Extends the EventEmitter Object)
var StoreName = assign(new EventEmitter(), {

    // Called when the state of the Store has changed. Those Components that
    // are listening to the store will have their callbacks invoked
    emitChange: function() { this.emit(CHANGE_EVENT); },

    // Exposed to Components so that they may register a callback for requesting
    // and updated state from the Store when the store emits a change
    addChangeListener: function(callback) { this.on(CHANGE_EVENT, callback); },

    // Called by the listening Components when they are about to Unmount
    removeChangeListener: function(callback) { this.removeListener(CHANGE_EVENT, callback); },

    /***
    Publicly exposed methods often accessed by Components in their
    listener callbacks.  These methods should return local state ***/

    // Registers this Store with the dispatcher so that the appropriate action
    // handler is invoked when an action is dispatched
    dispatcher: AppDispatcher.register(function(payload) {

        // Retrieve the action
        var action = payload.action; // this is our action from handleViewAction

        // Depending on the action type, perform the necessary changes
        switch(action.actionType){

            case ActionConstants.ACTION_ONE:                // EXAMPLE
                _privateFunctionOne(payload.action.item);   // EXAMPLE
                break;
            case ActionConstants.ACTION_TWO:                // EXAMPLE
                _privateFunctionTwo(payload.action.index);  // EXAMPLE
                break;
            defaut:
                break;
        }

        // The store is now self-updated and emits the change event so that
        // the listening Components can request the updated state
        StoreName.emitChange();

        return true;
    })
});

module.exports = StoreName;
