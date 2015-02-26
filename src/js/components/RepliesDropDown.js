var React = require('react');

var RepliesDropDown = React.createClass({

  getInitialState: function() {
    return {
      expanded: false
    };
  },

  toggle: function(e) {
    e.preventDefault();
    this.setState({expanded: !this.state.expanded});
  },

  render: function() {

    var classes = this.state.expanded ? 'expanded' : 'collapsed';

    var replies = this.props.replies.map(function(r) {
      return <li>{r.by} said: {r.data}</li>;
    });

    var repliesHeader = <h3 className={classes}>You have {replies.length} {replies.length == 1 ? 'reply' : 'replies'}.</h3>;

    return (
      <div>
        {repliesHeader}
        <ul>{replies}</ul>
      </div>
    );
  }

});

module.exports = RepliesDropDown;
