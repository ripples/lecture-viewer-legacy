var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    host: 'localhost',
    port: 25,
    auth: {
        user: 'username',
        pass: 'password'
    }
}));

var mailOptions = {
    from: "Lecture Viewer <test@test.com>", // Sender address
    to: "jyanyuk@umass.edu", // List of receivers
    subject: "Test from Lecture Viewer Emailer", // Subject line
    text: "Testing Lecture Viewer Emailer", // Plaintext body
    html: "<b>Testing Lecture Viewer Emailer</b>\n<h1>Hello :D</h1>" // HTML body
}

exports.test = function() {
    transporter.sendMail(mailOptions, function(err, res) {
        console.log(err || res);
    });
}
