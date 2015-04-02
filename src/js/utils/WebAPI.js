/*** Write and export all server API calls here ***/
var Promise = req('promise');
var request = require('superagent');
/*** We are going to need jQuery in the HTML ***/
function new_user(emailVal, passwordVal, fnameVal, lnameVal){

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

function get_user_priv(user_id){								   //Get user ID some how
	var promise = new Promise( function (resolve, reject){
		request
			.get('/user/' + user_id)
			.send({id : userID})
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


function change_user(user_id, fnameval, lnameVal){
	var promise = new Promise ( function (resolve, reject){
		request
			.put('/user/'+ user_id)
			.send({id : userID, first_name : fnameVal, last_name : lnameVal})
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

function delete_user(user_id){
	var promise = new Promise (function (resolve, reject){
		request
			.delete('/user/' + user_id)
			.send({id : user_id})
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



function auth_verify(verifyID){
	var promise = new Promise (function (resolve, reject){
		request
			.get('/auth/verify' + verifyID)
			.send({verify_id : verifyID})
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

function auth_login(email, password){
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

function auth_logout(){
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

function get_notifications(){
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

function mark_notifications_read(){
	var promise = new Promise (function (resolve, reject){
		request
			.delete('/user/notification')
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

function mark_notification_read(notification){
	var promise = new Promise (function (resolve, reject){
		request
			.post('/delete/notification/' + notification)
			.send({notification_id : notification})
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

function create_bookmark(course, lecture, labl, time){
	var promise = new Promise (function (resolve, reject){
		request
			.post('/user/bookmark')
			.send({course_id : course, lecture_id : lecture, label : labl, time : time})
			end( function (err, res){
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

function delete_bookmark(bookmark_id){
	var promise = new Promise (function (resolve, reject){
		request
			.delete('/user/bookmark/' + bookmark_id)
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
			});
		});
	return promise;
}

function edit_bookmark(bookmark_id){
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

function course_bookmark(course_id){
	var promise = new Promise (function (resolve, reject){
		request
			.get('/user/bookmark/course/' + course_id)
			.send({course_id : course_id})
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

function lecture_bookmark(course_id, lecture_id){
	var promise = new Promise (function (resolve, reject){
		request
			.get('/user/bookmark/'+course_id+'/lecture/'+lecture_id)
			.send({course_id : course_id, lecture_id : lecture_id});
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

function add_course(department, course_name, course_number, term, year, instructor_email){
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

function get_course(course_id){
	var promise = new Promise( function (resolve, reject){
		request
			.get('/course/' + course_id)
			.send({course_id : course_id})
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

function edit_course(course_id, department, course_name, course_number, term, year, instructor_email){
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

function delete_course(course_id){
	var promise = new Promise( function (resolve, reject){
		request
			.delete('/course/'+course_id)
			.send({course_id : course_id})
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


// Responses should call an Action to handle the payload
