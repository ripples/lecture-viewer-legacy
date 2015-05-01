var should = require('should');
var request = require('supertest');

var database = require('../../database/index.js');

var url = 'http://localhost:3000';


describe('Lecture', function() {
	

	this.timeout(20000);


	var test_man_lecture = {
		"title" : "Lecture 1: How to API",
		"description" : "For the first lecture, we will REST",
		"manual" : "true",
		"upload" : __dirname + "/testUploadFiles/video.mp4"
	};

	var test_auto_lecture = {
		"start_time" : "1421938501",
		"upload" : __dirname + "/testUploadFiles/good_sample.zip"
	};

	var test_update_man_lecture = {
		"title" : "New Title",
		"description" : "New Description",
		"visible" : "false"
	}



    var user_id = "";
    var user_token = "";
    var lecture_id = "";
    var course_id = "dfaa1e1f3c23000000007855";


	before(function(done) {
		
		database.lecture.dropLecturesDatabase(function(err)
		{
			should.not.exist(err);
			done();
		})
	});

	describe('Valid calls', function() {
		
		it('Create auto lecture', function(done) 
		{
			request(url)
			   .post('/course/' + course_id + '/lecture')
			   .field('start_time',test_auto_lecture.start_time)
			   .attach('upload', test_auto_lecture.upload)
			   .end(function(err, res)
			   {
			   		res.body.status.should.equal('success', "Failed to create auto lecture : " + JSON.stringify(res.body.data.message));

			   		res.body.data.video_url.indexOf("video.mp4").should.not.equal(-1);
			   		res.body.data.title.should.equal("");
			   		res.body.data.description.should.equal("");
			   		res.body.data.whiteboard_image_urls.should.length(4);
			   		res.body.data.screen_image_urls.should.length(4);
			   		res.body.data.visible.should.equal(false);
			   		res.body.data.course_id.should.equal(course_id);
			   		res.body.data.should.have.properties("lecture_id");

			   		lecture_id = res.body.data.lecture_id;

			   		done();
			   });
		});

		it('Create man lecture', function(done) 
		{
			request(url)
			   .post('/course/' + course_id + '/lecture')
			   .field('title', test_man_lecture.title)
			   .field('description', test_man_lecture.description)
			   .field('manual', test_man_lecture.manual)
			   .attach('upload', test_man_lecture.upload)
			   .end(function(err, res)
			   {
			   		res.body.status.should.equal('success', "Failed to create lecture : " + res.body.data.message);

			   		res.body.data.video_url.indexOf("video.mp4").should.not.equal(-1);
			   		res.body.data.title.should.equal(test_man_lecture.title);
			   		res.body.data.description.should.equal(test_man_lecture.description);
			   		res.body.data.whiteboard_image_urls.should.length(0);
			   		res.body.data.screen_image_urls.should.length(0);
			   		res.body.data.visible.should.equal(true);
			   		res.body.data.course_id.should.equal(course_id);
			   		res.body.data.should.have.properties("lecture_id");

			   		lecture_id = res.body.data.lecture_id;

			   		done();
			   });
		});

		it('Get lecture', function(done) {
			
			request(url)
			   .get('/course/' + course_id + '/lecture/' + lecture_id)
			   .end(function(err, res)
			   {
			   		res.body.status.should.equal('success', "Failed to get lecture : " + res.body.data.message);

			   		res.body.data.video_url.indexOf("video.mp4").should.not.equal(-1);
			   		res.body.data.title.should.equal(test_man_lecture.title);
			   		res.body.data.description.should.equal(test_man_lecture.description);
			   		res.body.data.whiteboard_image_urls.should.length(0);
			   		res.body.data.screen_image_urls.should.length(0);
			   		res.body.data.visible.should.equal(true);
			   		res.body.data.course_id.should.equal(course_id);
			   		res.body.data.lecture_id.should.equal(lecture_id);

			   		done();
			   });
		});

		it('Edit lecture', function(done) {
			
			request(url)
			   .put('/course/' + course_id + '/lecture/' + lecture_id)
			   .send(test_update_man_lecture)
			   .end(function(err, res)
			   {
			   		res.body.status.should.equal('success', "Failed to edit lecture : " + res.body.data.message);

			   		res.body.data.video_url.indexOf("video.mp4").should.not.equal(-1);
			   		res.body.data.title.should.equal(test_update_man_lecture.title);
			   		res.body.data.description.should.equal(test_update_man_lecture.description);
			   		res.body.data.whiteboard_image_urls.should.length(0);
			   		res.body.data.screen_image_urls.should.length(0);
			   		res.body.data.visible.should.equal(false);
			   		res.body.data.course_id.should.equal(course_id);
			   		res.body.data.lecture_id.should.equal(lecture_id);

			   		//Verify it was actually changed
			   		request(url)
					   .get('/course/' + course_id + '/lecture/' + lecture_id)
					   .end(function(err, res)
					   {
					   		res.body.status.should.equal('success', "Failed to get lecture : " + res.body.data.message);

					   		res.body.data.video_url.indexOf("video.mp4").should.not.equal(-1);
					   		res.body.data.title.should.equal(test_update_man_lecture.title);
					   		res.body.data.description.should.equal(test_update_man_lecture.description);
					   		res.body.data.whiteboard_image_urls.should.length(0);
					   		res.body.data.screen_image_urls.should.length(0);
					   		res.body.data.visible.should.equal(false);
					   		res.body.data.course_id.should.equal(course_id);
					   		res.body.data.lecture_id.should.equal(lecture_id);

					   		done();
					   });


			   });
		});

		it('Delete lecture', function(done) {
			
			//Route not implpemented yet
			//this.skip();
			//return;

			request(url)
			   .delete('/course/' + course_id + '/lecture/' + lecture_id)
			   .end(function(err, res)
			   {
			   		res.body.status.should.equal('success', "Failed to delete lecture : " + res.body.data.message);

			   		res.body.data.video_url.indexOf("video.mp4").should.not.equal(-1);
			   		res.body.data.title.should.equal(test_update_man_lecture.title);
			   		res.body.data.description.should.equal(test_update_man_lecture.description);
			   		res.body.data.whiteboard_image_urls.should.length(0);
			   		res.body.data.screen_image_urls.should.length(0);
			   		res.body.data.visible.should.equal(false);
			   		res.body.data.course_id.should.equal(course_id);
			   		res.body.data.lecture_id.should.equal(lecture_id);
			
			   		request(url)
					   .get('/course/' + course_id + '/lecture/' + lecture_id)
					   .end(function(err, res)
					   {	
					   		res.body.status.should.equal('fail', "Shouldn't have been able to get deleted lecture " + res.body.data);

					   		done();
					   });					
			   	});
		});
	});
});