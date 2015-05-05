var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema definition for the bookmarks
var bookmarkSchema = new Schema({
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        },
        lecture: {
            type: Schema.Types.ObjectId,
            ref: 'Lecture'
        },
        label: String,
        time: Number
    });

module.exports = mongoose.model("Bookmark", bookmarkSchema);