var log = function(context, detail, action, datatype, data) {
  console.log('>>> ' + context + ': ' + detail + '\n\t' +
              'action: ' + action + ' (' + datatype + ')\n\t\t' + JSON.stringify(data));
}

var logBridge = function(context, detail) {
  return function(action, datatype, data) {
    log(context, detail, action, datatype, data);
  }
}

module.exports = {
  actionCreator: function(detail) {
    return logBridge('actionCreator', detail);
  },
  store: function(detail) {
    return logBridge('store', detail);
  },
}
