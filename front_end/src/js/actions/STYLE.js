/*** Please follow this format when creating new Actions ***/

var Dispatcher      = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');

var ActionCreators = {

    /*** EXAMPLE ***/
    // This Action Creator handles actions that may need to reach out to some
    // data layer, such as our WebAPI.  Notice success/fail cases are included.
    SomeActionCreator: function(userId) {

        // Dispatch an action now so that stores that want
        // to optimistically update their state can do so.
        dispatch(ActionConstants.SOME_ACTION, {userId: userId});

        // This example uses promises, but you can use Node-style
        // callbacks or whatever you want for error handling.
        // We would likely replace 'SomeDataAccessLayer' with 'WebAPI'.
        SomeDataAccessLayer.doSomething(userId)
        .then(function(newData) {

            // Stores that optimistically updated may not do anything
            // with a "SUCCESS" action, but you might e.g. stop showing
            // a loading indicator, etc.
            dispatch(ActionConstants.SOME_ACTION_SUCCESS, {userId: userId, newData: newData});
        }, function(error) {

            // Stores can roll back by watching for the error case.
            dispatch(ActionConstants.SOME_ACTION_FAIL, {userId: userId, error: error});
        });
    }

    /*** Place other Action Creators here ***/
}

module.exports = ActionCreators;
