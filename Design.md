#Student#

##Navigation Bar##
- Avatar Thumbnail --> **LINKTO** Settings View
- Drop down menu that shows the user's currently enrolled courses.  Displays a notification icon when not expanded.  Shows notification counter on each course when expanded.  --> **LINKTO** Specific **Course's Feed**
- Logout Button

##Course Feed##
- Course description / Semester at the top of the page
- List of Lectures (Each item in the list is a **Lecture List Component**)
- **Bookmarks** list arranged by date the bookmark was made.  Each bookmark contains a timestamp and a description label. (May also show which lecture it as associated with)  --> **LINKTO** Specific point in the lecture video.

    ####LECTURE LIST COMPONENT####
    - Title, Date Uploaded, Duration
    - Drop down menu that shows notifications (replies to comments that the user left on a Lecture)

        #####NOTIFICATION EXPANDED LIST STYLE#####
        - X replies to your comment @ time X:XX -> **LINKTO** that lecture and scroll the user to the specificcomment/reply in video.  ***NOTE*** Each expanded notification list may have multiple of these items due to replies at different points in the video.  If the reply was not for a specific time, it will appear without a timestamp but will still link to the video and scroll the user to that comment when clicked

##View Course##

- **Media Player** (Similar to the existing version) with the Video Player large and on top, and board + slides underneath.  The user may choose to collapse and hide or click to show any of the components.  They may also click one of the smaller media views to swap it into the large frame.  Pause, Playback, and sound controls will all be available.
- When a user leaves this page, the application needs to save the video time so that when they return, they can pick up where they left off.
- **Bookmarks** list specific to this lecture.  Click one to seek to that portion of the video (and keep all sub players in sync).  This list can be shown or hidden.
- **Synchronized Comment Feed** shows comments by users at specific timestamps to the right of the screen (think: Soundcloud).
- **Comment/Reply input field** where you may leave comment  (Automatically includes a link to the X:XX time unless the user backspaces). The user may also reply to a comment from this field.
- **Comment Feed** below the comment input field (think: YouTube) sorted by: Most replies, then most-recently-posted.

    ####SYNCHRONIZED COMMENT####
    - Shows the commenter's avatar, comment body, and a *X replies* label
    - Click the comment --> Focuses the reply input-field so the user may write a reply
    - Click the *X replies* label --> scrolls the user down to the thread

  ####COMMENT####
    - Shows the commenter's avatar, comment body, and a *X replies* label.
    - If there is a timestamp, click it to seek the video to that time.
    - Click the *X replies* label to expand the replies underneath it.

#Instructor#

##Privileges##
- The Instructor account has the same functionality as the Student, with a few added features.  This means they can view lectures, comment on the lecture, reply to comments, and get notifications when someone replies to their comments.

##Navigation Bar MODIFICATION##
- The instructor will see an additional *Add Course* button at the bottom of the drop-down list --> **LINKTO** **Course Management** for the new course.

##Course Feed MODIFICATION##
- There will be a *Manage Course* button next to the course description --> **LINKTO** **Course Management** for the current course.
- *Add Content* button next to the *Manage Course* button --> **LINKTO** **Content Upload** for the current course.

##Course Management##
- Course Title
- Semester Drop-down selector
- Course Description
- **Import Roster** button that when clicked opens the file-browser to select a .csv of students.
- **Add student** by email field

    ####CASE: NEW COURSE####
    - Populate a list showing all students imported from .csv and those added manually.
    - Display an *X* icon next to each student so that they may remove them from the tentative roster
    - Save / Cancel buttons

  ####CASE: EXISTING COURSE####
    - Populate a list showing all students currently enrolled.
    - Populate a list showing any students that the Instructor may have just imported or manually added
    - Display an *X* icon next to each student so that they may remove them from the roster
    - Update Roster / Cancel buttons

##Content Upload##
- Lecture / Tutorial Title
- Date of the lecture
- *Upload Video* button
- The user may choose to cancel or save.  By saving, they may then choose to navigate away from the page and they will be notified when the upload is complete.  If the user attempts to logout or leave the site during an upload, they will be warned that there is a video uploading and that leaving will terminate the process.  
