var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt-nodejs');

var database = require("../../database");
var auth = require('../../authentication');

// Logs a user in
router.post('/login', function(req,res) {
	var email = req.body.email;
	var password = req.body.password;

	if(!req.body || !password) {
		return res.sendFail('Missing email and/or password.');
	}

	database.user.getUserByEmail(email, function(err, user) {
		// Error querying database
		if(err) {
			console.log(err);
			return res.sendFail(err) // or use err
		}

		// User couldn't be found in the database
		if(!user) {
			return res.sendFail('User doesn\'t exist in database.');
		}

		// Compare the plaintext password with the hashed password held in db
		bcrypt.compare(password, user.password, function(err, result) {
			// Passwords don't match
			if(!result) {
				return res.sendFail('Password does not match');
			} else {
				// Passwords match; we create the token, then send it to the client
				auth.createAndStoreToken(user, function(err, token) {
					// Error encountered while creating the token and/or adding to Redis
					if(err) {
						console.log(err);
						return res.sendFail('Error creating access token.');
					}

					// Sending access token to client
					res.sendSuccess({ token: token });
				});
			}
		});
	});
});

// Logs a user out - assumes token in body
router.post('/logout', function(req,res) {
	auth.expireToken(req.body.token, function(err) {
		res.sendSuccess({});
	});
});

// Example of a basic protected route
router.get('/example1', auth.verify, function(req, res) {
	// ...
	// user logged in
	// ...
});

// Example of a protected route, which also checks user role
router.get('/example2', auth.verify, function(req, res) {
	var user = req.user;
	if(user.role == 'instructor') {
		// ...
		// user logged in as instructor
		// ...
	} else {
		// ...
		// user logged in as role other than instructor
		// ...
	}
});

// Verify email with link
router.get('/verify/:verify_id', function(req,res) {
	var decryptedUserID = decryptVerificationID(req.params.verify_id);

	database.user.getUserByID(decryptedUserID, function(err, user) {
		// Error querying database
		if(err) {
			console.log(err);
			return res.sendFail(err) // or use err
		}

		// User couldn't be found in the database; verification url is invalid
		if(!user) {
			// Front end should have a page for invalid verification url
			return res.send('Invalid verification url!');
		}

		// TODO: User's role should be set to verified at this point
		// Then, front end should return page specifying successful verification of email
		return res.send('Successfully verified your email address, ' + user.username + '!');
	});
});

/*--------------------------------------
 | Need to talk this over with Ryan
 *-------------------------------------*/
// Reset email sent email with link
router.post('/password/forgot', function(req,res) {
	var email = req.body.email;
	res.send("Forgot! " + email);
});

// Reset password after getting email
router.post('/password/reset', function(req,res) {
	var password = req.body.password;
	res.send("Reset! " + password);
});

module.exports = router;
