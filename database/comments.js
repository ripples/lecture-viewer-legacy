var Comment = require('./models/comment');
var Lecture = require('./models/lecture');
/*
 * Method that creates a comment
 */
exports.createComment = function(lecture_id, user_id, firstandlast, time, content, post_date, callback) {
    var comment = new Comment();
    comment.content = content;
    comment.lecture = lecture_id;
    comment.author = user_id;
    comment.poster_name = firstandlast;
    comment.time = time;
    comment.post_date = post_date;
    // console.log(comment);
    Lecture.findByIdAndUpdate(lecture_id, {
        $push: {
            comments: comment
        }
    }, function(err, lecture) {
        callback(err, comment);
    });
};
/*
 * Method that delectes the whole database for comments
 */
exports.dropCommentsDatabase = function(callback) {
    Comment.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Comment Database Droped");
        }
        callback;
    });
};
/*
 * delete a comment using id
 */
exports.deleteComment = function(lecture_id, comment, callback) {
    Lecture.findByIdAndUpdate({
        _id: lecture_id
    }, {
        $pull: {
            comments: {
                _id: comment._id
            }
        }
    }, function(err, comment) {
        callback(err, comment);
    });
};
/*
 * Method to update Comment by id
 */
exports.editComment = function(comment_id, content, callback) {
    Comment.findByIdAndUpdate(comment_id, {
        $set: {
            content: content
        }
    }, function(err, comment){
        console.log(comment);
        callback(err,comment);
    });
};
