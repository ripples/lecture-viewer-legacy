// TODO... Ignore this for now unless you decide to tackle Flux

var Dispatcher = require('../dispatchers/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var API = require('../utils/WebAPI');

var CourseActionCreators = {

  requestCourseDetails: function(courseID) {

    API.getCourseDetails(courseID)
    .then(function(data) {
        dispatch(ActionConstants.REQUEST_COURSE_DETAILS_SUCCESS, {data: data});
    }, function(error) {
        dispatch(ActionConstants.REQUEST_COURSE_DETAILS_FAIL, {error: error});
    });
  }
}

module.exports = ActionCreators;
