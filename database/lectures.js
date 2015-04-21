/**
 * Created by freddy on 3/16/15.
 */
var Lecture = require('./models/lecture');

/*
  Methods to work with Lecture database.
  For getter methods, callback should be in the form function(err, data).
 */

exports.getCommentsById = function(id, callback) {
  Lecture.findById(id)
      .populate('comments')
      .exec(function (err, lecture) {
        if (err)
          callback(err);
        else if (!lecture)
          callback("lectureID does not exist.");
        else
          callback(undefined, lecture.comments);
      });
};

exports.getLectureById = function(lectureId, callback) {
  Lecture.findById(id, function(err, lecture) {
    if (err) {
      callback(err);
    }
    else if (!lecture) {
      callback("lectureID does not exist");
    }
    else {
      callback(undefined, lecture);
    }
  });
};

/*
 * setLectureVisibility: sets the visibility of a lecture.
 */
 exports.setLectureVisibilityById = function(lectureId, visibility, callback){
	Lecture.findByIdAndUpdate(
		lectureId,
		{visible: visibility},
		callback
	);
};
/*
 * getLectureVisibility: gets the visibility of a lecture
 */
exports.getLectureVisibilityById = function(lectureId, callback){
	Lecture.findById(lectureId, function(err, lecture){
		if(err){
			callback(err);
		}
		else if(!lecture){
			callback("Lecture not found");
		}
		else{
			callback(undefined,lecture.visible);
		}
	});
};

/*
 * Adds a comment to a lecture
 */
// exports.addCommentToLecture = function(lectureId, comment, callback) {
//     Lecture.findByIdAndUpdate(
//         lectureId, {
//             comments.push(comment)
//         },
//         callback
//     );
// };
