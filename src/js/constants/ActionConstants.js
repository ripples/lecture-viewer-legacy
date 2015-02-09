// Makes null values equal to the name of their keys in the object
var keyMirror = require('keymirror');

module.exports = {

    // Define sets of actions that the Stores will listen for
    ActionTypes: keyMirror({

        /*** EXAMPLES ***/

        // CLICK_THREAD: null,
        // CREATE_MESSAGE: null,
        // RECEIVE_RAW_CREATED_MESSAGE: null,
        // RECEIVE_RAW_MESSAGES: null

        /****************/
    }),
};
