React = require('react');

MangaButtonReadOrUpdate = React.createClass({
  propTypes: {
    updateMangaList: React.PropTypes.func.isRequired,
    selectedWebsite: React.PropTypes.string
  },
  updateMangaListWithPropName: function (syntheticEvent) {
    this.props.updateMangaList(this.props.selectedWebsite);
  },
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      padding: '2px',
      width: '40px',
      contentAlign: 'center'
    };
    return React.createElement('button', {style: divStyle, className: "manga-list-update", onClick: this.updateMangaListWithPropName},
     "F5"
    );
  }
});

module.exports = MangaButtonReadOrUpdate;
