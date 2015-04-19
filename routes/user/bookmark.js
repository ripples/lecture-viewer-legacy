//Bookmark API
module.exports = {
    setup: function(router) {

        /*-----MOCK DATA-----*/
        var mock_bid = 456342;
        var mock_bookmark = {
            'bookmark_id': '2452345uw90fvsdf09',
            'label': 'This is a bookmark',
            'time': '12:43:56',
            'lecture_id': 'in34523jnkj453kb'
        };
        /*-----MOCK DATA-----*/

        //Create bookmark for current user
        router.post('/bookmark', function(req,res) {
            //Check that all required parameters are present
            if(req.body.course_id && req.body.lecture_id && req.body.label && req.body.time) {

                //Create the bookmark

                res.send({'status': 'success',
                    'data': {
                        'bookmark_id': mock_bid
                    }
                });
            }
            else {
                res.send({'status': 'fail',
                    'data': {
                        'title': 'Incorrect parameters'
                    }
                });
            }
        });

        //Get user's bookmarks for specific course
        router.get('/bookmark/course/:course_id', function(req,res) {

            //Get bookmarks from the db

            res.send({'status': 'success',
                'data': {
                    'bookmarks': [
                        mock_bookmark
                    ]
                }
            });
        });

        //Get user's bookmarks for specific lecture of a course
        router.get('/bookmark/:course_id/lecture/:lecture_id', function(req,res) {

            //Get bookmarks from the db

            res.send({'status': 'success',
                'data': {
                    'bookmarks': [
                        mock_bookmark
                    ]
                }
            });
        });

        //Delete specific bookmark
        router.delete('/bookmark/:bookmark_id', function(req,res) {
            
            //Delete the bookmark

            res.send({'status': 'success'});
        });

        //Edit specific bookmark
        router.put('/bookmark/:bookmark_id', function(req,res) {

            //Send the edit object onto the database

            res.send({'status': 'success'});
        });
    }
};
