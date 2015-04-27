var User = require('./models/user');
var Bookmark = require('./models/bookmark.js');
/*
  Method to add a bookmark to the user account with given email.
 */
exports.addBookmarkById = function(user_id, lecture_id, course_id, label, time, callback) {
    var bookmark = new Bookmark();
    bookmark.lecture_id = lecture_id;
    bookmark.course_id = course_id;
    bookmark.label = label;
    bookmark.time = time;
    User.findByIdAndUpdate(user_id, {
        $push: {
            bookmarks: {
                lecture_id: lecture_id,
                course_id: course_id,
                label: label,
                time: time
            }
        }
    }, function(err, user) {
        callback(err, user);
    });
};
/*
  Method to get a user's bookmarks by user's id.
 */
exports.getBookmarksById = function(userid, callback) {
    User.findOne({
        _id: userid
    }, function(err, user) {
        callback(undefined, user.bookmarks);
    });
};
/*
 * Get Bookmark by lectureID
 */
exports.getBookmarksByLectureId = function(lectureid, callback) {
    // User.findOne({_id: });
};
/*
 * Deletes a bookmark by userid and bookmarkid
 */
exports.deleteBookmark = function(userid, bookmarkid, callback) {
    User.findByIdAndUpdate({
        _id: userid
    }, {
        $pull: {
            bookmarks: {
                _id: bookmarkid
            }
        }
    }, function(err, user) {
        callback(err, user);
    });
};