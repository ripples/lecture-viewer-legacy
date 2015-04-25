var Comment = require('./models/comment');
exports.lecture = require('./lectures');
exports.comment = require('./comments');
/*
 * Method that creates a comment
 */
exports.createComment = function(lecture_id, user_id, firstandlast, time, content, post_date, callback) {
    Comment.find({
        lecture_id: lecture_id,
        author_id: user_id,
        content: content,
        date: post_date
    }, function(err, comment) {
        if (err) {
            callback(err);
        } else {
            Comment.create({
                lecture: lecture_id,
                author: user_id,
                poster_name: firstandlast,
                time: time,
                date: post_date,
                content: content
            }, function(err, lecture) {
                callback(err, lecture);
            });
        }
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
 exports.deleteComment = function(comment_id, callback){
    Comment.findByIdAndRemove(comment_id,function(err, comment){
        if(err){
            callback(err);
        }else{
            callback(undefined, comment);
        }
    });
 };
