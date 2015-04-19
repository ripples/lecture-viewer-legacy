var User = require('./models/user');

/*
  Method to add a notification to the user account with given email.
 */
exports.addNotificationById = function(id, newNotification, callback) {
  User.findByIdAndUpdate(
      id,
      {$push: {notifications: newNotification}},
      callback
  );
};

/*
  Method to get user's notifications by user's email.
 */
exports.getAllNotificationsById = function(id, callback) {
  User.findById(id, function(err, user) {
    if (err) {
      callback(err);
    }
    else if (!user) {
      callback("email does not exist.");
    }
    else {
      callback(undefined, user.notifications);
    }
  });
};