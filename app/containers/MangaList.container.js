React = require('react');
MangaItem = require('./../components/mangaItem.js');

MangaList = React.createClass({
  propTypes: {

  },
  getInitialState: function() {
    return {
      mangaList : []
    };
  },
  render: function() {
    return (
      React.createElement('div', {className: 'manga-list'},
        mangaList.forEach(function(mangaPair) {
          React.createElement(MangaItem, mangaPair);
        })
      )
    );
  }
});

module.exports = MangaList;
