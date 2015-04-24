var Comment = require('./models/comment');
exports.lecture = require('./lectures');
exports.comment = require('./comments');

/*
 * Methd that creates a comment
 */
exports.createComment = function(lecture_id, user_id, content, post_date) {
    Comment.find({
        lecture: lecture_id,
        autho: user_id,
        content,
        date: post_date
    }, function(err, comment) {
        if (err) {
            callback(err);
        } else {
            Comment.create({
                lecture: lecture_id,
                author: user_id,
                date: post_date,
                content: content
            });
        }
    });
};