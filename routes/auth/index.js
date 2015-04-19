var express = require('express');
var router = express.Router();

var database = require("../../database/index.js");


//Logs a user in
router.post('/login', function(req,res) 
{
	var email = req.body.email;
	var password = req.body.password;

	res.send("Login! " + email + " : " + password);
});

//Logs a user out
router.post('/logout', function(req,res) 
{
	res.send("Logout!");
});

//Verify email with link
router.get('/verify/:verify_id', function(req,res) 
{
	res.send("Verify! " + req.params.verify_id);
});


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
