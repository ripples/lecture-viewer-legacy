/*** Write and export all server API calls here ***/
var Promise = req('promise');
var request = require('superagent');
/*** We are going to need jQuery in the HTML ***/
function newUser(emailVal, passwordVal, fnameVal, lnameVal){

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

function getUserPriv(user_id){								   //Get user ID some how
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


function changeUser(user_id, fnameval, lnameVal){
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

function deleteUser(user_id){
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



function authVerify(verifyID){
	var promise = new Promise (function (resolve, reject){
		$.ajax({
			type 	 : 'GET',
			url		 : '/auth/verify'+verify_id,
			data 	 : {verify_id : verifyID},
			dataType : 'json'
		}).done (function (data){
			if(data.status === 'success'){
				resolve(data.data);
			}
			else{
				reject(data);
			}
		});
	});
	return promise;
}

function authLogin(){
	var email = $("input[ref='email'").val();
	var passVal = $("input[ref='pass'").val();
	var promise = new Promise ( function ( resolve, reject){
		$.ajax({
			type 	 : 'POST',
			url		 : '/auth/login'
			data 	 : {user_email : email, user_password : pass},
			dataType : 'json'
		}).done(function (data){
			if(data.status === 'success'){
				resolve(data.data);
			}
			else{
				reject(data);
			}
		});
	});
	return promise;
}

function authLogout(){
	var promise = new Promise (function (resolve, reject){
		$.ajax({
			type 	 : 'POST',
			url		 : '/auth/logout'
			data 	 : {},
			dataType : 'json'
		}).done(function (data){
			if(data.status === 'success'){
				resolve(data.data);
			}
			else{
				reject(data);
			}
		});
	});
	return promise;
}

function updateBookmark(bookmarkBody, bookmarkID){

}


// Responses should call an Action to handle the payload
