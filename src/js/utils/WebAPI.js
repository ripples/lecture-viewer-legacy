/*** Write and export all server API calls here ***/
var Promise = require('promise');

/*** We are going to need jQuery in the HTML ***/
function newUser(){
	var emailVal 	 = $("input[name='email'").val();		    //Grab information from the new user form
	var passwordVal  = $("input[name='password").val();
	var fnameVal 	 = $("input[name='fname'").val();
	var lnameVal 	 = $("input[name='lname'").val();

	var promise = new Promise ( function (resolve, reject){
	$.ajax({
	    type 	 : 'POST',										//Send information to user post route
	    url  	 : '/user',
	    data 	 : { email : emailVal, password : passwordVal, first_name : fnameVal, last_name : lnameVal },
	    dataType : 'json'
	  }).done( function (data){
	  	if(data.status === "success"){						   //If we successful get the data as a response
			resolve(data);  									//resolve the data
	  	}
	  	else {					   								//If we fail at getting the data or if there is an error
	  		 reject(data.status);								//Do something to designate that it failed.
	  		}
	  });
	});
	return promise;



}

function getUserPriv(){
	var userID;												   //Get user ID some how
	$.ajax({
		type : 'GET',
		url  : '/user',
		data : {id : userID},
		dataType : 'json'
	}).done( function (data){	
		if(data.status === "success"){						    //If the data status is success,
															   //Do something with the first_name, last_name, and course_list
		}
		else if (data.status === "failed"){
															   //Do something if the request failed
		}
	});
}
// Responses should call an Action to handle the payload
