var validator = require('validator');

var database = require('../../database/index.js');
var auth = require('../../authentication');

//Bookmark API
module.exports = {
    setup: function(router) {

        //Create bookmark for current user
        router.post('/bookmark', function(req,res) {
            //Check that all required parameters are present
            if(req.body.course_id && req.body.lecture_id && req.body.label && req.body.time) {

                if(!validator.isNumeric(req.body.time))
                {
                    return res.sendFail("time parameter is not a number");
                }
                if(!validator.isMongoId(req.body.course_id))
                {
                    return res.sendFail("course_id parameter is not a valid MongoId");
                }
                if(!validator.isMongoId(req.body.lecture_id))
                {
                    return res.sendFail("lecture_id parameter is not a valid MongoId");
                }

                //Todo Set limit on label length

                //Create the bookmark
                var bookmark = {};
                bookmark.bookmark_id = "dfaa1e1f3c23000000007855";
                bookmark.course_id = req.body.course_id;
                bookmark.lecture_id = req.body.lecture_id;
                bookmark.label = req.body.label;
                bookmark.time = req.body.time;

                return res.sendSuccess(bookmark);
            }
            else {
                return res.sendFail("Incorrect parameters");
            }
        });

        //Get user's bookmarks for specific course
        router.get('/bookmark/course/:course_id', function(req,res) {

            if(!validator.isMongoId(req.params.course_id))
            {
                return res.sendFail("course_id parameter is not a valid MongoId");
            }

            //Get bookmarks from the db

            return res.sendSuccess({});
        });

        //Get user's bookmarks for specific lecture of a course
        router.get('/bookmark/course/:course_id/lecture/:lecture_id', function(req,res) {

            if(!validator.isMongoId(req.params.course_id))
            {
                return res.sendFail("course_id parameter is not a valid MongoId");
            }
            if(!validator.isMongoId(req.params.lecture_id))
            {
                return res.sendFail("lecture_id parameter is not a valid MongoId");
            }

            //Get bookmarks from the db

            return res.sendSuccess({});
        });

        //Delete specific bookmark
        router.delete('/bookmark/:bookmark_id', function(req,res) {

            if(!validator.isMongoId(req.params.bookmark_id))
            {
                return res.sendFail("bookmark_id parameter is not a valid MongoId");
            }
            //Delete the bookmark

            return res.sendSuccess({});
        });

        //Edit specific bookmark
        router.put('/bookmark/:bookmark_id', function(req,res) {

            if(req.body.label) {

                if(!validator.isMongoId(req.params.bookmark_id))
                {
                    return res.sendFail("bookmark_id parameter is not a valid MongoId");
                }

                //Todo Set limit on label length

                //Create the bookmark
                var bookmark = {
                    "course_id" : "dfb11e1f3c23000000007855",
                    "lecture_id" : "4cdfb11e1f3c000000007822",
                    "label" : "New Bookmark! :D",
                    "time" : "140"
                }

                bookmark.bookmark_id = req.params.bookmark_id;
                bookmark.label = req.body.label;

                return res.sendSuccess(bookmark);
            }
            else {
                return res.sendFail("Incorrect parameters");
            }
        });
    }
};
