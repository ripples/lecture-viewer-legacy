var assign          = require('object-assign');
var EventEmitter    = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var isFunction = function(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

var createStore = function(spec) {

  var store = assign({
    emitChange: function() {
      this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
  }, spec, EventEmitter.prototype);

  for (var key in store){
    if (isFunction(store[key])) {
      store[key] = store[key].bind(store);
    }
  }
  return store;
}

module.exports = createStore;
