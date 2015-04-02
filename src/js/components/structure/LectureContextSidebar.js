var React                 = require('react');
var CommentsContainer     = require('../comments/CommentsContainer');
var BookmarksContainer    = require('../bookmarks/BookmarksContainer');
var TabbedArea            = require('react-bootstrap/lib/TabbedArea');
var TabPane               = require('react-bootstrap/lib/TabPane');

var LectureContextSidebar = React.createClass({

  propTypes: {
    course_id: React.PropTypes.number.isRequired,
    lecture_id: React.PropTypes.number.isRequired
  },

  // TODO : Remove after handling props via Routing
  getDefaultProps: function() {
    return {
      course_id: 1,
      lecture_id: 1
    };
  },

  getInitialState: function() {
    return {
      open: true
    };
  },

  /*============================== @HANDLING ==============================*/

  handleToggleSidebarClick: function() {
    this.setState({open: !this.state.open});
  },

  /*============================== @RENDERING ==============================*/

  // TODO : Toggle Open/Close button
  render: function() {
    return (
      <div className='lecture-context-sidebar'>
        <TabbedArea defaultActiveKey={1}>
          <TabPane eventKey={1} tab="Comments">
            <CommentsContainer course_id={this.props.course_id}
              lecture_id={this.props.lecture_id}/>
          </TabPane>
          <TabPane eventKey={2} tab="Bookmarks">
            <BookmarksContainer course_id={this.props.course_id}
              lecture_id={this.props.lecture_id}/>
          </TabPane>
        </TabbedArea>
      </div>
    );
  }
});

module.exports = LectureContextSidebar;
