var formidable = require('formidable')
var fs = require('fs-extra');
var uuid = require('node-uuid');

//Attachment API
module.exports = {
    setup: function(router) {
        //Add an attachment to a lecture
        router.post('/:course_id/lecture/:lecture_id/attachment', function(req,res)
        {
        	responseObject = {data:{}};

        	//Creates form that can read in file
            var form = new formidable.IncomingForm();
            //Starts parsing of the file
            form.parse(req, function(err, fields, files) {

                //Gets the temp path the file was uploaded to

                if(files['upload'] != undefined)
                {
                	var file = files['upload'];
	                var tempPath = file['path'];

	                console.log(file);

	                console.log("Received upload. Placed in " + tempPath);

					//TODO actually define where it goes.
					//I assume this will be in the media/course/lecture/attachments folder eventually
	                var attachmentPath = "media/attachments/";
	                var newPath = attachmentPath + file['name'];// + uuid.v1() + extention; //Maybe we need to keep the name...


					fs.move(tempPath, newPath, {clobber :true}, function (err) {
						if (err)
						{
							responseObject.status = "error";
                    		responseObject.data.message = "Failed to save the file correctly";
							res.send(responseObject);

							console.log(err);

							return;
						}

						//TODO Database saving goes here

						console.log("File saved in " + newPath);

						responseObject.status = "success";
                    	responseObject.data.file = newPath;

						res.send(responseObject);
					});

	            }else{
	            	console.log("File is missing");

                    responseObject.status = "fail";
                    responseObject.data.message = "No file was provided when uploading";

                    res.send(responseObject);
	            }
            });
        });

        //Delete an attachment from a lecture
        router.delete('/:course_id/lecture/:lecture_id/attachment/:attachment_id', function(req,res)
        {
            //TODO no delete specific attachment db call?
        });
    }
};
