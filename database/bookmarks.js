var User = require('./models/user');
/*
  Method to add a bookmark to the user account with given email.
 */
exports.addBookmarkById = function(user_id, lecture_id, course_id, label, time, callback) {
    User.findByIdAndUpdate(user_id, {
        $push: {
            bookmarks: {
                lecture_id: lecture_id,
                course_id: course_id,
                label: label,
                time: time
            }
        }
    }, callback);
};
/*
  Method to get a user's bookmarks by user's id.
 */
exports.getBookmarksById = function(userid, callback) {
    User.findOne({
        _id: userid
    }, function(err, user) {
        if (err) {
            callback(err);
        } else if (!user) {
            callback("email does not exist.");
        } else {
            callback(undefined, user.bookmarks);
        }
    });
};