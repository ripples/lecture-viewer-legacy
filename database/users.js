/**
 * Created by freddy on 3/19/15.
 */

var User = require('./models/user');
exports.notification = require('./notifications');
exports.bookmark = require('./bookmarks');

/*
  Useful methods to access the User database.
  For getter methods, callback should in the form function(error, returned_data).
  For setter methods, callback should in the form function(error, affected_documents).
 */

/*
  Method to add course to student account by email.
 */
exports.addCourseById = function(id, courseId, callback) {
  User.findById(id, function(err, user) {
    if (err)
      callback(err);
    else if (!user)
      callback("email does not exist");
    else {
      console.log(user);
      console.log(user.courses);
      user.courses.push(courseId);
      callback(undefined, user);
    }
  });
};

/*
  Method to create a user with the given email, password, username and role.
 */
exports.createUser = function(email, password, firstName, lastName, role, callback) {
  User.findOne({email: email}, function(err, user) {
    if (err)
      callback(err);
    else if (user) {
      callback("user with email " + email + " already exists.");
    }
    else {
      User.create({
        email: email,
        password: password,
        name: {
          first: firstName,
          last: lastName
        },
        role: role
      }, function(err, newUser) {
	      callback(undefined, newUser._id);
      });
    }
  });
};

/*
  Method to delete user from database by email
 */
exports.deleteUserById = function(id, callback) {
  User.findByIdAndRemove(id, function(err, user) {
    if (err) {
      callback(err);
    }
    else {
      callback(undefined, user);
    }
  });
};

/*
  Method to drop the whole user collection.
  Just for testing. No need to be listed in public API.
 */
exports.dropUserDatabase = function(callback) {
  User.remove({}, function(err) {
    if (err) {
      callback(err);
    }
    else {
      callback();
    }
  });
};

/*
  Method to get a user's registered courses by user's email.
 */
exports.getCoursesById = function(id, callback) {
  User.findById(id)
      .populate('courses')
      .exec(function(err, user) {
        if (err) {
          callback(err);
        }
        else if (!user) {
          callback("email does not exist");
        }
        else {
          callback(undefined, user.courses);
        }
      });
};

/*
  Method to get user's role (student, instructor,...) by user's email.
 */
exports.getUserRoleById = function(id, callback) {
  User.findById(id, function(err, user) {
    if (err) {
      callback(err);
    }
    else if (!user) {
      callback('email does not exist.');
    }
    else {
      callback(undefined, user.role);
    }
  });
};

/*
  Method to get the whole user's document in the database by email and password.
  Used in login stage
 */
exports.getUserByCredentials = function(email, password, callback) {
    // To be implemented..
    // callback function will take in eror and user object parameters
    // -----
    // If error encountered while querying database,
    //      return with error string in callback
    //      ex: callback('Error doing this and this!', undefined);
    // If no user found in database,
    //      return with undefined error, and undefined user object
    //      ex: callback(undefined, undefined), or callback();
    // If user found in database,
    //      return with undefined error, and user object
    //      ex: callback(undefined, userObjectHere);

    // Temporary implementation for testing below...
    var user = {
        email: 'test@test.edu',
        password: 'testpass',
        id: '10341'
    }

    callback(undefined, user);
}

/*
  Method to get the whole user's document in the database by objectId.
 */
exports.getUserById = function(id, callback) {
  User.findById(id, function(err, user) {
    if (err)
      callback(err);
    else if (!user) {
      callback("userID does not exist");
    }
    else {
      callback(undefined, user);
    }
  });
};

/*
  Method to change user first and last name.
 */
exports.setNameById = function(id, firstName, lastName, callback) {
  User.findByIdAndUpdate(
      id,
      {$set: {name : {first: firstName, last: lastName}}},
      callback
  );
};

/*
  Method to update username.
 */
exports.setUsernameById = function(id, newUsername, callback) {
  User.findByIdAndUpdate(
      id,
      {$set: {username : newUsername}},
      callback
  );
};

/*
 * Updates user's role by id
 */
exports.setUserRoleById = function(id, newUserRole, callback) {
  this.findByIdAndUpdate(
      id,
      {$set: {role : newUserRole}},
      callback
  );
};

/*
 * Updates user's role by Email
 */
exports.setUserRoleByEmail = function(email, newUserRole, callback) {
  this.findOneAndUpdate(
      {email: email},
      {$set: {role : newUserRole}},
      callback
  );
};
