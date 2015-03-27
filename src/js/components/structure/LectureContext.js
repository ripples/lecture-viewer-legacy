var React                 = require('react');
var LectureContextSidebar = require('./LectureContextSidebar');

var LectureContext = React.createClass({

  propTypes: {
    course_id: React.PropTypes.number.isRequired,
    lecture_id: React.PropTypes.number.isRequired
  },

  /*============================== @RENDERING ==============================*/

  render: function() {
    return (
      <div id='lecture-context'>
        <LectureContextSidebar {...this.props}/>
      </div>
    );
  }
});

module.exports = LectureContext;
