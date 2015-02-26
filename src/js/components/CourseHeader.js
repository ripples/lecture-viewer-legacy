var React = require('react');

var CourseHeader = React.createClass({

  render: function() {

    var details = this.props.details;

    return (
      <div>
        <h1>{details.title}</h1>
        <h2>{details.semester}</h2>
        {details.description}
      </div>
    );
  }
});

module.exports = CourseHeader;
