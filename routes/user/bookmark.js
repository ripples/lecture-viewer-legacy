var validator = require('validator');

var database = require('../../database/index.js');
var auth = require('../../authentication');

var BOOKMARK_MAX_LABEL_LENGTH = 100;

//Bookmark API
module.exports = {
    setup: function(router) {

        //Create bookmark for current user
        router.post('/bookmark', auth.verify ,function(req,res) {

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
                if(req.body.label.length > BOOKMARK_MAX_LABEL_LENGTH)
                {
                    return res.sendFail("Bookmark label given is greater than the max 100 char allowed");
                }                
                //Todo Set limit on label length 100 chars

                //Create the bookmark
                var bookmark = {};
                bookmark.course_id = req.body.course_id;
                bookmark.lecture_id = req.body.lecture_id;
                bookmark.label = req.body.label;
                bookmark.time = req.body.time;

                var user_id = req.user._id;

                database.bookmark.addBookmarkById(user_id, bookmark.lecture_id, bookmark.course_id, bookmark.label, bookmark.time, function(err, user){

                    if(err)
                        return res.sendFail(err.message);

                    if(!user)
                        return res.sendFail("User does not exist");

                    if(!user.bookmarks)
                        return res.sendFail("Could not create bookmark");

                    //Gets the new bookmark created from the users list.
                    //Could be a race condition
                    var newBookmark = user.bookmarks[user.bookmarks.length-1];

                    bookmark.bookmark_id = newBookmark._id;

                    return res.sendSuccess(bookmark);
                });
            }
            else {
                return res.sendFail("Incorrect parameters");
            }
        });

        //Get user's bookmarks for specific course
        router.get('/bookmark/course/:course_id', auth.verify, function(req,res) {

            if(!validator.isMongoId(req.params.course_id))
            {
                return res.sendFail("course_id parameter is not a valid MongoId");
            }

            var user_id = req.user._id;

            database.bookmark.getBookmarksByLectureId(user_id, req.params.course_id, function(err, bookmarks) 
            {
                if(bookmarks)
                {
                    var resBookmarks = [];

                    for(var i = 0;i<bookmarks.length;i++)
                    {  
                        var newBookmark = {};
                        newBookmark.bookmark_id = bookmarks[i]._id;
                        newBookmark.time = bookmarks[i].time;
                        newBookmark.lecture_id = bookmarks[i].lecture;
                        newBookmark.course_id = bookmarks[i].course_id;
                        newBookmark.label = bookmarks[i].label;
                        resBookmarks.push(newBookmark);
                    }

                    return res.sendSuccess(resBookmarks);
                }
                else
                    return res.sendFail("User does not exist");
            });
        });

        //Get user's bookmarks for specific lecture of a course
        router.get('/bookmark/course/:course_id/lecture/:lecture_id', auth.verify, function(req,res) {

            var course_id = req.params.course_id;
            var lecture_id = req.params.lecture_id;

            if(!validator.isMongoId(req.params.course_id))
            {
                return res.sendFail("course_id parameter is not a valid MongoId");
            }
            if(!validator.isMongoId(req.params.lecture_id))
            {
                return res.sendFail("lecture_id parameter is not a valid MongoId");
            }

            var user_id = req.user._id;

            //Get bookmarks from the db
            database.bookmark.getBookmarksByLectureId(user_id, lecture_id, function(err, bookmarks) 
            {
                if(bookmarks)
                {
                    var resBookmarks = [];

                    for(var i = 0;i<bookmarks.length;i++)
                    {  
                        var newBookmark = {};
                        newBookmark.bookmark_id = bookmarks[i]._id;
                        newBookmark.time = bookmarks[i].time;
                        newBookmark.lecture_id = bookmarks[i].lecture;
                        newBookmark.course_id = bookmarks[i].course_id;
                        newBookmark.label = bookmarks[i].label;
                        resBookmarks.push(newBookmark);
                    }


                    return res.sendSuccess(resBookmarks);
                }
                else
                    return res.sendFail("User does not exist");
            });
        });

        //Delete specific bookmark
        router.delete('/bookmark/:bookmark_id', auth.verify, function(req,res) {

            var user_id = req.user._id;
            var bookmark_id = req.params.bookmark_id;

            if(!validator.isMongoId(bookmark_id))
            {
                return res.sendFail("bookmark_id parameter is not a valid MongoId");
            }
            //Delete the bookmark

            //Does not currently exist
            database.bookmark.getBookmarkById(user_id, bookmark_id, function(err, bookmark)
            {
                var resBookmark = {};

                resBookmark.bookmark_id = bookmark._id;
                resBookmark.time = bookmark.time;
                resBookmark.lecture_id = bookmark.lecture;
                resBookmark.course_id = bookmark.course_id;
                resBookmark.label = bookmark.label;

                database.bookmark.deleteBookmark(user_id, bookmark_id, function(err, user)
                {
                    return res.sendSuccess(resBookmark);
                });
            });
        });

        //Edit specific bookmark
        router.put('/bookmark/:bookmark_id', auth.verify, function(req,res) {

            var user_id = req.user._id;
            var bookmark_id = req.params.bookmark_id;
            var label = req.body.label;

            if(label) {

                if(!validator.isMongoId(bookmark_id))
                {
                    return res.sendFail("bookmark_id parameter is not a valid MongoId");
                }
                if(label.length > BOOKMARK_MAX_LABEL_LENGTH)
                {
                    return res.sendFail("Bookmark label given is greater than the max 100 char allowed");
                }      

                //Database call
                database.bookmark.editBookmark(bookmark_id, user_id, label, function(err, user)
                {
                    console.log(err);
                    console.log(user);

                    if(err)
                        res.sendFail(err);

                    if(!user)
                        res.sendFail("User does not exist");


                    //Just make a call to getBookmarkById like delete?
                    database.bookmark.getBookmarkById(user_id, bookmark_id, function(err, bookmark)
                    {
                        if(err)
                            res.sendFail(err);
                        if(!user)
                            res.sendFail("User does not exist");

                        var resBookmark = {};

                        resBookmark.bookmark_id = bookmark._id;
                        resBookmark.time = bookmark.time;
                        resBookmark.lecture_id = bookmark.lecture;
                        resBookmark.course_id = bookmark.course_id;
                        resBookmark.label = bookmark.label;

                        res.sendSuccess(resBookmark);
                    });
                });
            }
            else {
                return res.sendFail("Incorrect parameters");
            }
        });
    }
};
