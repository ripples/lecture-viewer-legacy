var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition for comments
var commentSchema = new Schema({
  semester: String,
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  lecture: {
    type: Schema.Types.ObjectId,
    ref: 'Lecture'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: String,
  time: Number,
  date: Date
});

module.exports = mongoose.model("Comment", commentSchema);