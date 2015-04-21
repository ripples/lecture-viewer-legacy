var should  = require('should');
var assert  = require('assert');
var request = require('supertest');

var database = require("../../database/index.js");

var url = 'http://localhost:3000';
var uidreq = 2359;

describe('User', function() {

    this.timeout(10000);

    var login_admin =  {
        email : "admin@umass.edu",
        password : "password",
        first_name : "first",
        last_name : "last"
    };

    var login_admin_id = "";
    var login_admin_auth = "";

    var login_student =  {
        email : "student@umass.edu",
        password : "password",
        first_name : "first",
        last_name : "last"
    };

    var login_student_id = "";
    var login_student_auth = "";



    before(function(done) 
    {
        database.user.dropUserDatabase(function()
        {              
            database.user.createUser(login_admin.email,login_admin.password,login_admin.first_name,login_admin.last_name, "admin", function(err, user)
            {
                if(err)
                    console.log(err);

                login_admin_id = user._id;

                request(url)
                    .post('/auth/login')
                    .send({
                        "email" : login_admin.email,
                        "password" : login_admin.password
                    })
                    .end(function(err, res) {
                        login_admin_auth = res.body.data.token;
                        done();
                    });
            });
        });
    });

    describe('Valid calls', function()
    {
        var updateUser = {
            first_name: 'Updated', 
            last_name: 'Names'
        }

        it('Creating user', function(done) {
            request(url)
                .post('/user')
                .send(login_student)
                .end(function(err, res) {

                    login_student_id = res.body.data.user_id;

                    res.body.status.should.equal('success');
                    done();
                });
        });

        it('Logging in user', function(done) {
            request(url)
                .post('/auth/login')
                .send(login_student)
                .end(function(err, res) {

                    login_student_auth = res.body.data.token;
                    res.body.status.should.equal('success');

                    done();
                });
        });

        it('Getting current user', function(done) {
            request(url)
                .get('/user')
                .set('Authorization', login_student_auth)
                .end(function(err, res) {
                    if(err) return done(err);
                    res.body.status.should.equal('success');

                    var user = res.body.data;

                    user.should.have.properties('first_name', 'last_name', 'user_id');
                    user.first_name.should.equal(login_student.first_name);
                    user.last_name.should.equal(login_student.last_name);
                    user.user_id.should.equal(login_student_id);

                    done();
                });
        });

        it('Updating current user', function(done)
        {
            request(url)
                .put('/user')
                .set('Authorization', login_student_auth)
                .send(updateUser)
                .end(function(err, res) 
                {
                    if(err) return done(err);

                    res.body.status.should.equal('success');

                    var user = res.body.data;

                    user.should.have.properties('first_name', 'last_name', 'user_id', 'email');
                    user.first_name.should.equal(updateUser.first_name);
                    user.last_name.should.equal(updateUser.last_name);
                    user.user_id.should.equal(login_student_id);
                    user.email.should.equal(login_student.email);
                    
                    done();
                });
        });

        it('Deleting current user', function(done) {
        request(url)
            .delete('/user')
            .set('Authorization', login_student_auth)
            .end(function(err, res) {
                if(err) return done(err);
                res.body.status.should.equal('success');
                done();
            });
        });

        describe('Admin calls', function()
        {
            before(function(done) {
                request(url)
                    .post('/user')
                    .send(login_student)
                    .end(function(err, res) {

                        login_student_id = res.body.data.user_id;

                        res.body.status.should.equal('success');
                        done();
                    });
                });

            it('Getting other user', function(done)
            {
                request(url)
                .get('/user/' + login_student_id)
                .set('Authorization', login_admin_auth)
                .end(function(err, res) {
                    if(err) return done(err);
                    res.body.status.should.equal('success');

                    var user = res.body.data;

                    user.should.have.properties('first_name', 'last_name', 'user_id');
                    user.first_name.should.equal(login_student.first_name);
                    user.last_name.should.equal(login_student.last_name);
                    user.user_id.should.equal(login_student_id);

                    done();
                });
            });

            it('Delete other user', function(done)
            {
                request(url)
                .delete('/user/' + login_student_id)
                .set('Authorization', login_admin_auth)
                .end(function(err, res) {
                    if(err) return done(err);
                    
                    res.body.status.should.equal('success');

                    var user = res.body.data;

                    user.should.have.properties('first_name', 'last_name', 'user_id');
                    user.first_name.should.equal(login_student.first_name);
                    user.last_name.should.equal(login_student.last_name);
                    user.user_id.should.equal(login_student_id);

                    done();
                });
            });


        });
    });


    describe('Invalid calls', function()
    {
        before(function(done)
        {
            request(url)
                .post('/user')
                .send(login_student)
                .end(function(err, res) {

                    login_student_id = res.body.data.user_id;
                    res.body.status.should.equal('success');

                    request(url)
                        .post('/auth/login')
                        .send(login_student)
                        .end(function(err, res) {

                            login_student_auth = res.body.data.token;
                            res.body.status.should.equal('success');

                            done();
                        });
                });
        });

        describe('Create', function()
        {
            var test_user = {email: 'good@email.com', 
                     password: 'pw123', 
                     first_name: 'Tim', 
                     last_name: 'Richards'};

            var bad_email_user = JSON.parse(JSON.stringify(test_user));
            bad_email_user.email = "bad@email@email.com";

            var missing_email_user = JSON.parse(JSON.stringify(test_user));
            missing_email_user.email = undefined;

            var missing_password_user = JSON.parse(JSON.stringify(test_user));
            missing_password_user.password = undefined;

            it('Create user invalid email', function(done) {
                request(url)
                    .post('/user')
                    .send(bad_email_user)
                    .end(function(err, res) {
                        res.body.status.should.equal('fail');
                        res.body.data.message.should.equal('Not a valid email address');
                        done();
                    });
            });

            it('Create user missing email', function(done) {

                request(url)
                    .post('/user')
                    .send(missing_email_user)
                    .end(function(err, res) {
                        res.body.status.should.equal('fail');
                        res.body.data.message.should.equal('Incorrect parameters');
                        done();
                    });
            });

            it('Create user missing password', function(done) {

                request(url)
                    .post('/user')
                    .send(missing_password_user)
                    .end(function(err, res) {
                        res.body.status.should.equal('fail');
                        res.body.data.message.should.equal('Incorrect parameters');
                        done();
                    });
            });
        });
    

        describe('Update', function()
        {
            var updateUser = {
                first_name: 'Updated', 
                last_name: 'Names'
            }

            it('Updating user no name', function(done)
            {
                request(url)
                    .put('/user/')
                    .set('Authorization', login_admin_auth)
                    .send({})
                    .end(function(err, res) 
                    {
                        if(err) return done(err);

                        res.body.status.should.equal('fail');
                        res.body.data.message.should.equal("Did not supply a first_name and last_name");
                        
                        done();
                    });
            });
        });


        describe('Delete', function()
        {
            it('Delete user invalid id', function(done) {
                request(url)
                .delete('/user/baduserid')
                .set('Authorization', login_admin_auth)
                .end(function(err, res) {
                    if(err) return done(err);
                    res.body.status.should.equal('fail');
                    res.body.data.message.should.equal('User ID is not a valid MongoID');
                    done();
                });
            });

            it('Delete other user not admin', function(done) {
                request(url)
                    .delete('/user/' + login_admin_id)
                    .set('Authorization', login_student_auth)
                    .end(function(err, res) {
                        res.body.status.should.equal('fail');
                        res.body.data.message.should.equal('Not an admin');
                        done();
                    });
            });
        });

        describe('Get', function()
        {
            it('Getting user invalid id', function(done) {
                request(url)
                    .get('/user/baduserid')
                    .set('Authorization', login_admin_auth)
                    .end(function(err, res) {
                        if(err) return done(err);
                        res.body.status.should.equal('fail');
                        res.body.data.message.should.equal('User ID is not a valid MongoID');
                        done();
                    });
            });

            it('Getting user unknown id', function(done) {
                request(url)
                    .get('/user/552e018979f1adf330530338')
                    .set('Authorization', login_admin_auth)
                    .end(function(err, res) {
                        if(err) return done(err);
                        res.body.status.should.equal('fail');
                        res.body.data.message.should.equal('userID does not exist');
                        done();
                    });
            });
        });
    });

    

    /*
    it('/:user_id [PUT]', function(done) {
        request(url)
            .put('/user/'+uidreq)
            .end(function(err, res) {
                if(err) return done(err);
                res.body.status.should.equal('success');
                done();
            });
    });

    it('/:user_id [DELETE]', function(done) {
        request(url)
            .delete('/user/'+uidreq)
            .end(function(err, res) {
                if(err) return done(err);
                res.body.status.should.equal('success');
                done();
            });
    });

    */
});
