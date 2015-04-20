var express = require('express');
var router = express.Router();
var validator = require('validator');

var database = require('../../database');
var redis = require('../../database/redis');

//Add module routes
require('./bookmark').setup(router);
require('./notification').setup(router);

/*-----MOCK DATA-------*/
/*var mock_uid = '2394798792';
var mock_fname = 'Jane';
var mock_lname = 'Doe';
var mock_course_list = [{'name': 'CS497S Scalable Web Systems', 'id': '2348276591'}];
var mock_profile_picture = 'http://faculty.sites.uci.edu/ltemplate/files/2011/04/generic_profile.jpg';
*/
/*-----MOCK DATA-------*/

//Create an account
router.post('/', function(req,res) {
    //Check if all required parameters are present
    if(req.body.email && req.body.password && req.body.first_name && req.body.last_name) {

        //Verifies email is legit
        if(!validator.isEmail(req.body.email))
        {
            res.sendFail("Not a valid email address");
            return;
        }

        //Attempts to create new user using database methods
        database.user.createUser(req.body.email,req.body.password,req.body.first_name, req.body.last_name,"student", function(err, user_id)
        {
            //If no error, send back user data
            if(err == undefined)
            {
                //I will need the user data to be returned to me in a user variable
                res.sendSuccess({"user_id" : user_id});

                /*---------------------------------------

                Send verification email to req.body.email

                ---------------------------------------*/
            }
            else
            {
                //I will need to know why it failed... Logic problem or a legit error
                res.sendFail(err);
            }
        });
    }
    else {
        res.sendFail("Incorrect parameters");
    }
});

//Get logged in user info
router.get('/', function(req,res) {
    var token = req.body.token;
    if(!token) return res.send(200, {
        status: 'failed',
        data: {
            message: 'No user currently logged in.'
        }
    });

    var tokenUUID = jwt.decode(token, auth.secret);

    redis.get(tokenUUID, function(err, data) {
        if(err || !data) return res.send(200, {
            status: 'failed',
            data: {
                message: 'Failed to retrieve user data from Redis.'
            }
        }) else {
            var userData = JSON.parse(data);

            //TODO add other stuff like courses, email, etc...
            var returnData = {
                first_name: userData.name.first,
                last_name: userData.name.last,
                course_list: userdata.courses
            }

            res.send(200, {
                status: 'success',
                data: returnData
            });
        }
    });
});

//Delete current user
router.delete('/', function(req,res) {

    //Delete user in database

    var token = req.body.token;
    if(!token) return res.send(403, {
        status: 'failed',
        data: {
            message: 'No user currently logged in.'
        }
    });

    var tokenUUID = jwt.decode(token, auth.secret);

    redis.get(tokenUUID, function(err, data) {
        if(err || !data) return res.send(403, {
            status: 'failed',
            data: {
                message: 'Failed to retrieve user data from Redis.'
            }
        }) else {
            var user_id = JSON.parse(data).user_id;

            database.user.deleteUserById(user_id, function(err, user) {
                if(err) {
                    res.send(403, {
                        status: 'failed',
                        data: {
                            message: 'Failed to remove user from database.'
                        }
                    });
                } else {
                    res.send(200, {
                        status: 'success',
                        data: {
                            user_id: user_id
                        }
                    });
                }
            });
        }
    });
});

//Get user
router.get('/:user_id', function(req,res) {

    //Get user info from database

    if(req.params.user_id == undefined)
    {
        res.sendFail("No valid user_id parameter");
    }
    else if(validator.isMongoId(req.params.user_id) == false)
    {
        res.sendFail("User ID is not a valid MongoID");
    }
    else{
        database.user.getUserById(req.params.user_id, function(err, user)
        {
            if(err)
                res.sendFail(err);
            else{
                var resUser = {};

                resUser.first_name = user.name.first;
                resUser.last_name = user.name.last;
                resUser.user_id = req.params.user_id;

                res.sendSuccess(resUser);
            }
        });
    }
});

//Edit user profile
router.put('/:user_id', function(req,res) {

    //Todo check if matches logged in or is admin?

    var user_id = req.params.user_id;//req.session.user_id;

    if(req.body.first_name == undefined || req.body.last_name == undefined)
    {
        res.sendFail("Did not supply a first_name and last_name");
    }
    else if(validator.isMongoId(user_id) == false)
    {
        res.sendFail("User ID is not a valid MongoID");
    }
    else{
        database.user.setNameById(user_id, req.body.first_name, req.body.last_name, function(err,user)
        {
            if(err || user == null || user == undefined)
            {
                if(!err && !user)
                {
                    res.sendFail("userID does not exist");
                }
                else
                {
                    res.sendError(err);
                }
            }
            else{

                var resUser = {};

                resUser.first_name = user.name.first;
                resUser.last_name = user.name.last;
                resUser.email = user.email;
                resUser.user_id = user._id;

                res.sendSuccess(resUser);
            }
        });
    }
});

module.exports = router;
