var formidable = require('formidable')
var fs = require('fs-extra');
var unzip = require('unzip');
var uuid = require('node-uuid');
var DecompressZip = require('decompress-zip');
var validator = require('validator');
var database = require("../../database/index.js");

//Lecture API
module.exports = {
    setup: function(router) {
        //Add a lecture to a course
        router.post('/:course_id/lecture', function(req,res) 
        {
            var course_id = req.params.course_id;

            //Checks for course_id param to be legit
            if(!validator.isMongoId(course_id))
            {
                return res.sendFail("course_id parameter is not a valid MongoId");
            }

            //Allows Formidable
            var form = new formidable.IncomingForm();

            /*Creates an event listener to print progress of upload to the console.
                Plan on sending progress data back to client eventually.
            */
            form.addListener('progress' , function(bytesRecieved , bytesExpected){
               
              console.log(((bytesRecieved) + "/" + bytesExpected) + " : " + ((bytesRecieved * 100)/bytesExpected) + "%");
            
            });


            form.parse(req, function(err, fields, files) 
            {
                if(files['upload'] == undefined)
                {
                    return res.sendFail("No file was provided");
                }

                var file = files['upload'];
                var tempPath = file['path'];

                //Checks field to see if this is a manual upload from website (screencast)
                if(fields['manual'] == 'true')
                {
                    console.log("Manual upload");

                    //Makes sure title and description are defined
                    if(!fields['title'] || !fields['description']) 
                    {
                        return res.sendFail("Invalid parameters. Missing title and/or description");
                    }

                    //Makes sure the file type is mp4
                    if(file['type'] != "video/mp4")
                    {
                        return res.sendFail("Video is not in mp4 format");
                    }


                    //Create a new random, unique, folder to save lecture video file
                    var videoPath = "media/" + req.params.course_id + "/" + uuid.v1() + "/video.mp4";

                    //Moves file from tmp to media
                    fs.move(tempPath, videoPath, function (err) 
                    {
                        if (err){
                            return res.sendFail(err);  
                        }

                        //Creates a date from time of upload (maybe allow actual date later)
                        var date = (new Date());

                        //Call database api to create lecture
                        database.lecture.createLecture(course_id, fields['title'], fields['description'], date, videoPath, true, [], [], function(err, lecture)
                        {
                            if(err)
                                return res.sendFail(err);

                            //Start putting returned courses' values into response objects ones
                            resCourse = {};
                            resCourse.lecture_id = lecture._id;
                            resCourse.course_id = course_id;
                            resCourse.date = lecture.date;
                            resCourse.title = lecture.title;
                            resCourse.visible = lecture.visible;
                            resCourse.description = lecture.description;
                            resCourse.video_url = lecture.video;
                            resCourse.screen_image_urls = lecture.screenImages;
                            resCourse.whiteboard_image_urls = lecture.whiteboardImages;

                            return res.sendSuccess(resCourse);
                        });
                    });
                }
                else{
                    //Start of auto upload logic (upload done by capturing system)
                    console.log("Auto upload");

                    //Verifies start time was provided
                    if(!fields['start_time']) 
                    {
                        return res.sendFail("Invalid parameters. Missing start_time(seconds)");
                    }

                    var start_time = fields['start_time'];

                    //Create a new random, unique, folder to save all unzipped lecture files
                    var unzipPath = "media/" + req.params.course_id + "/" + uuid.v1() + "/";

                    //Extracts files from temp zip file
                    var unzipper = new DecompressZip(tempPath);
                    
                    //On an unzipping error, go here
                    unzipper.on('error', function (error) {
                        /*On unzipping error, abort request. Doesn't work for all file types, such as .txt*/
                        console.log("File uploaded was not a .zip file. Aborting upload.");
                        console.log(error);
                        return res.sendFail("Invalid File Type");
                    });

                    //Once completing the unzipping, read other params, files, create lecture, and respond
                    unzipper.on('extract', function(end)
                    {   
                        //Read files in root of unzipped file
                        fs.readdir(unzipPath, function(err, files)
                        {   
                            if(files.indexOf("computer") == -1)
                            {
                                return res.sendFail("Zip folder does not contain 'computer' directory");
                            }

                            if(files.indexOf("whiteboard") == -1)
                            {
                                return res.sendFail("Zip folder does not contain 'whiteboard' directory");
                            }

                            if(files.indexOf("video.mp4") == -1)
                            {
                                return res.sendFail("Zip folder does not contain 'video.mp4' file");
                            }

                            var whiteboard_images = [];
                            var screen_images = [];

                            //Reads all whiteboard images into an array of objects w/ relative time
                            fs.readdir(unzipPath + "/whiteboard/", function(err, files)
                            {
                                if(err)
                                    return res.sendFail(err);

                                //Loops through folder to add all images to array
                                for(var i = 0; i < files.length;i++)
                                {
                                    var time = files[i].replace("whiteBoard", "");
                                    time = time.split("-")[0];

                                    time -= start_time;

                                    var fileObj = {};
                                    fileObj.time = time;
                                    fileObj.url = files[i];

                                    whiteboard_images.push(fileObj);
                                }

                                //Reads all computer images into an array of objects w/ relative time
                                fs.readdir(unzipPath + "/computer/", function(err, files)
                                {
                                    if(err)
                                        return res.sendFail(err);
                                    
                                    //Loops through folder to add all images to array
                                    for(var i = 0; i < files.length;i++)
                                    {
                                        var time = files[i].replace("computer", "");
                                        time = time.split("-")[0];

                                        time -= start_time;

                                        var fileObj = {};
                                        fileObj.time = time;
                                        fileObj.url = files[i];

                                        screen_images.push(fileObj);
                                    }

                                    //Creates a date based off of the start time provided to the API (times 100 to make milliseconds)
                                    var date = new Date(start_time * 1000);

                                    var video = unzipPath + "video.mp4";

                                    //Create lecture. No title, description and is invisible until modified by instructor
                                    database.lecture.createLecture(course_id, "","", date, videoPath, false, whiteboard_images, screen_images, function(err, lecture)
                                    {
                                        if(err)
                                            return res.sendFail(err);

                                        //Start of response object creation from returned lecture
                                        var resCourse = createResponseLecture(lecture);
                                        return res.sendSuccess(resCourse); 
                                    });
                                });

                            });
                        });
                    });
    
                    //TODO remove... Just an update on progress for unzipped files
                    unzipper.on('progress', function (fileIndex, fileCount) {
                        console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount);
                    });

                    //Idk what this is doing honestly... Maybe a blacklist of what not to extract?
                    unzipper.extract({
                        path: unzipPath,
                        filter: function (file) {
                            return file.type !== "SymbolicLink";
                        }
                    });
                }
            });
        });

        //Get a specific lecture
        router.get('/:course_id/lecture/:lecture_id', function(req,res) {

            //Todo
            //Different responses based on if instructor or student
            //Hide invisible ones form students only

            if(!req.params.course_id || !req.params.lecture_id) {
                res.sendFail("No valid lecture_id and/or course_id parameter");
            } else if(validator.isMongoId(req.params.lecture_id) == false) {   
                res.sendFail("lecture_id is not a valid MongoID");
            }else if(validator.isMongoId(req.params.course_id) == false) {   
                res.sendFail("course_id is not a valid MongoID");
            } else {
                database.course.lecture.getLectureById(req.params.lecture_id, function(err, lecture) {
                    if(err) {
                        res.sendFail(err);  
                    } else {
                        
                        var resCourse = createResponseLecture(lecture);
                        return res.sendSuccess(resCourse); 
                    }
                });
            }
        });

        //Edit a specific lecture
        router.put('/:course_id/lecture/:lecture_id', function(req,res) 
        {
            var title = req.body.title;
            var description = req.body.description;
            var visible = req.body.visible

            if(!req.params.course_id || !req.params.lecture_id) {
                res.sendFail("No valid lecture_id and/or course_id parameter");
            } else if(validator.isMongoId(req.params.lecture_id) == false) {   
                res.sendFail("lecture_id is not a valid MongoID");
            }else if(validator.isMongoId(req.params.course_id) == false) {   
                res.sendFail("course_id is not a valid MongoID");
            }
            else if(!title || !description || !visible) {   
                res.sendFail("Invalid parameters. Missing title, description, and/or visible");
            }
            else {
                database.course.lecture.updateLectureByID(req.params.lecture_id, title, description, visible,  function(err, lecture) {
                    if(err) {
                        res.sendFail(err);  
                    } else {
                        
                        var resCourse = createResponseLecture(lecture);
                        return res.sendSuccess(resCourse); 
                    }
                });
            }
        });

        //Delete a user from a course's roster
        router.delete('/:course_id/lecture/:lecture_id', function(req,res) 
        {

            if(!req.params.course_id || !req.params.lecture_id) {
                res.sendFail("No valid lecture_id and/or course_id parameter");
            } else if(validator.isMongoId(req.params.lecture_id) == false) {   
                res.sendFail("lecture_id is not a valid MongoID");
            }else if(validator.isMongoId(req.params.course_id) == false) {   
                res.sendFail("course_id is not a valid MongoID");
            }
            else {
                //TODO DELETE
                /*database.course.lecture.updateLectureByID(req.params.lecture_id, title, description, visible,  function(err, lecture) {
                    if(err) {
                        res.sendFail(err);  
                    } else {
                        
                        var resCourse = createResponseLecture(lecture);
                        return res.sendSuccess(resCourse);  
                    }
                });*/
            }
        });
    }
};


var createResponseLecture = function(lecture)
{  
    var resCourse = {};

    resCourse.lecture_id = lecture._id;
    resCourse.course_id = lecture.course;
    resCourse.date = lecture.date;
    resCourse.title = lecture.title;
    resCourse.visible = lecture.visible;
    resCourse.description = lecture.description;
    resCourse.video_url = lecture.video;
    resCourse.screen_image_urls = lecture.screenImages;
    resCourse.whiteboard_image_urls = lecture.whiteboardImages;

    return resCourse;
}
