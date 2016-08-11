var React = require('react');
var PropTypes = React.PropTypes;

module.exports = React.createClass({
  propTypes: {
    name: React.PropTypes.string
  },
  render: function () {
    var divStyle = {
      boxSizing: 'border-box',
      flex: '1 0 auto',
      backgroundColor: '#b5e0cd',
      padding: '2px',
      margin: '2px'
    };
    console.log(this.props.name);
    return React.createElement('div', {style: divStyle, className: "manga-list-item"},
      this.props.name
    );
  }
});
