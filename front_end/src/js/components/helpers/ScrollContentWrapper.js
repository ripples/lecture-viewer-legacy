var React = require('react');

var ScrollContentWrapper = React.createClass({

  render: function() {
    return (
      <div className='scroll-content-wrapper'>
        {this.props.children}
      </div>
    );
  }

});

module.exports = ScrollContentWrapper;
