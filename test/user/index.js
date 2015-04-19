var should  = require('should');
var assert  = require('assert');
var request = require('supertest');

var database = require("../../database/index.js");

var url = 'http://localhost:3000';
var uidreq = 2359;

describe('User', function() {

    this.timeout(10000);

    //Mock Data
    var body =  {email: 'me@me.me', 
                 password: 'pw123', 
                 first_name: 'Tim', 
                 last_name: 'Richards'};


    describe('Invalid calls', function()
    {
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

            it('Updating user invalid id', function(done)
            {
                request(url)
                    .put('/user/baduserid')
                    .send(updateUser)
                    .end(function(err, res) 
                    {
                        if(err) return done(err);

                        res.body.status.should.equal('fail');
                        res.body.data.message.should.equal("User ID is not a valid MongoID");
                        
                        done();
                    });
            });

            it('Updating user unknown id', function(done)
            {
                request(url)
                    .put('/user/552e018979f1adf330530338')
                    .send(updateUser)
                    .end(function(err, res) 
                    {
                        if(err) return done(err);

                        res.body.status.should.equal('fail');
                        res.body.data.message.should.equal("userID does not exist");
                        
                        done();
                    });
            });

            it('Updating user no name', function(done)
            {
                request(url)
                    .put('/user/552e018979f1adf330530338')
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
                .end(function(err, res) {
                    if(err) return done(err);
                    res.body.status.should.equal('fail');
                    res.body.data.message.should.equal('User ID is not a valid MongoID');
                    done();
                });
            });
        });

        describe('Get', function()
        {
            it('Getting user invalid id', function(done) {
                request(url)
                    .get('/user/baduserid')
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
                    .end(function(err, res) {
                        if(err) return done(err);
                        res.body.status.should.equal('fail');
                        res.body.data.message.should.equal('userID does not exist');
                        done();
                    });
            });
        });
    });

    describe('Valid calls', function()
    {
        var testUser = {
            email: 'test@email.com', 
            password: 'password', 
            first_name: 'Test', 
            last_name: 'User'
        }

        var updateUser = {
            first_name: 'Updated', 
            last_name: 'Names'
        }

        var user_id = "";

        before(function(done) 
        {
            database.user.dropUserDatabase(function()
            {
                done();
            });
        });

        it('Creating user', function(done) {
            request(url)
                .post('/user')
                .send(testUser)
                .end(function(err, res) {

                    user_id = res.body.data.user_id;

                    res.body.status.should.equal('success');
                    done();
                });
        });

        it('Retrieving user', function(done) {
            request(url)
                .get('/user/' + user_id)
                .end(function(err, res) {
                    if(err) return done(err);
                    res.body.status.should.equal('success');

                    var user = res.body.data;

                    user.should.have.properties('first_name', 'last_name', 'user_id');
                    user.first_name.should.equal(testUser.first_name);
                    user.last_name.should.equal(testUser.last_name);
                    user.user_id.should.equal(user_id);


                    done();
                });
        });

        it('Updating user', function(done)
        {
            request(url)
                .put('/user/' + user_id)
                .send(updateUser)
                .end(function(err, res) 
                {
                    if(err) return done(err);

                    res.body.status.should.equal('success');

                    var user = res.body.data;

                    user.should.have.properties('first_name', 'last_name', 'user_id', 'email');
                    user.first_name.should.equal(updateUser.first_name);
                    user.last_name.should.equal(updateUser.last_name);
                    user.user_id.should.equal(user_id);
                    user.email.should.equal(testUser.email);
                    
                    done();
                });
        });

        it('Deleting user', function(done) {
        request(url)
            .delete('/user/' + user_id)
            .end(function(err, res) {
                if(err) return done(err);
                res.body.status.should.equal('success');
                done();
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
