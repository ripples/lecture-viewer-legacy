var mongoose = require('mongoose');
var Bookmark = require('./bookmark.js');
var Schema = mongoose.Schema;
// Schema definition for users
var userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String,
    username: String,
    //name object
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
    //bookmarks
    bookmarks: [Bookmark.schema]
});

module.exports = mongoose.model('User', userSchema);