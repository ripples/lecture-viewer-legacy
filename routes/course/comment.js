var validator = require('validator');

var database = require('../../database/index.js');
var auth = require('../../authentication');

var faker = require('faker');

//Comment API
module.exports = {
    setup: function(router) 
    {
        //Get comments for specific lecture
        router.get('/:course_id/lecture/:lecture_id/comment', function(req,res) 
        {
            // database.course.lecture.getCommentsById
            if(!validator.isMongoId(req.params.course_id))
            {
                return res.sendFail("course_id parameter is not a valid MongoId");
            }
            if(!validator.isMongoId(req.params.lecture_id))
            {
                return res.sendFail("lecture_id parameter is not a valid MongoId");
            }

            var comments = [];

            for(var i = 0;i<5;i++)
            {
                var comment = {};
                comment.comment_id = "dfaa1e1f3c23000000007855";
                comment.poster_name = faker.name.firstName() + " " + faker.name.lastName();
                comment.poster_id = "aabc1e1f3c23000000001111";
                comment.content = faker.lorem.sentence();
                comment.time = Math.round(Math.random()*200);
                comment.posted_date = Math.round(Math.random()*2000000 + 10000000);

                comments.push(comment);
            }

            return res.sendSuccess(comments);


        });
        //Add new comment to specific lecture
        router.post('/:course_id/lecture/:lecture_id/comment', function(req,res) 
        {
            if(!req.body.content || !req.body.time || !req.body.posted_date)
            {
                return res.sendFail("Invalid parameters");
            }

            if(!validator.isMongoId(req.params.course_id))
            {
                return res.sendFail("course_id parameter is not a valid MongoId");
            }
            if(!validator.isMongoId(req.params.lecture_id))
            {
                return res.sendFail("lecture_id parameter is not a valid MongoId");
            }
            if(!validator.isNumeric(req.body.posted_date))
            {
                return res.sendFail("posted_date parameter is not a valid MongoId");
            }
            if(!validator.isNumeric(req.body.time))
            {
                return res.sendFail("time parameter is not a valid MongoId");
            }

            //Check content length?

            //database.course.getCommentsById

            var comment = {};
            comment.comment_id = "dfaa1e1f3c23000000007855";
            comment.course_id = req.params.course_id;
            comment.lecture_id = req.params.lecture_id;
            comment.content = req.body.content;
            comment.time = req.body.time;
            comment.posted_date = req.body.posted_date;

            return res.sendSuccess(comment);
        });

        //Delete a specific comment
        router.delete('/:course_id/lecture/:lecture_id/comment/:comment_id', function(req,res) 
        {
            if(!validator.isMongoId(req.params.course_id))
            {
                return res.sendFail("course_id parameter is not a valid MongoId");
            }
            if(!validator.isMongoId(req.params.lecture_id))
            {
                return res.sendFail("lecture_id parameter is not a valid MongoId");
            }
            if(!validator.isMongoId(req.params.comment_id))
            {
                return res.sendFail("comment_id parameter is not a valid MongoId");
            }

            return res.sendSuccess({});

        });

        //Edit a specific comment
        router.put('/:course_id/lecture/:lecture_id/comment/:comment_id', function(req,res) 
        {
            if(!req.body.content)
            {
                return res.sendFail("Invalid parameters");
            }
            if(!validator.isMongoId(req.params.course_id))
            {
                return res.sendFail("course_id parameter is not a valid MongoId");
            }
            if(!validator.isMongoId(req.params.lecture_id))
            {
                return res.sendFail("lecture_id parameter is not a valid MongoId");
            }
            if(!validator.isMongoId(req.params.comment_id))
            {
                return res.sendFail("comment_id parameter is not a valid MongoId");
            }

            //Check content length?

            var comment = {};
            comment.comment_id = req.params.comment_id;
            comment.course_id = req.params.course_id;
            comment.lecture_id = req.params.lecture_id;
            comment.content = req.body.content;
            comment.time = "140";
            comment.posted_date = "12325226363";

            return res.sendSuccess(comment);
        });

        //Reply to a specific comment
        router.post('/:course_id/lecture/:lecture_id/comment/:comment_id', function(req,res) 
        {
            if(!req.body.content || !req.body.time || !req.body.posted_date)
            {
                return res.sendFail("Invalid parameters");
            }

            if(!validator.isMongoId(req.params.course_id))
            {
                return res.sendFail("course_id parameter is not a valid MongoId");
            }
            if(!validator.isMongoId(req.params.lecture_id))
            {
                return res.sendFail("lecture_id parameter is not a valid MongoId");
            }
            if(!validator.isMongoId(req.params.comment_id))
            {
                return res.sendFail("comment_id parameter is not a valid MongoId");
            }

            var comment = {};
            comment.comment_id = "dfaa1e1f3c23000000007855";
            comment.parent_id = req.params.comment_id;
            comment.course_id = req.params.course_id;
            comment.lecture_id = req.params.lecture_id;
            comment.content = req.body.content;
            comment.time = "140";
            comment.posted_date = "12325226363";

            return res.sendSuccess(comment);
        });
    }
};
