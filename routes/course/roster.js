var formidable = require('formidable')
var fs = require('fs');
var csv = require('csv');
var validator = require('validator');
var sleep = require('sleep');

var database = require("../../database/index.js");

//Roster API
module.exports = {
    setup: function(router) {
        
        //Get the roster of a specific course
        router.get('/:course_id/roster', function(req, res) {
            
            if(req.params.course_id == undefined) {
                
                res.sendFail("No valid course_id parameter");

            } 
            else if(validator.isMongoId(req.params.course_id) == false) {

                res.sendFail("Course ID is not a valid MongoID");

            }
            else {

                database.course.getRegisteredUsersById(req.params.course_id, function(err, roster) {
                    
                    if(err) {

                        res.sendFail(err);

                    } else {

                        console.log(roster);

                    }

                });

            } 
            
        });

        //Add a single or a bunch of users to the course's roster
        router.post('/:course_id/roster', function(req,res) {

            //Checks for email, if it does not exist, we assume a file is here
            if(req.body.email == undefined)
            {
                //Creates form that can read in file
                var form = new formidable.IncomingForm();

                //Starts parsing of the file
                form.parse(req, function(err, fields, files) {

                    //Gets the temp path the file was uploaded to
                    //TODO check against this.. files['upload'] could be undefined

                    if(files['upload'] != undefined)
                    {
                        var file = files['upload'];
                        var tempPath = file['path'];

                        console.log("Received upload. Placed in " + tempPath);

                        //Starts reading of the uploaded file
                        fs.readFile(tempPath, 'utf8', function (err,data) {
                            if (err) {
                                return console.log(err);
                            }


                            //TODO
                            //Check if we are adding non duplicates or doing a complete overwrite


                            //Create arrays for all the valid/invalid emails
                            var validEmails = [];
                            var invalidEmails = [];

                            //Create a new csv parser and write the file data into it
                            var parser = csv.parse();
                            parser.write(data);

                            //Iterate through each csv entry
                            while(email = parser.read())
                            {   
                                //For some reason the parser returns arrays of 1 item... So this makes it 1 item
                                email = email[0];

                                //Make sure the entry is actually an email and not just say, a name.
                                if(validator.isEmail(email))
                                {
                                    validEmails.push(email)
                                }
                                else
                                {
                                    invalidEmails.push(email);
                                }
                            }

                            //TODO: For each vaild email, check against the current roster. Only add if not there.
                            //Or just add if we are overwriting

                            //For testing only. Just displays what email were valid/invalid
                            res.write("<h2>Valid Emails</h2><br>");
                            for(var i =0;i<validEmails.length;i++)
                            {  
                                var email = (i+1) + ". " + validEmails[i];
                                res.write(email + "<br>");
                            }

                            res.write("<br><br><br><h2>Invalid Emails</h2><br>");
                            for(var i =0;i<invalidEmails.length;i++)
                            {  
                                var nonEmail = (i+1) + ". " + invalidEmails[i];
                                res.write(nonEmail + "<br>");
                            }


                            res.write("<br><br>");


                            //This is more like what would be returned, a JSON object with lists of what was accepted

                            responseObject = {"emails_added" : validEmails, "emails_rejected" : invalidEmails};

                            res.write(JSON.stringify(responseObject));
                            res.end();
                        });    
                    }else{
                        console.log("File is missing");

                        responseObject = {data:{}};
                        
                        responseObject.status = "fail";
                        responseObject.data.message = "No file was provided when uploading";

                        res.send(responseObject);
                    }
                });
            //We were given a json object of a single user
            }else{
                var email = req.body.email;

                responseObject = {data:{}};

                //Email provided is legit
                if(validator.isEmail(email))
                {
                    //TODO add email to roster

                    responseObject.status = "success";
                    responseObject.data.email = email;
                }
                //Email provided is bad
                else
                {
                    responseObject.status = "fail";
                    responseObject.data.message = "Email provided is invalid";
                    responseObject.data.email = email;
                }

                res.send(responseObject);
            }
        });

        //Delete a user from a course's roster
        router.delete('/:course_id/roster/:uid', function(req,res) {
            // TODO no deletion of specific user from roster db call?
        });
    }
};
