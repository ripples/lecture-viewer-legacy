/*** Write and export all server API calls here ***/
var Promise = req('promise');
var request = require('superagent');
/*** We are going to need jQuery in the HTML ***/
var API {
	new_user : function (emailVal, passwordVal, fnameVal, lnameVal){

		var promise = new Promise ( function (resolve, reject){
				request
					.post('/user')
					.send( { email : emailVal, password : passwordVal, first_name : fnameVal, last_name : lnameVal })
					.end( function (err, res){
						if(res.status === "success"){
							resolve(res.data);
						}
						else if(err){
							reject(err);
						}
						else{
							reject(res);
						}
					});	  
				});
			return promise;
	}

	/***
	TO USE:

	var doneUser = newUser();
	//doneUser.then (function (resolved_data){
		//do something with data
		//Redirect to index or whatever with the resolved_data
	},
	 function (reject_data){
	 	if(reject_data.status === "fail"){
			//redirect to login or whatever with the reject_data.message
	 	}
	 	else{
			//redirect to error or whatever with the reject_data.error
	 	}
	 });
	***/

	get_user_priv : function (user_id){								   //Get user ID some how
		var promise = new Promise( function (resolve, reject){
			request
				.get('/user/' + user_id)
				.end( function (err, res){
					if(res.status === "success"){						    //If the data status is success,
						resolve(res.data);										//Do something with the first_name, last_name, and course_list
					}
						else if(err){
							reject(err);
						} else {
							reject(res);										//Do something if the request failed
						}
				});
			});
		return promise;	
	}


	 change_user : function (user_id, fnameval, lnameVal){
		var promise = new Promise ( function (resolve, reject){
			request
				.put('/user/'+ user_id)
				.end( function (err, res){
					if(res.status === "success"){
						resolve(res.data);
					}
					else if(err){
						reject(err);
					}
					else{
						reject(res);
					}
				});
			});
		return promise;
	}

	delete_user : function (user_id){
		var promise = new Promise (function (resolve, reject){
			request
				.del('/user/' + user_id)
				.end( function (err, res){
					if(res.status === "success"){
						resolve(res.data);
					} else if(err){
						reject(err);
					} else{
						reject(res);
					}
				});
			});
		return promise;
	}



	auth_verify : function (verifyID){
		var promise = new Promise (function (resolve, reject){
			request
				.get('/auth/verify' + verifyID)
				.end( function (err, res){
					if(res.status === "success"){
						resolve(res.data);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	login : function (email, password){
		var promise = new Promise ( function ( resolve, reject){
			request
				.post('/auth/login')
				.send({user_email : email, user_password : pass})
				.end( function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					}
					else{
						reject(res);
					}
				});
			});
		return promise;
	}

	logout : function (){
		var promise = new Promise (function (resolve, reject){
			request
				.post('/auth/logout')
				.end(function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	get_notifications : function (){
		var promise = new Promise (function (resolve, reject){
			request
				.get('/user/notification')
				.end(function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	mark_notifications_read : function (){
		var promise = new Promise (function (resolve, reject){
			request
				.del('/user/notification')
				.end(function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	mark_notification_read : function (notification){
		var promise = new Promise (function (resolve, reject){
			request
				.del('/delete/notification/' + notification)
				.end(function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	create_bookmark : function (course, lecture, labl, time){
		var promise = new Promise (function (resolve, reject){
			request
				.post('/user/bookmark')
				.send({course_id : course, lecture_id : lecture, label : labl, time : time})
				.end( function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	delete_bookmark : function (bookmark_id){
		var promise = new Promise (function (resolve, reject){
			request
				.del('/user/bookmark/' + bookmark_id)
				.end( function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	edit_bookmark : function (bookmark_id){
		var promise = new Promise (function (resolve, reject){
			request
				.put('/user/bookmark/'+bookmark_id)
				.send({bookmark_id : bookmark_id})
				.end( function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				})
			});
		return promise;
	}

	course_bookmark : function (course_id){
		var promise = new Promise (function (resolve, reject){
			request
				.get('/user/bookmark/course/' + course_id)
				.end( function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	lecture_bookmark : function (course_id, lecture_id){
		var promise = new Promise (function (resolve, reject){
			request
				.get('/user/bookmark/'+course_id+'/lecture/'+lecture_id)
				.end( function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	add_course : function (department, course_name, course_number, term, year, instructor_email){
		var promise = new Promise (function (resolve, reject){
			request
				.post('/course')
				.send({department : department, course_name : course_name, course_number : course_number, term : term, year : year, instructor_email : instructor_email})
				.end( function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	get_course : function (course_id){
		var promise = new Promise( function (resolve, reject){
			request
				.get('/course/' + course_id)
				.end( function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	edit_course : function (course_id, department, course_name, course_number, term, year, instructor_email){
		var promise = new Promise( function (resolve, reject){
			request
				.put('/course/'+course_id)
				.send({course_id : course_id, department : department, course_name : course_name, course_number : course_number, term : term, year : year, instructor_email : instructor_email})
				.end( function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	delete_course : function (course_id){
		var promise = new Promise( function (resolve, reject){
			request
				.del('/course/'+course_id)
				.end( function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	get_comments : function (course_id, lecture_id){
		var promise = new Promise( function (resolve, reject){
			request
				.get('/course/'+course_id +'/lecture/' +lecture_id)
				.end( function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
		});
		return promise;
	}

	post_comment : function (course_id, lecture_id, content, date, time){
		var promise = new Promise(function (resolve, reject){
			request
				.post('/course/'+course_id+'/lecture/'+lecture_id)
				.send({content : content, posted_date: date, time:time})
				.end(function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	delete_comment : function (course_id, lecture_id, comment_id){
		var promise = new Promise(function (resolve, reject){
			request
				.del('/course/'+course_id+'/lecture/'+lecture_id+'/comment/'+comment_id)
				.end(function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	edit_comment : function (course_id, lecture_id, comment_id, content){
		var promise = new Promise(function (resolve, reject){
			request
				.put('/course/'+course_id+'/lecture/'+lecture_id+'/comment/'+comment_id)
				.send({content : content})
				.end(function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	reply_comment : function (course_id, lecture_id, comment_id, content, date, time){
		var promise = new Promise(function (resolve, reject){
			request
				.post('/course/'+course_id+'/lecture/'+lecture_id+'/comment/'+comment_id)
				.send({content : content, posted_date: date, time:time})
				.end(function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	get_roster : function (course_id){
		var promise = new Promise(function (resolve, reject){
			request
				.get('/course/'+course_id+'/roster/')
				.end(function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	post_user_to_roster : function (course_id, email){
		var promise = new Promise(function (resolve, reject){
			request
				.post('/course/'+course_id+'/roster/')
				.send({user_email : email})
				.end(function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	delete_user_roster : function (course_id, user_id){
		var promise = new Promise(function (resolve, reject){
			request
				.del('/course/'+course_id+'/roster/'+user_id)
				.end(function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	delete_attachment : function (course_id, lecture_id, attachment_id){
		var promise = new Promise(function (resolve, reject){
			request
				.del('/course/'+course_id+'/lecture/'+lecture_id+'/attachment/'+attachment_id)
				.end(function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	get_lecture : function (course_id, lecture_id){
		var promise = new Promise(function (resolve, reject){
			request
				.get('/course/'+course_id+'/lecture/'+lecture_id)
				.end(function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	edit_lecture : function (course_id, lecture_id, title, description, time_posted, time_length, thumbnail){
		var promise = new Promise(function (resolve, reject){
			request
				.put('/course/'+course_id+'/lecture/'+lecture_id)
				.send({title : title, description : description, time_posted : time_posted, time_length : time_length, thumbnail : thumbnail})
				.end(function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

	delete_lecture : function (course_id, lecture_id){
		var promise = new Promise(function (resolve, reject){
			request
				.del('/course/'+course_id+'/lecture/'+lecture_id)
				.end(function (err, res){
					if(res.status === "success"){
						resolve(res);
					}
					else if(err){
						reject(err);
					} else {
						reject(res);
					}
				});
			});
		return promise;
	}

}

module.exports = API;

// Responses should call an Action to handle the payload
