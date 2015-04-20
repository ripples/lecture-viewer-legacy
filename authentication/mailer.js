var nodemailer = require('nodemailer');

var config = require('./config');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.VERIFIER_EMAIL_ADDR,
        pass: config.VERIFIER_EMAIL_PASS
    }
});

function send(verify_id, email_address, cb) {
    var verificationURL = 'http://localhost:3000/auth/verify/' + verify_id;

    var mailOptions = {
        from: 'CS497 Lecture Viewer <' + config.VERIFIER_EMAIL_ADDR + '>', // Sender address
        to: email_address, // List of receivers
        subject: 'Verify your email address', // Subject line
        text: 'Thanks for signing up! \nTo confirm your email address with the CS497 Lecture Viewer, click on the link below: \n' + verificationURL, // Plaintext body
        html: '<h2>Thanks for signing up! </h2>\nTo confirm your email address with the CS497 Lecture Viewer, click on the link below: \n<a href="' + verificationURL + '">Verify Email</a>' // HTML body
    }

    transporter.sendMail(mailOptions, function(err, res) {
        cb(err, res);
    });
}

exports.send = send;
