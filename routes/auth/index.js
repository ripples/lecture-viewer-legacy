var express = require('express');
var router = express.Router();

var database = require("../../database");
var auth = require('../../authentication');

//Logs a user in
router.post('/login', function(req,res)
{
	var email = req.body.email;
	var password = req.body.password;

	if(!req.body || !password)
		return res.send(403, {
			status: 'failed',
			data: {
				message: 'Missing email and/or password.'
			}
		});

	database.user.getUserByCredentials(email, password, function(err, user) {
		// Error querying database
		if(err) {
			console.log(err);
			return res.send(403, {
				status: 'failed',
				data: {
					message: 'Error querying database for user data.' // or use err
				}
			});
		}

		// User couldn't be found in the database
		if(!user) {
			return res.send(403, {
				status: 'failed',
				data: {
					message: 'User doesn\'t exist in database.'
				}
			});
		}

		// We create the token, then send it to the client
		auth.createAndStoreToken(user, function(err, token) {
			// Error encountered while creating the token and/or adding to Redis
			if(err) {
				console.log(err);
				return res.send(403, {
					status: 'failed',
					data: {
						message: 'Error creating access token.'
					}
				});
			}

			// Sending access token to client
			res.send(200, {
				status: 'success',
				data: {
					token: token
				}
			});
		});
	});
});

//Logs a user out - assumes token in body
router.post('/logout', function(req,res)
{
	auth.expireToken(req.body.token, function(err) {
		res.send(200, {
			status: 'success',
			data: {}
		});
	});
});

//Verify email with link
router.get('/verify/:verify_id', function(req,res)
{
	res.send("Verify! " + req.params.verify_id);
});

router.get('/example', auth.verify, function(req, res) {
	res.send('worked!');
})


//Reset email sent email with link
router.post('/password/forgot', function(req,res)
{
	var email = req.body.email;
	res.send("Forgot! " + email);
});

//Reset password after getting email
router.post('/password/reset', function(req,res)
{
	var password = req.body.password;
	res.send("Reset! " + password);
});

module.exports = router;
