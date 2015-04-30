var React                 = require('react');
var Router                = require('react-router');

var Watch = React.createClass({

  propTypes: {
    onWatch: React.PropTypes.func.isRequired
  },

  /*============================== @LIFECYCLE ==============================*/

  componentDidMount: function() {
    this.contextDidChange(this.props);
  },

  // TODO: Inifiite loop when uncommented. But we need to notify the parent somehow.
  // componentWillReceiveProps: function(nextProps) {
  //   if(this.props != nextProps) {
  //     this.contextDidChange(nextProps);
  //   }
  // },

  // TODO : Manage video timestamps in URL
  contextDidChange: function(props) {
    // var splat = props.params.splat;
    console.log("URL: " + JSON.stringify(props));
    // var lectureDetails = {
    //   course_id:  splat[0],
    //   lecture_id: splat[1],
    //   time: null
    // }
    var lectureDetails = {
      course_id:  parseInt(props.params.course_id),
      lecture_id: parseInt(props.params.lecture_id),
      time: null
    }
    // if(splat.length > 2) {
    //   // Time in seconds based on the URL structure:  #time=0m0s
    //   // [2] == minutes; [3] == seconds;
    //   lectureDetails.time = ((60*splat[2]) + (splat[3]))
    // }
    props.onWatch(lectureDetails)
  },

  /*============================== @RENDERING ==============================*/

  // Nothing to render.  This Class acts as a relay for routing parameters only.
  render: function() {
    return null;
  }
});

module.exports = Watch;
