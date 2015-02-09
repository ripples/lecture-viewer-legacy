/*** We only need a single Dispatcher ***/

var Dispatcher  = require('flux').Dispatcher;

// Creates a dispatcher that handles actions originating from View interactions
// or from server responses

module.exports = return new Dispatcher();
