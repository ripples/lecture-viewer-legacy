//Comment API
module.exports = {
    setup: function(router) {
        //Get comments for specific lecture
        router.get('/:course_id/lecture/:lecture_id/comment', function(req,res) {
            // database.course.lecture.getCommentsById
        });
        //Add new comment to specific lecture
        router.post('/:course_id/lecture/:lecture_id/comment', function(req,res) {
            // TODO no add new comment db call?
        });
        //Delete a specific comment
        router.delete('/:course_id/lecture/:lecture_id/comment/:comment_id', function(req,res) {
            //TODO no remove comment db call?
        });
        //Edit a specific comment
        router.put('/:course_id/lecture/:lecture_id/comment/:comment_id', function(req,res) {
            //TODO no edit comment db call?
        });
        //Reply to a specific comment
        router.post('/:course_id/lecture/:lecture_id/comment/:comment_id', function(req,res) {
            //TODO no reply db call?
        });
    }
};
