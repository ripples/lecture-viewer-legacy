var MockAuthentication = {

  login: function (email, password, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }

    pretendRequest(email, password, function (res) {
      if (res.authenticated) {
        localStorage.token = res.token;
        if (cb) cb(true);
        this.onChange(true);
      } else {
        if (cb) cb(false);
        this.onChange(false);
      }
    }.bind(this));
  },

  getToken: function () {
    return localStorage.token;
  },

  logout: function (cb) {
    delete localStorage.token;
    if (cb) cb();
    this.onChange(false);
  },

  loggedIn: function () {
    return !!localStorage.token;
  },

  onChange: function () {}
};

var pretendRequest = function(email, password, cb) {
  setTimeout(function () {
    var localLength = localStorage.length;
    for(var i=0;i<localLength;i++){
      console.log("TOKEN: key=" + localStorage.key(i) + " value=" + localStorage.getItem(localStorage.key(i)));
    if ((email!="" && email === localStorage.key(i)) && password === localStorage.getItem(localStorage.key(i))) {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      });
      return;
    }} if(!cb.authenticated) {
      alert("Incorrect email or password");
      cb({authenticated: false});
    }
  }, 0);
}

module.exports = MockAuthentication;
