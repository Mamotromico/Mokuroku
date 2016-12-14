require('./../containers/MangaListWrapContainer.container.js');
require('./../containers/ChapterListWrapContainer.container.js');

DownloaderWrap = React.createClass({
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'row',
      flex: '1',
      marginTop: '40px',
      backgroundColor: 'rgb(205, 86, 86)',
      padding: '2px',
    };

    return React.createElement('div', {style: divStyle, className: "dl-wrap"},
      React.createElement(MangaListWrapContainer),
      React.createElement(ChapterListWrapContainer)
    );
  }
});

module.exports = DownloaderWrap;
