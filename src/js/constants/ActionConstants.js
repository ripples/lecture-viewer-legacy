// Makes null values equal to the name of their keys in the object
var keyMirror = require('keymirror');

module.exports = {

    // Define sets of actions that the Stores will listen for
    ActionTypes: keyMirror({

      REPLY_BEGIN,
      REPLY_CANCEL,
      REPLY_SUBMIT,
      MARK_NOTIFICATION_AS_READ,
      MARK_ALL_NOTIFICATION_AS_READ,
      SEEK_TO_TIME,
      CREATE_COMMENT,
      CREATE_BOOKMARK,
      DELETE_BOOKMARK

      // TODO : ? Edit Reply/Comment/Bookmark
    }),
};
