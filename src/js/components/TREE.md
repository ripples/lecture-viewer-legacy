# Component Tree


TODO : Login + Signup + Forgot Password


Left Sidebar
  Header
    Logo
    Notification Badge                                 @ON_CLICK -> FILL <Content> WITH <Notification List>
    Hide Sidebar Button                                @ON_CLICK -> @TOGGLE_VISIBILIY <Left Sidebar>
  Content
    @OPTION_1 (DEFAULT)
      Course Selection
        Course Selection List
          Course List Item                             @ON_CLICK -> FILL <Content> WITH <Lecture Selection> WITH_PARAM *CourseID*
            Title
            Identifier
            Semester
            Year
        Add Course Button                              @ON_CLICK -> FILL <Main> WITH <Manage Course>
    @OPTION_2
      Lecture Selection
        Back to Courses Button                         @ON_CLICK -> FILL <Content> WITH <Course Selection>
        Selected Course Information Heading
          Title
          Identifier
          Semester
          Year
          Manage Course                                @ON_CLICK -> FILL <Main> WITH <Manage Course> WITH_PARAM *CourseID*
        Lecture Selection List
          Lecture List Item
            Type
            Ordinal
            Title
            Upload Date (Time Ago)
            Duration
            Toggle Description                         @ON_CLICK -> @TOGGLE_VISIBILIY <Description>
            Description (HIDDEN)
            Play Button                                @ON_CLICK -> FILL <Main Content> WITH <View Lecture> WITH_PARAM *LectureID*
            Manage Lecture                             @ON_CLICK -> FILL <Main> WITH <Manage Lecture> WITH_PARAM *LectureID*
        Add Lecture                                    @ON_CLICK -> FILL <Main> WITH <Manage Lecture>
    @OPTION_3
      Notifications
        Notification List
          Notification List Item
            Type
            Date
            Content                                    @ON_CLICK -> @SET_APP_STATE -> NEW [Course, Lecture, Reply] WITH_PARAM *******
            Mark As Read Button                        @ON_CLICK -> @REMOVE <Notification List Item> FROM <Notification List> -> @ACTION : MARK_AS_READ
        Mark All As Read Button                        @ON_CLICK -> @REMOVE_ALL <Notification List Item> FROM <Notification List> -> @ACTION : MARK_ALL_AS_READ
  Footer
    Logout Button                                      @ON_CLICK -> FILL <App> WITH <Login> -> @ACTION : LOGOUT
    Settings Button                                    @ON_CLICK -> FILL <Main> WITH <Settings>
Main Context
  Content
    @OPTION_1 (DEFAULT)
      View Lecture
        Media Players
      Right Sidebar
        Header
          Tab Bar
            Bookmarks Tab                              @ON_CLICK -> FILL <Content> WITH <Bookmarks>
            Comments Tab                               @ON_CLICK -> FILL <Content> WITH <Comments>
          Hide Sidebar Button                          @ON_CLICK -> @TOGGLE_VISIBILIY <Right Sidebar>
        Content
          @OPTION_A (DEFAULT)
            Comments
              Filter Selector
                All                                    @ON_CLICK -> @SORT <Comments List> Date Posted (Newest first)
                Relevant                               @ON_CLICK -> @SORT <Comments List> Timestamp -> @FILTER X closest comments to current timestamp
              Comments List
                Comment Item
                  Author
                  Date Posted (Time Ago)
                  Timestamp (If Exists)                @ON_CLICK -> @ACTION : SEEK_TO_TIME
                  Comment Body
                  Reply Button                         @ON_CLICK -> @TOGGLE_STATE *REPLY* -> @FOCUS <Add Comment> WITH_PARAM *CommentID* + *Comment Author*
                  Replies Button                       @ON_CLICK -> @TOGGLE_VISIBILIY <Replies List>
                    Replies List
                      Reply List Item
                        Author
                        Date Posted (Time Ago)
                        Reply Body
              Add Comment
                Input TextField
                  Current Timestamp
                  Parent Comment Username (If Reply)
                Anonymous Toggle                       @ON_CLICK -> @TOGGLE_STATE *ANONYMOUS*
                Comment Button                         @ON_CLICK -> @APPEND_NEW <Comment Item> TO <Comments List> OR <Reply List> -> @ACTION : CREATE_COMMENT
          @OPTION_B
            Bookmarks
              Edit                                     @ON_CLICK -> @TOGGLE_VISIBILIY <Bookmark Item -- Delete>
              Filter Selector
                Alphabetical                           @ON_CLICK -> @SORT <Bookmarks List> Alphabetically
                Timestamp                              @ON_CLICK -> @SORT <Bookmarks List> Chronologically
              Bookmarks List
                Bookmark Item                          @ON_CLICK -> @ACTION : SEEK_TO_TIME
                  Label
                  Timestamp
                  Delete (HIDDEN)                      @ON_CLICK -> @REMOVE <Bookmark Item> FROM <Bookmark List> -> @ACTION : DELETE_BOOKMARK
              Add Bookmark Button                      @ON_CLICK -> @TOGGLE_VISIBILIY <Add Bookmark Container>
              Add Bookmark Container (HIDDEN)
                Input Textfield
                Confirm Button                         @ON_CLICK -> @APPEND_NEW <Bookmark Item> TO <Bookmark List> -> @ACTION : CREATE_BOOKMARK
                Cancel Button                          @ON_CLICK -> @RESET <Add Bookmark Input> -> @TOGGLE_VISIBILIY <Add Bookmark Container>
    @OPTION_2
      Manage Course
        TODO
    @OPTION_3
      Manage Lecture
        TODO
    @OPTION_4
      Settings
        TODO
