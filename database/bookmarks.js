var User = require('./models/user');
var Bookmark = require('./models/bookmark.js');
var mongoose = require('mongoose');

/*
  Method to add a bookmark to the user account with given email.
 */
exports.addBookmarkById = function(user_id, lecture_id, course_id, label, time, callback) {
    var bookmark = new Bookmark();
    bookmark.lecture = lecture_id;
    bookmark.course = course_id;
    bookmark.label = label;
    bookmark.time = time;
    User.findByIdAndUpdate(user_id, {
        $push: {
            bookmarks: bookmark
        }
    }, function(err, user) {
        callback(err, user);
    });
};
/*
  Method to get a user's bookmarks by user's id.
 */
exports.getBookmarksById = function(userid, callback) {
    User.findById(userid, function(err, user) {
        callback(undefined, user.bookmarks);
    });
};
/*
 * Get Bookmark by lectureID
 */
exports.getBookmarksByLectureId = function(userid, lectureid, callback) {
    User.findById(userid, {
        bookmarks: {
            $elemMatch: {
                lecture: lectureid
            }
        }
    }, function(err, user)
    {
        if(user)
            callback(err, user.bookmarks);
        else
            callback(err, user);
    });
};
/*
PatientsModel.find({patientId: '123'}, {diet: {$elemMatch: {'status': 'A'}}}, cb)
/*
 * Gets bookmark by userid and lectureid
 */
exports.getBookmarksByCourseId = function(userid, lectureid, callback) {};
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
/*
 * Method that updates bookmark.
 */
// exports.editBookmark = function(userid, bookmarkid, callback) {
//     User.findByIdAndUpdate(userid, );
// };