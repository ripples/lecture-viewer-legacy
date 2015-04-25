# Database API
--------

* Methods to access the User database.
* For getter methods, callback should be in the form function(error, returned_data).
* For setter methods, callback should be in the form function(error, affected_document).

## Users API
---

|Number|	Method							|  return              |
|-------|-------------------------|-----------------------------------|
|1|addCourseById(user_id, courseId, callback) | return edited user (if any)|
|2|createUser(user_id, password, username, role, callback) | return created user (if any)|
|3|deleteUserById(user_id, callback) | return deleted user (if any)|
|4|getBookmarksById(user_id, callback) | return users bookmarks|
|5|getCoursesById(user_id, callback) | return users courses|
|6|getUserRoleById(user_id)| return new users role|
|7|setUserRoleById(user_id)| return user info(if any)|
|8|setUserRoleByEmail(user_email)| return user info(ifany)|
|9|getUserById(user_id, callback) | return whole users info (if any)|
|10|getUserRoleById(user_id, callback) | return users role|
|11|setNameById(user_id, firstName, lastName, callback) | return edited user (if any)|
|12|setUsernameById(user_id, newUsername, callback) | return edited user (if any)|
|13|getUserByEmail(user_email)|return user info|
|14|setVerification(user_id, verification(true/false))| return user's info(if any)|





## Courses API
---

| Number|	Method										|  return              |
|----------------|--------------------------------|-----------------------------------|
|1|addListOfEmailsById(courseId, emailList, callback) | return course document with new email list |
|2|addListOfLecturesById(courseId, lectureIdList, callback) | return course document with new lecture list |
|3|addListOfUsersById(courseId, userIdList, callback) | return course document with new users list |
|4|createCourse(semester, department, courseNumber, callback) | return created course |
|5|deleteAllEmailsById(courseId, callback) | return course document with empty emails list |
|6|deleteAllLecturesById(courseId, callback) | return course document with empty lectures list |
|7|deleteAllUsersById(courseId, callback) | return course document with empty users list |
|8|deleteCourseById(courseID, callback) | return deleted course |
|9|getCourseById(courseId, callback) | return course |
|10|getEligibleEmailsById(id, callback) | return eligible emails to view the course material|
|11|getRegisteredUsersById(id, callback) | return course's registered users |
|12|dropCoursesDatabase(callback)| return 1 if the db has been droped successfully|
|13|updateCourse(course_ID, newDepartment, newCourseNumber, newCourseTitle, newSemester, newYear, newInstructor, callback)| returns the new course(if any to modify)|
|14|getAllCoursesBySemester(semester, callback)| return array of courses for a given semester|


## Lectures API
---


|Number|Method|return|
|---------|-------------------|-----------|
|1|getCommentsById(courseId, emailList, callback)| return an array of comments|
|2|getLectureById(lectureID, callback)|return |
|3|setLectureVisibilityById(lectureId, visibility, callback)| return lecture(if any)|
|4|getLectureVisibilityById(lectureId, callback)| return lecture.visible(if any)|
|5|addCommentToLecture(lectureId, comment, callback)|return lecture|
|6|createLecture(course, date, video, visible, callback)| return lecture|
|7|dropLecturesDatabase(callback)| return 1 if the db has been droped successfully|


## Comment API
---

|Number|Method|return|
|---------|-------------------|-----------|
|1|createComment(lecture_id, user_id, firstandlast, time, content, post_date, callback)| return comment object|
|2|deleteComment(comment_id)| return deleted comment(if any)|