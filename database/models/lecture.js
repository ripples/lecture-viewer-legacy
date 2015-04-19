var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition for lectures
var lectureSchema = new Schema({
  // reference to the course that this lecture belongs to, should be an ObjectIds in Course collection.
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  date: {type: Date, unique: true},
  // link to lecture video
  video: String,
  // visibility of the courses
  visible: Boolean,
  // links to lecture whiteboard images,
  whiteboardImages: [String],
  // links to lecture computer screen images,
  screenImages: [String],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

module.exports = mongoose.model("Lecture", lectureSchema);