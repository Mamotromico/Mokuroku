MangaOriginSelect = React.createClass({
  propTypes: {
    handleSelectChange: React.PropTypes.func.isRequired
  },
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      flex: '1 0 auto',
      padding: '2px'
    };
    return React.createElement('select', {style: divStyle,
                                          className: "manga-list-origin-select",
                                          onChange: this.props.handleSelectChange},
      React.createElement('option', {value: "batoto"}, "batoto"),
      React.createElement('option', {value: "mangafox"}, "mangafox")
    );
  }
});

module.exports = MangaOriginSelect;
