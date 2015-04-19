var db_api = require('../../database');
var should = require('chai').should();
var assert = require('assert');

describe('Testing User collection:', function(){
  /*
   *  precondition
   */
  var testUser = null;

  before(function(done){
    db_api.user.dropUserDatabase(function() {
      db_api.user.createUser('test@test.com', 'password', 'username', 'role', function (err, doc) {
        testUser = doc;
        assert.equal(err, null);
        assert.notEqual(testUser, null);
        assert.equal(testUser.email, 'test@test.com');
        assert.equal(testUser.password, 'password');
        assert.equal(testUser.username, 'username');
        assert.equal(testUser.role, 'role');
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
      role.should.eql('role');
      done();
    });
  });

  /*
   * Tests whether username is properly set.
   */
  it('set username by ObjectId', function(done) {
    db_api.user.setUsernameById(testUser._id,'newUsername', function(err, doc) {
      assert.equal(err, null);
      assert.notEqual(doc, null);
      doc.username.should.eql('newUsername');//1 for success 0 for failure
      done();
    });
  });

  /*
   * Test whether the function sets the name of the user properly.
   */
  it('set name by ObjectId: firstname, lastname', function(done) {
    db_api.user.setNameById(testUser._id, 'firstname','lastname', function(err, doc) {
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
    db_api.user.notification.addNotificationById(
        testUser._id,
        {type_id: 1, title: 'title', url: 'url', date: new Date()},
        function(err, doc) {
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
  it('Add bookmark by ObjectId: id, title, url', function(done) {
    db_api.user.bookmark.addBookmarkById(testUser._id, {title: "title",url:"url"}, function(err, user) {
      assert.equal(err, null);
      assert.notEqual(user, null);
      user.bookmarks.length.should.eql(1);
      user.bookmarks[0].title.should.eql('title');
      user.bookmarks[0].url.should.eql('url');
      done();
    });
  });

  /*
   * Tests whether a a bookmark is properly retrieved.
   */
  it('retrieves bookmark by ObjectId: ObjectId', function(done) {
    db_api.user.bookmark.getBookmarksById(testUser._id, function(err, bookmarks) {
      assert.equal(err, null);
      assert.notEqual(bookmarks, null);
      assert.equal(bookmarks.length, 1);
      bookmarks[0].title.should.eql('title');
      bookmarks[0].url.should.eql('url');
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
      user.email.should.eql('test@test.com');
      done();
    });
  });
});


