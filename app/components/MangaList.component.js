MangaItem = require('./MangaListItem.component.js');

MangaList = React.createClass({
  propTypes: {
    mangaListJson: React.PropTypes.array.isRequired
  },
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      flex: '1 1 auto',
      padding: '2px',
      width: '400px',
      flexDirection: 'column',
      alignItems: 'stretch',
      backgroundColor: '#1aac9f',
      overflow: 'auto'
    };
    var mangafoxItemElements = this.props.mangaListJson.map(function(mangafoxItemElement) {
      return React.createElement(MangaListItem, mangafoxItemElement);
    });
    return React.createElement('div', {style: divStyle, className: "manga-list"},
      mangafoxItemElements
    );
  }
});

module.exports = MangaList;
