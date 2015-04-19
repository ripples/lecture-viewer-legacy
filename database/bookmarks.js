var User = require('./models/user');

/*
  Method to add a bookmark to the user account with given email.
 */
exports.addBookmarkById = function(id, newBookmark, callback) {
  User.findByIdAndUpdate(
      id,
      {$push: {bookmarks: newBookmark}},
      callback
  );
};

/*
  Method to get a user's bookmarks by user's email.
 */
exports.getBookmarksById = function(id, callback) {
  User.findOne({_id: id}, function(err, user) {
    if (err) {
      callback(err);
    }
    else if (!user) {
      callback("email does not exist.");
    }
    else {
      callback(undefined, user.bookmarks);
    }
  });
};