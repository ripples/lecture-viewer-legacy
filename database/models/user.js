var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition for users
var userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String,
  username: String,
  name: {
    first: String,
    last: String
  },
  role: String,
  // list of references to registered courses, element should be ObjectIds in Course collection.
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }],
  notifications: [],
  verified: Boolean,
  bookmarks: [{
    title: String,
    url: String
  }]
});

module.exports = mongoose.model('User', userSchema);
