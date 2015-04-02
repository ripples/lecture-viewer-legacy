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

function updateBookmark(bookmarkBody, bookmarkID){

}


// Responses should call an Action to handle the payload
