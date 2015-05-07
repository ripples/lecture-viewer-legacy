var db_api = require('../../database');
var should = require('chai').should();
var assert = require('assert');
describe('Testing User collection:', function() {
    this.timeout(10000);
    /*
     *  precondition
     */
    var testUser = null;
    before(function(done) {
        db_api.user.dropUserDatabase(function() {
            db_api.user.createUser('test@test.com', 'password', 'first', 'last', 1, function(err, doc) {
                testUser = doc;
                assert.equal(err, null);
                assert.notEqual(testUser, null);
                assert.equal(testUser.email, 'test@test.com');
                assert.equal(testUser.password, 'password');
                assert.equal(testUser.name.first, 'first');
                assert.equal(testUser.name.last, 'last');
                assert.equal(testUser.role, 1);
                done();
            });
        });
    });
    var testCourse = null;
    before(function(done) {
        db_api.course.dropCoursesDatabase(function() {
            db_api.course.createCourse('CS', 'CS121', 'Intro to CS', 'Fall', '2015', 'Tim', function(err, course) {
                testCourse = course;
                assert.equal(err, null);
                assert.notEqual(testCourse, null);
                assert.equal(testCourse.semester, 'Fall');
                assert.equal(testCourse.department, 'CS');
                assert.equal(testCourse.courseNumber, 'CS121');
                done();
            });
        });
    });
    var testLecture = null;
    before(function(done) {
        db_api.lecture.dropLecturesDatabase(function() {
            db_api.lecture.createLecture(testCourse, "title", "description", new Date().getDate(), "thisvideo", true, ["WhiteBoard1", "WhiteBoad2"], ["screen1", "screen2"], function(err, lecture) {
                testLecture = lecture;
                assert.equal(err, null);
                assert.notEqual(lecture, null);
                assert.equal(lecture.video, "thisvideo");
                assert.equal(lecture.visible, true);
                done();
            });
        });
    });
    /*
     * post-condition
     */
    after(function(done) {
        db_api.user.deleteUserById(testUser._id, function(err, user) {
            assert.equal(err, null);
            assert.notEqual(user, null);
            user._id.should.eql(testUser._id);
            done();
        })
    });
    /*
     * Tests whether user role is return properly.
     */
    it('retrieves user Role by ObjectID', function(done) {
        db_api.user.getUserRoleById(testUser._id, function(err, role) {
            assert.equal(err, null);
            assert.notEqual(role, null);
            role.should.eql(1);
            done();
        });
    });
    /*
     * Tests whether username is properly set.
     */
    it('set username by ObjectId', function(done) {
        db_api.user.setUsernameById(testUser._id, 'newUsername', function(err, doc) {
            assert.equal(err, null);
            assert.notEqual(doc, null);
            doc.username.should.eql('newUsername'); //1 for success 0 for failure
            done();
        });
    });
    /*
     * Test whether the function sets the name of the user properly.
     */
    it('set name by ObjectId: firstname, lastname', function(done) {
        db_api.user.setNameById(testUser._id, 'firstname', 'lastname', function(err, doc) {
            assert.equal(err, null);
            assert.notEqual(doc, null);
            doc.name.first.should.eql('firstname');
            doc.name.last.should.eql('lastname');
            done();
        });
    });
    /*
     * Tests whether a notification is properly added by the function.
     */
    it('Add notifications by ObjectId: id, type, title, url, date', function(done) {
        db_api.user.notification.addNotificationById(testUser._id, {
            type_id: 1,
            title: 'title',
            url: 'url',
            date: new Date()
        }, function(err, doc) {
            assert.equal(err, null);
            assert.notEqual(doc, null);
            doc.notifications[0].title.should.eql('title');
            doc.notifications[0].url.should.eql('url');
            doc.notifications.length.should.eql(1);
            done();
        });
    });
    /*
     * Tests whether notifications are properly retrieved.
     */
    it('retrieves notifications by ObjectId', function(done) {
        db_api.user.notification.getAllNotificationsById(testUser._id, function(err, notifications) {
            assert.equal(err, null);
            assert.notEqual(notifications, null);
            assert.equal(notifications.length, 1);
            notifications[0].type_id.should.eql(1);
            notifications[0].title.should.eql('title');
            notifications[0].url.should.eql('url');
            done();
        });
    });
    /*
     * Tests whether a bookmark is properly added by the function.
     */
    var testBookmark = null;
    it('Add bookmark to a lecture: userid, lectureid, lable, time', function(done) {
        db_api.bookmark.addBookmarkById(testUser._id, testLecture._id, testCourse._id, "thisLable", 255, function(err, user) {
            // console.log(user.bookmarks);
            testBookmark = user.bookmarks[0];
            assert.equal(err, null);
            assert.notEqual(user.bookmarks, null);
            user.bookmarks.length.should.eql(1);
            assert.equal(user.bookmarks[0].label, "thisLable");
            assert.equal(user.bookmarks[0].time, 255);
            // console.log(user); 
            done();
        });
    });
    /*
     * Tests whether a bookmark is properly retrieved.
     */
    it('retrieves bookmark by UserID: Userid', function(done) {
        db_api.bookmark.getBookmarksByUserId(testUser._id, function(err, bookmarks) {
            assert.equal(err, null);
            assert.notEqual(bookmarks, null);
            assert.equal(bookmarks.length, 1);
            assert.equal(bookmarks[0].label, "thisLable");
            assert.equal(bookmarks[0].time, 255);
            done();
        });
    });
    /*
     * Test whether a bookmark is properly retrieved or not.
     */
    it('retreives bookmarks properly: userid, lectureid', function(done) {
        db_api.bookmark.getBookmarksByLectureId(testUser._id, testLecture._id, function(err, bookmarks) {
            assert.equal(err, null);
            assert.notEqual(bookmarks, null);
            assert.equal(bookmarks.length, 1);
            assert.equal(bookmarks[0].label, "thisLable");
            assert.equal(bookmarks[0].time, 255);
            done();
        });
    });
    /*
     * Test whether a bookmark is properly retrieved or not by courseid.
     */
    it('retreives bookmarks properly: courseid', function(done) {
        db_api.bookmark.getBookmarksByCourseId(testCourse._id, function(err, bookmarks) {
            assert.equal(err, null);
            assert.notEqual(bookmarks, null);
            assert.equal(bookmarks.length, 1);
            assert.equal(bookmarks[0].label, "thisLable");
            assert.equal(bookmarks[0].time, 255);
            done();
        });
    });
    /*
     * Test whether the user returned is correct.
     * Test ObjectID must be a 12-byte string.
     */
    it('retrieves user by ID: ID', function(done) {
        db_api.user.getUserById(testUser._id, function(err, user) {
            assert.equal(err, null);
            assert.notEqual(user, null);
            user.email.should.eql('test@test.com');
            done();
        });
    });
    /*
     * Test role update by id
     */
    it('Role update by ID: ID', function(done) {
        db_api.user.setUserRoleById(testUser._id, 3, function(err, user) {
            assert.equal(err, null);
            assert.notEqual(user, null);
            user.role.should.eql(3);
            done();
        });
    });
    /*
     * Tests role update by Email
     */
    it('Role update by Email: Email', function(done) {
        db_api.user.setUserRoleByEmail(testUser.email, 2, function(err, user) {
            assert.equal(err, null);
            assert.notEqual(user, null);
            user.role.should.eql(2);
            done();
        });
    });
    /*
     * Tests getuserbyemail
     */
    it('Get user by Email: Email', function(done) {
        db_api.user.getUserByEmail(testUser.email, function(err, user) {
            assert.equal(err, null);
            assert.notEqual(user, null);
            user.email.should.eql(testUser.email);
            done();
        });
    });
    /*
     * Test set user verification
     */
    it('setVerification: true', function(done) {
        db_api.user.setVerification(testUser._id, true, function(err, usr) {
            assert.equal(err, null);
            assert.notEqual(usr, null);
            assert.equal(usr.verified, true);
            done();
        });
    });
    /*
     * Test that resetPassword changes the password from the user.
     */
    it('resets the password of a given user', function(done) {
        db_api.user.resetPassword(testUser._id, "beakingSoda", function(err, user) {
            assert.equal(err, null);
            assert.notEqual(user, null);
            assert.equal(user.password, "beakingSoda");
            done();
        });
    });
    /*
     * Test that gets bookmark by its ID
     */
     it('retreives bookmark by its id: bookmakrID', function(done) {
        db_api.bookmark.getBookmarkById(testBookmark._id, function(err, bookmark) {
            assert.equal(err, null);
            assert.notEqual(bookmark, null);
            assert.equal(bookmark.label, "thisLable");
            assert.equal(bookmark.time, 255);
            done();
        });
    });
    //(bookmarkid, user_id, lecture_id, course_mid, label, time, callback)
    it('edit bookmark:', function(done) {
        db_api.bookmark.editBookmark(testBookmark._id, "thatLable", function(err, update) {
            assert.equal(err, null);
            assert.notEqual(update, null);
            update.should.eql(1);
            done();
        });
    });
    /* 
     * Tests taht deletes a bookmark properly
     */
    it('deletes a bookmark', function(done) {
        db_api.bookmark.deleteBookmark(testUser._id, testBookmark._id, function(err, user) {
            assert.equal(err, null);
            assert.notEqual(user, null);
            assert.equal(user.bookmarks.length, 0);
            done();
        });
    });
});