var express = require('express');
var router = express.Router();

var validator = require('validator');
var bcrypt = require('bcrypt-nodejs');

var database = require('../../database/index.js');
var auth = require('../../authentication');
var mailer = require('../../mailer');

//Add module routes
require('./bookmark').setup(router);
require('./notification').setup(router);

//Create an account
router.post('/', function(req,res) {
    //Check if all required parameters are present
    if(req.body.email && req.body.password && req.body.first_name && req.body.last_name) {
        //Verifies email is legit
        if(!validator.isEmail(req.body.email)) {
            return res.sendFail("Not a valid email address");
        }

        // Hash the password before storing user information in database
        bcrypt.hash(req.body.password, null, null, function(err, hashedPassword) {
            if(err) {
                res.sendFail(err);
            } else {
                // Attempts to create user record in database
                database.user.createUser(req.body.email, hashedPassword, req.body.first_name, req.body.last_name, "student", function(err, user) {
                    //If no error, send back user data
                    if(!err) {
                        var resUser = {}

                        resUser.first_name = user.name.first;
                        resUser.last_name = user.name.last;
                        resUser.email = user.email;
                        resUser.role = user.role;
                        resUser.courses = user.courses;
                        resUser.user_id = user._id;

                        /*---------------------------------------
                        Send verification email to req.body.email
                        ---------------------------------------*/
                        //mailer.sendVerificationEmail(resUser.user_id, resUser.email, function(err) {
                        //    if(err) return res.sendFail(err);
                            return res.sendSuccess(resUser);
                        //});
                    } else {
                        //I will need to know why it failed... Logic problem or a legit error
                        res.sendFail(err);
                    }
                });
            }
        });
    } else {
        res.sendFail("Incorrect parameters");
    }
});

//Get logged in user info
router.get('/', auth.verify, function(req,res) {

    console.log("Logged in user...");
    console.log(req.user);

    user_id = req.user._id;

    database.user.getUserById(user_id, function(err, user)
    {
        if(err)
            res.sendFail(err);
        else{

            var resUser = {};

            resUser.first_name = user.name.first;
            resUser.last_name = user.name.last;
            resUser.email = user.email;
            resUser.role = user.role;
            resUser.courses = user.courses;
            resUser.user_id = user_id;

            res.sendSuccess(resUser);
        }
    });
});

//Delete current user
router.delete('/', auth.verify, function(req,res) {

    var user_id = req.user._id;

    database.user.deleteUserById(user_id, function(err, user)
    {
        if(err)
        {
            res.sendFail(err);
        }
        else
        {
            var resUser = {};

            resUser.first_name = user.name.first;
            resUser.last_name = user.name.last;
            resUser.email = user.email;
            resUser.role = user.role;
            resUser.courses = user.courses;
            resUser.user_id = user_id;

            res.sendSuccess(resUser);
        }
    });
});

//Delete a user
router.delete('/:user_id', auth.verify, function(req,res) {

    //Delete user in database

    //TODO check for admin rights
    console.log(req.user);

    if(req.user.role != "admin")
    {
        res.sendFail("Not an admin");
        return;
    }

    var user_id = req.params.user_id;

    if(user_id)
    {
        if(validator.isMongoId(user_id) == false)
        {
            res.sendFail("User ID is not a valid MongoID");
            return;
        }

        database.user.deleteUserById(user_id, function(err, user)
        {
            if(err)
                res.sendFail(err);
            else
            {
                var resUser = {};

                resUser.first_name = user.name.first;
                resUser.last_name = user.name.last;
                resUser.email = user.email;
                resUser.role = user.role;
                resUser.courses = user.courses;
                resUser.user_id = user_id;

                res.sendSuccess(resUser);
            }
        });
    }
    else{
        res.sendFail("Did not supply a user_id in the url");
    }
});


//Get user
router.get('/:user_id', auth.verify, function(req,res) {

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
router.put('/', auth.verify, function(req,res) {

    var user_id = req.user._id;//req.session.user_id;

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
                resUser.role = user.role;
                resUser.courses = user.courses;
                resUser.user_id = user_id;

                res.sendSuccess(resUser);
            }
        });
    }
});

module.exports = router;
