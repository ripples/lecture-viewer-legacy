//Notification API
module.exports = {
    setup: function(router) {

        /*-------MOCK DATA------*/
        var mock_notifications = [
                    {
                        "type" : "added to course",
                        "course_name" : "CS187 Data Structures",
                        "course_id" : "4cdfb11e1f3c000000007822",
                        "date" : "03/02/2015 01:28:22"
                    },
                    {
                        "type" : "new lecture",
                        "course_name" : "CS187 Data Structures",
                        "course_id" : "4cdfb11e1f3c000000007822",
                        "lecture_name" : "Lecture 5: Can we really trust arrays?",
                        "lecture_id" : "8dfaa22e1f3c000000003312",
                        "date" : "03/01/2015 11:21:12"
                    },
                    {
                        "type" : "reply",
                        "course_name" : "CS187 Data Structures",
                        "course_id" : "4cdfb11e1f3c000000007822",
                        "lecture_name" : "Lecture 5: Can we really trust arrays?",
                        "lecture_id" : "8dfaa22e1f3c000000003312",
                        "comment" : "What's an array?",
                        "comment_id" : "8dfaa22eff3c242000003312",
                        "reply" : "\*facepalm\* its soo simple dude.",
                        "replier_name" : "That Guy",
                        "replier_id" : "8dfaa22e1f3c242000003312",
                        "date" : "03/02/2015 01:28:22"
                    }
                ];
        /*-------MOCK DATA------*/

        //Get notifications of current user
        router.get('/notification/', function(req,res) {

            //Get notifications from the db to send back

            res.send({'status': 'success',
                'data': {
                    'notifications': mock_notifications
                }
            });
        });

        //Mark notification as read
        router.delete('/notification/:notification_id', function(req,res) {

            //Mark notification as read in database

            res.send({'status': 'success'});
        });
    }
};
