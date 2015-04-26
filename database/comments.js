var Comment = require('./models/comment');
var Lecture = require('./models/lecture');

/*
 * Method that creates a comment
 */
exports.createComment = function(lecture_id, user_id, firstandlast, time, content, post_date, callback) {
    Lecture.findByIdAndUpdate(lecture_id._id, {
        $push: {
            comments: {
                lecture: lecture_id,
                author: user_id,
                poster_name: firstandlast,
                content: content,
                time: time,
                date: post_date
            }
        }
    }, callback);
};
/*
var commentSchema = new Schema({
  semester: String,
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  lecture: {
    type: Schema.Types.ObjectId,
    ref: 'Lecture'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  poster_name: String,
  content: String,
  time: Number,
  date: Date
});
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
exports.deleteComment = function(comment_id, callback) {
    Comment.findByIdAndRemove(comment_id, function(err, comment) {
        if (err) {
            callback(err);
        } else {
            callback(undefined, comment);
        }
    });
};
/*
 * Method to update Comment by id
 */
exports.editComment = function(comment_id, lecture_id, user_id, firstandlast, time, content, post_date, callback) {
    Comment.findByIdAndUpdate(comment_id, {
        $set: {
            lecture: lecture_id,
            author: user_id,
            poster_name: firstandlast,
            time: time,
            date: post_date,
            content: content
        }
    }, callback);
};